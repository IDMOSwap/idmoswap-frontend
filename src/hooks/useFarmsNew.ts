import React, { useCallback, useEffect, useState } from 'react'

import useidmo from './useIDMO'

import { getFarmsAxjx, getFarms } from '../IDMO/utils'

const useFarms = () => {
  const [farms, setviewPoolInfo] = useState([])
  const idmo = useidmo()

  const slftgetViewPool = useCallback(async () => {
    const viewPoolInfo = await getFarmsAxjx()
    const farms = getFarms(idmo)
    // setviewPoolInfo(farms)
    let newFarms = viewPoolInfo.map((_item: any, index: any) => {
      return {
        ...farms.find((farmitem: { lpTokenAddress: string }) => { return farmitem.lpTokenAddress === _item.lpToken }),
        pid: index,
        apy: _item.apy
      }
    })
    setviewPoolInfo(newFarms.filter(({ id }: { id: string }) => id))
  }, [idmo])

  useEffect(() => {
    if (idmo) {
      slftgetViewPool()
    }
  }, [slftgetViewPool, idmo])

  return farms
}

export default useFarms
