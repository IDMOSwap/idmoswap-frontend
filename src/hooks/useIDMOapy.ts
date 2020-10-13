import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getFarms,
  getIDMOAPY
} from '../IDMO/utils'
import useidmo from './useIDMO'
import useFarmsNew from './useFarmsNew';
const useIDMOapy = () => {
  const [IDMOapy, setBalance] = useState({ totalWethValue: new BigNumber(0), poolWeight: new BigNumber(0) })
  const idmo = useidmo()
  // const farms = getFarms(idmo)
  const [farms] = useFarmsNew()
  const masterChefContract = getMasterChefContract(idmo)
  const curridmo = farms.find((item: { tokenSymbol: string }) => item.tokenSymbol === 'IDMOSingle')
  let pid = curridmo ? curridmo.pid : 0

  const fetchAllStakedValue = useCallback(async () => {
    const curIDMO: { totalWethValue: any, poolWeight: any } = await getIDMOAPY(masterChefContract, pid)
    console.log(curIDMO, 'IDMO');
    setBalance(curIDMO)
  }, [masterChefContract, pid])

  useEffect(() => {
    if (masterChefContract && curridmo) {
      fetchAllStakedValue()
    }
  }, [fetchAllStakedValue, masterChefContract, curridmo])

  return IDMOapy
}

export default useIDMOapy
