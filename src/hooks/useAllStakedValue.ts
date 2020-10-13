import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber,
  name: string
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const idmo = useidmo()
  const farms = getFarms(idmo)
  const masterChefContract = getMasterChefContract(idmo)
  const wethContact = getWethContract(idmo)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          tokenSymbol,
          name
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          tokenSymbol: string
          name: string
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
            tokenSymbol,
            name
          ),
      ),
    )
    setBalance(balances)
  }, [farms, masterChefContract, wethContact])

  useEffect(() => {
    if (account && masterChefContract && idmo) {
      fetchAllStakedValue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract && idmo])

  return balances
}

export default useAllStakedValue
