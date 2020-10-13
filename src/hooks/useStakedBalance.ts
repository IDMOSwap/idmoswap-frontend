import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, pid])

  useEffect(() => {
    if (account && idmo) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, idmo, fetchBalance])

  return balance
}

export default useStakedBalance
