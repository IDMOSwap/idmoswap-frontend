import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber, getBalanceNumberself } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import framepng from '../../../assets/img/frame.png'
import { useTranslation } from 'react-i18next';
import CustomizedDialogs from '../../../components/Dialog';
interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
  icon: any
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName, icon }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [modelType, setmodelType] = useState('loading')
  const [tranaddress, settranaddress] = useState("")
  const [tranNum, settranNum] = useState(0)
  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract, (tx: string) => { setmodelType("success"); settranaddress(tx) })

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const { onStake } = useStake(pid, (tx: string) => { setmodelType("success"); settranaddress(tx) })
  const { onUnstake } = useUnstake(pid, (tx: string) => { setmodelType("success"); settranaddress(tx) })

  const handleonStake = useCallback(async (amount) => {
    try {
      settranNum(amount)
      setmodelType("loading")
      setRequestedApproval(true)
      const txHash = await onStake(amount)
      if (!txHash) {
        // setRequestedApproval(false)
        setmodelType("error")
      } else {
        // setmodelType("success")
      }
    } catch (e) {
      console.log(e)
    }
  }, [onStake, setRequestedApproval])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={handleonStake}
      tokenName={tokenName}
    />,
  )
  const handleonUnstake = useCallback(async (amount) => {
    try {
      settranNum(amount)
      setmodelType("loading")
      setRequestedApproval(true)
      const txHash = await onUnstake(amount)
      if (!txHash) {
        // setRequestedApproval(false)
        setmodelType("error")
      } else {
        // setmodelType("success")
      }
    } catch (e) {
      console.log(e)
    }
  }, [onUnstake, setRequestedApproval])

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={handleonUnstake}
      tokenName={tokenName}
    />,
  )


  const handleApprove = useCallback(async () => {
    try {
      setmodelType("loading")
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        // setRequestedApproval(false)
        setmodelType("error")
      } else {
        // setmodelType("success")
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const { t, i18n } = useTranslation();
  return (
    <div className="farmCart Stake">
      <div className="farmHeader">
        <div className="stake">
          <Label className="stake-title" text={`${tokenName} ${t('tokensStaked')}`} />
          <div className="icon">
            <img src={icon} height="28px" alt="" sizes="" />
            <h2>{tokenName}</h2>
          </div>
        </div>
      </div>
      <div className="farmbody">
        {
          tokenName === "IDMO-USDT UNI-V2 LP" ?
            // <Value value={getBalanceNumberself(stakedBalance)} /> 
            <p className="stakeMoney">{getBalanceNumberself(stakedBalance)}{getBalanceNumberself(stakedBalance) !== "0.000" && <span>*10<sup>-6</sup></span>}</p>
            :
            <Value value={getBalanceNumber(stakedBalance)} />
        }

      </div>
      <CustomizedDialogs
        form={tranNum + tokenName}
        address={tranaddress}
        type={modelType} open={requestedApproval}
        close={() => setRequestedApproval(false)} />
      <div className="farmaction">
        {!allowance.toNumber() ? (
          <Button
            className="selfbtn2"
            disabled={requestedApproval}
            onClick={handleApprove}
            text={`${t('approve')} ${tokenName}`}
          />
        ) : (
            <>
              <Button
                className="selfbtn"
                disabled={stakedBalance.eq(new BigNumber(0))}
                text={t('unstake')}
                onClick={onPresentWithdraw}
              />
              <StyledActionSpacer />
              <Button
                className="selfbtn"
                text={t('add')}
                onClick={onPresentDeposit}
              />
              {/* <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton> */}
            </>
          )}
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
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
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

export default Stake
