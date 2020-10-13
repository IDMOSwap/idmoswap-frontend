import React, { useCallback, useEffect, useState } from 'react'

import useidmo from './useIDMO'

import { getFarms, getMasterChefContract, getEarned, getViewPoolInfo } from '../IDMO/utils'

const useFarms = () => {
  const [farms, setviewPoolInfo] = useState([])
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)

  const slftgetViewPool = useCallback(async () => {
    const viewPoolInfo = await getViewPoolInfo(masterChefContract)
    const farms = getFarms(idmo)
    let newFarms = viewPoolInfo.map((_item: any, index: any) => {
      debugger
      // let currentfarm = farms.find((farmitem: { lpTokenAddress: string }) => { return farmitem.lpTokenAddress === _item.lpToken })
      return {
        ...farms.find((farmitem: { lpTokenAddress: string }) => { return farmitem.lpTokenAddress === _item.lpToken }),
        pid: index
      }
    })
    setviewPoolInfo(newFarms.filter(({ id }: { id: string }) => id))
  }, [masterChefContract, idmo])

  useEffect(() => {
    if (masterChefContract && idmo) {
      slftgetViewPool()
    }
  }, [masterChefContract, slftgetViewPool, idmo])

  return [farms]
}

export default useFarms
