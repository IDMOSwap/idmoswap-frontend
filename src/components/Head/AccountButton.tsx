import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../hooks/useModal'
import Button from '../Button'
import WalletProviderModal from '../WalletProviderModal'
import AccountModal from './AccountModal'
import { useTranslation } from 'react-i18next';

interface AccountButtonProps { }

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account, status, connect } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])
  const { t, i18n } = useTranslation();
  // @ts-ignore
  if (status === "disconnected") {
    connect('injected')
  }

  return (
    <StyledAccountButton>
      {!account ? (
        <Button className="selfbtnFFF" onClick={handleUnlockClick} size="sm" text={t('unlockwallet')} />
      ) : (
          <Button className="selfbtnFFF" onClick={onPresentAccountModal} size="sm" text={t('myWallet')} />
        )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
