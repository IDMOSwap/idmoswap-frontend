import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getHTAPY
} from '../IDMO/utils'
import useIDMO from './useIDMO'
import useBlock from './useBlock'
import useFarmsNew from './useFarmsNew';

const useHTapy = () => {
  const [HTapy, setBalance] = useState({ HTtotalWethValue: new BigNumber(0), HTpoolWeight: new BigNumber(0) })
  const idmo = useIDMO()
  // const farms = getFarms(idmo)
  const [farms] = useFarmsNew()
  const masterChefContract = getMasterChefContract(idmo)
  const currentidmo = farms.find((item: { tokenSymbol: string }) => item.tokenSymbol === 'HTSingle')
  const wethContact = getWethContract(idmo)
  const block = useBlock()
  const fetchAllStakedValue = useCallback(async () => {
    if (currentidmo) {
      let { pid, htlpContract, tokenContract } = currentidmo
      const IDMO: { totalWethValue: any, poolWeight: any } = await getHTAPY(masterChefContract,
        wethContact,
        htlpContract,
        tokenContract,
        pid)
      // console.log(IDMO.totalWethValue, 'htt');
      // console.log(IDMO.poolWeight, 'htp');
      setBalance({
        HTtotalWethValue: IDMO.totalWethValue,
        HTpoolWeight: IDMO.poolWeight
      })
    }
  }, [currentidmo, masterChefContract, wethContact])

  useEffect(() => {
    if (masterChefContract && currentidmo) {
      fetchAllStakedValue()
    }
  }, [fetchAllStakedValue, block, masterChefContract, currentidmo])

  return HTapy
}

export default useHTapy
