import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Idmo } from '../../IDMO'

export interface IdmoContext {
  idmo?: typeof Idmo
}

export const Context = createContext<IdmoContext>({
  idmo: undefined,
})

declare global {
  interface Window {
    idmosauce: any
  }
}

const IdmoProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [idmo, setIdmo] = useState<any>()

  // @ts-ignore
  window.idmo = idmo
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const idmoLib = new Idmo(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setIdmo(idmoLib)
      window.idmosauce = idmoLib
    }
  }, [ethereum])

  return <Context.Provider value={{ idmo }}>{children}</Context.Provider>
}

export default IdmoProvider
