import { useCallback } from 'react'

import useidmo from './useIDMO'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../IDMO/utils'

const useUnstake = (pid: number, callback: Function) => {
  const { account } = useWallet()
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstake(masterChefContract, pid, amount, account, callback)
        return txHash
      } catch (error) {
        return false
      }
    },
    [account, callback, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
