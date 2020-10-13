import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'
import useFarmsNew from './useFarms';
const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const idmo = useidmo()
  // const farms = getFarms(idmo)
  const [farms] = useFarmsNew()
  const masterChefContract = getMasterChefContract(idmo)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, farms, masterChefContract])

  useEffect(() => {
    if (account && masterChefContract && idmo) {
      fetchAllBalances()
    }
  }, [account, block, fetchAllBalances, masterChefContract, setBalance, idmo])

  return balances
}

export default useAllEarnings
