import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useidmo from '../../../hooks/useIDMO'
import { getEarned, getMasterChefContract } from '../../../IDMO/utils'
import { bnToDec } from '../../../utils'
import '../../../style/farm.css'
import { useTranslation } from 'react-i18next';

interface FarmWithStakedValue extends Farm {
  apy: number
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farm])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farm)
      }
      return newFarmRows
    },
    [[]],
  )
  const { t } = useTranslation();

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {/* {(j === 0 || j === 1) && <StyledSpacer />} */}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
          <StyledLoadingWrapper>
            <Loader text={t('cooking')} />
          </StyledLoadingWrapper>
        )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const idmo = useidmo()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (idmo) return
      const earned = await getEarned(
        getMasterChefContract(idmo),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (idmo && account) {
      fetchEarned()
    }
  }, [idmo, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0
  const { t, i18n } = useTranslation();
  let { icon } = farm
  return (
    <StyledCardWrapper>
      {/* {farm.tokenSymbol === 'idmo' && <StyledCardAccent />} */}
      <StyledItem>
        <StyledItemContent>
          <StyledContent>

            <StyledTitle>
              {/* @ts-ignore */}
              <img className="farmcardicon" src={icon} alt="" />
              {farm.name}</StyledTitle>
            <StyledDetails>
              <MarginTop20></MarginTop20>
              <StyledDetail>{t('depositAndEarn', { lpTokenName: farm.lpToken.toUpperCase(), earnTokenName: farm.earnToken.toUpperCase() })}</StyledDetail>
              <StyledDetail>
                <p style={{ height: '20px' }}>
                  {farm.apy ? <span>{t('apy')}:{farm.apy}%</span>
                    : null}
                </p></StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              className="btn"
              size='md'
              disabled={!poolActive}
              text={poolActive ? t('select') : undefined}
              to={`/menu/${farm.id}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <StyledInsight>

              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </StyledItemContent>
      </StyledItem>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`
const StyledItem = styled.div`
  background: linear-gradient(-45deg,#F2F6FB,#E7EDF6);
  box-shadow: 0 0 21px 10px #C9CDD6;
  border-radius: 31px;
  flex: 1;
  color: #808A98;
`
const StyledItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding:30px 20px;
`

const StyleIcon = styled.div`
  width:87px;
`

const StyledCards = styled.div`
  width: 1200px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  margin: 0 0px 34px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: 24px;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  position: relative;
  width:378px;
  margin: 0 10px 34px;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const StyledTitle = styled.h4`
  color: #1F4087;
  font-size: 21px;
  font-weight: 700;
  margin:0; 
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const MarginTop20 = styled.div`
  margin-top:20px;
`
const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: 2px;
  text-align: center;
  width:100%;
`

const StyledDetail = styled.div`
    color: #808A98;
    font-size: 14px;
    line-height: 1.5;
    margin-top: 7px;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #FFFFFF;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
