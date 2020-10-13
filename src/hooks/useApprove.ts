import { useCallback } from 'react'

import useIDMO from './useIDMO'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../IDMO/utils'
import useTransactionAdder from './useTransactionAdder';
const useApprove = (lpContract: Contract, callback: Function) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const idmo = useIDMO()
  const masterChefContract = getMasterChefContract(idmo)
  const { onAddTransaction } = useTransactionAdder()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account, (tx: any) => {
        callback(tx)
        onAddTransaction(tx)
      })
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, callback, lpContract, masterChefContract, onAddTransaction])
  return { onApprove: handleApprove }
}

export default useApprove
