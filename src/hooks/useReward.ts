import { useCallback } from 'react'

import useidmo from './useIDMO'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../IDMO/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    // console.log(txHash)
    return txHash
  }, [account, masterChefContract, pid])

  return { onReward: handleReward }
}

export default useReward
