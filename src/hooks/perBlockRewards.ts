import { useCallback, useEffect, useState } from 'react'
import { getMultiplier, getMasterChefContract, getstartBlock } from '../IDMO/utils'
import useidmo from './useIDMO'
import useBlock from './useBlock'

const PerBlockRewards = () => {
  let [perBlock, setperBlock] = useState(0)
  const idmo = useidmo()
  const masterChefContract = getMasterChefContract(idmo)
  const block = useBlock()


  const selfgetMultiplier = useCallback(async () => {
    let start_number = await getstartBlock(masterChefContract)
    start_number -= 0
    let req_start = 0
    // console.log(block, 'block')
    if (start_number > block || start_number === 0) { // 未启动
      req_start = start_number;
    }
    else {
      req_start = block;
    }
    // console.log(req_start)
    const balances: number = await getMultiplier(masterChefContract, req_start)
    setperBlock(balances)
  }, [block, masterChefContract])

  useEffect(() => {
    if (masterChefContract && idmo) {
      selfgetMultiplier()
    }
  }, [masterChefContract, selfgetMultiplier, idmo])

  return perBlock
}

export default PerBlockRewards
