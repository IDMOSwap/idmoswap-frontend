import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getIDMOUSDTAPY
} from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'
import useFarmsNew from './useFarmsNew';
import perBlockRewards from './perBlockRewards'

const useIDMOUSDTapy = () => {
  const [HTapy, setBalance] = useState(new BigNumber(0))
  const idmo = useidmo()
  // const farms = getFarms(idmo)
  const [farms] = useFarmsNew()
  const perBlock = perBlockRewards()
  const masterChefContract = getMasterChefContract(idmo)
  const curridmo = farms.find((item: { tokenSymbol: string }) => item.tokenSymbol === 'IDMO-USDT')
  const wethContact = getWethContract(idmo)
  const block = useBlock()
  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const fetchAllStakedValue = useCallback(async () => {
    if (curridmo) {
      let { pid, htlpContract, tokenContract, lpContract } = curridmo
      const idmousdt: { IDMO_usdt_price: any, totalLpUSDTAmount: any, poolWeight: any } = await getIDMOUSDTAPY(masterChefContract,
        wethContact,
        htlpContract,
        tokenContract,
        lpContract,
        pid)
      // console.log(IDMO.totalWethValue, 'htt');
      // console.log(IDMO.poolWeight, 'htp');
      let { IDMO_usdt_price, poolWeight, totalLpUSDTAmount } = idmousdt
      let apy = new BigNumber(IDMO_usdt_price).times(perBlock).times(BLOCKS_PER_YEAR).times(poolWeight).div(totalLpUSDTAmount)
      setBalance(apy)
    }
  }, [BLOCKS_PER_YEAR, curridmo, masterChefContract, perBlock, wethContact])

  useEffect(() => {
    if (masterChefContract && curridmo) {
      fetchAllStakedValue()
    }
  }, [fetchAllStakedValue, block, masterChefContract, curridmo])

  return HTapy
}

export default useIDMOUSDTapy
