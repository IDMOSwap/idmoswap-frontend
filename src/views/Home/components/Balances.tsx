import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import idmoIcon from '../../../components/IdmoIconForIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import perBlockRewards from '../../../hooks/perBlockRewards'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useidmo from '../../../hooks/useIDMO'
import { getidmoAddress, getidmoSupply } from '../../../IDMO/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import framepng from '../../../assets/img/frame.png'
import { useTranslation } from 'react-i18next';


const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [end, sumEarning])
  const { t, i18n } = useTranslation();

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const BlockRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  // const perBlock = perBlockRewards()
  // let endnumber = new BigNumber(perBlock)
  //   .div(new BigNumber(10).pow(18))
  //   .toNumber()
  let endnumber = 8

  useEffect(() => {
    setStart(end)
    setEnd(endnumber)
  }, [end, endnumber])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const idmo = useidmo()
  const idmoBalance = useTokenBalance(getidmoAddress(idmo))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getidmoSupply(idmo)
      setTotalSupply(supply)
    }
    if (idmo) {
      fetchTotalSupply()
    }
  }, [idmo, setTotalSupply])
  const { t, i18n } = useTranslation();

  return (
    <StyledWrapper>
      <StyledItem>
        <StyledItemContent>
          <StyledBalances>
            {/* <idmoIcon /> */}
            <Spacer />
            <Label text={t('idmoBalance')} />
          </StyledBalances>
          <Value
            value={!!account ? getBalanceNumber(idmoBalance) : String(t('locked'))}
          />
        </StyledItemContent>
        <Footnote>
          {t('pendingharvest')}
          <FootnoteValue>
            <PendingRewards /> IDMO
          </FootnoteValue>
        </Footnote>
      </StyledItem>
      <Spacer />

      <StyledItem>
        <StyledItemContent>
          <Label text={t('totalSupply')} />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : String(t('locked'))}
          />
        </StyledItemContent>
        <Footnote>
          {t('newblock')}
          <FootnoteValue>
            <BlockRewards /> IDMO
            </FootnoteValue>
        </Footnote>
      </StyledItem>
    </StyledWrapper>
  )
}
const StyledItem = styled.div`
  background: linear-gradient(-45deg, #F2F6FB, #E7EDF6);
  box-shadow:0 0 21px 10px #C9CDD6;
  border-radius: 31px;
  flex: 1;
  color:#808A98;
  height:243px;
`
const StyledItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  height: 98px;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const Footnote = styled.div`
  font-size: 14px;
  margin: 8px 0;
  padding: 18px 20px;
  color: #808A98;
  border-top: solid 1px #C0C9D5;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
