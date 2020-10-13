import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useidmo from '../../hooks/useIDMO'
import { getMasterChefContract } from '../../IDMO/utils'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import logo from '../../assets/img/biglogo.png'
import logohome from '../../assets/imgpc/logohome.png'
import { useTranslation } from 'react-i18next';

interface LabelProps {
  pledgeId?: string
}

const Farm: React.FC<LabelProps> = ({ pledgeId }) => {
  const farmId = pledgeId
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const idmo = useidmo()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(idmo))

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])
  const { t, i18n } = useTranslation();


  return (
    <>
      <div className="frampledge">
        <div className="home pd10">
          <div className="bigpic">
            <img src={logohome} alt="" />
          </div>
          <div className="homefont">
            {/* <h2>{`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}</h2> */}
            <h2>{t('depositAndEarn', { lpTokenName: lpTokenName, earnTokenName: earnTokenName })}</h2>

          </div>
        </div>
      </div>
      <div className="fram">
        <div className="framchild">
          <Harvest pid={pid} />
        </div>
        <Spacer />
        <div className="framchild">
          <Stake
            lpContract={lpContract}
            pid={pid}
            tokenName={lpToken.toUpperCase()}
            icon={icon}
          />
        </div>
      </div>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
