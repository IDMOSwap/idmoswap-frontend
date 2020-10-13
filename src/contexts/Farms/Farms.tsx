import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useidmo from '../../hooks/useIDMO'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../IDMO/utils'
import { getFarms } from '../../IDMO/utils'

import Context from './context'
import { Farm } from './types'

import useFarms from '../../hooks/useFarmsNew'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const farms = useFarms()

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
