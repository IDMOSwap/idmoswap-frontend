import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import IDMOProvider from './contexts/IDMOProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Pledge from './views/Farms/Pledge'
import Home from './views/Home'
import Stake from './views/Stake'
import IDMO from './views/IDMO'
import Exchange from './views/Exchange'
import Head from './components/Head';
const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <Head></Head>
        {/* <TopBar onPresentMobileMenu={handlePresentMobileMenu} /> */}
        {/* <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} /> */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/menu">
            <Farms />
          </Route>
          <Route path="/Pledge">
            <Pledge />
          </Route>
          <Route path="/staking">
            <Stake />
          </Route>
          <Route path="/IDMO">
            <IDMO />
          </Route>
          <Route path="/EXCHANGE">
            <Exchange />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}   // 测试是 3  线上是 1
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          // walletconnect: { rpcUrl: "https://ropsten.infura.io/v3/5bdfe51fce404140ad2959845bff98ab" }
        }}
      >
        <IDMOProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </IDMOProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [onPresentDisclaimerModal])

  return <div />
}

export default App
