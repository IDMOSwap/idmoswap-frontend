import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  // console.log(pid, 'useEarnings');
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, pid])

  useEffect(() => {
    if (account && masterChefContract && idmo) {
      fetchBalance()
    }
  }, [account, block, fetchBalance, masterChefContract, setBalance, idmo])

  return balance
}

export default useEarnings
