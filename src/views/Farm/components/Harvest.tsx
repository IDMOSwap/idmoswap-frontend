import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import framepng from '../../../assets/img/frame.png'
import { getBalanceNumber } from '../../../utils/formatBalance'
import idmo from '../../../assets/imgpc/idmo.png'
import { useTranslation } from 'react-i18next';

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  // console.log(pid, "Harvest");
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward(pid)
  const { t, i18n } = useTranslation();

  return (
    <div className="farmCart">
      <div className="farmHeader">
        <div className="icon">
          <img src={idmo} alt="" sizes="" />
        </div>
        <h2>IDMO</h2>
      </div>
      <div className="farmbody">
        <Value value={getBalanceNumber(earnings)} />
        <div className="mt20"></div>
        <Label text={t('idmoEarned')} />
      </div>
      <div className="farmaction">
        <Button
          className="selfbtn2"
          disabled={!earnings.toNumber() || pendingTx}
          text={pendingTx ? t('collectIDMO') : t('harvest')}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        />
      </div>
    </div>
  )
}
const StyledItem = styled.div`
  background: linear-gradient(-45deg, #F2F6FB, #E7EDF6);
  box-shadow:0 0 21px 10px #C9CDD6;
  border-radius: 31px;
  flex: 1;
  color:#FFF;
  height:243px;
`
const StyledItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 50px 60px;
  height: 98px;
  justify-content: space-between;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width:100%;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
