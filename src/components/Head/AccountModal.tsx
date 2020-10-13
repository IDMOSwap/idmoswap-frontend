import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../hooks/useTokenBalance'
import useidmo from '../../hooks/useIDMO'
import { getidmoAddress } from '../../IDMO/utils'
import { getBalanceNumber } from '../../utils/formatBalance'
import Button from '../Button'
import CardIcon from '../CardIcon'
import Label from '../Label'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import Value from '../Value'
import { useTranslation } from 'react-i18next';
import idmopng from '../../assets/imgpc/idmo.png'
const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const idmo = useidmo()
  const idmoBalance = useTokenBalance(getidmoAddress(idmo))
  const { t, i18n } = useTranslation();

  return (
    <Modal>
      <ModalTitle text={t('myAccount')} />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <span><img src={idmopng} alt="" sizes="" style={{ width: '48px' }} /></span>
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(idmoBalance)} />
              <Label text={t('idmoBalance')} />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={i18n.language == "en" ? `https://etherscan.io/address/${account}` : `https://cn.etherscan.com/address/${account}`}
          text={t('viewEtherscan')}
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text={t('signout')}
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text={t('cancel')} />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
