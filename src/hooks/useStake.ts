import { useCallback } from 'react'

import useidmo from './useIDMO'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../IDMO/utils'
import useTransactionAdder from './useTransactionAdder';
const useStake = (pid: number, callback: Function) => {
  const { account } = useWallet()
  const idmo = useidmo()
  const { onAddTransaction } = useTransactionAdder()
  const handleStake = useCallback(
    async (amount: string) => {
      if (!amount) {
        return
      }
      try {
        const txHash = await stake(
          getMasterChefContract(idmo),
          pid,
          amount,
          account,
          (tx: any) => {
            onAddTransaction(tx)
            callback(tx)
          }
        )
        return txHash
      } catch (error) {
        return false
      }
    },
    [account, callback, onAddTransaction, pid, idmo],
  )

  return { onStake: handleStake }
}

export default useStake
