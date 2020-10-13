import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

// import chef from '../../assets/img/chef.png'
import logo from '../../assets/img/biglogo.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import { useTranslation } from 'react-i18next';

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

import logohome from '../../assets/imgpc/logohome.png'
const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const { t, i18n } = useTranslation();
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              {/* <PageHeader
                icon={<img src={logo} height="200" />}
                subtitle="Services Encrypted"
                title="One-Stop"
              /> */}
              <div className="home pd10">
                <div className="bigpic">
                  <img src={logohome} alt="" />
                </div>
                <div className="homefont">
                  <h2>{t('oneStop')} </h2>
                </div>
              </div>
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button
                className="selfbtn"
                onClick={onPresentWalletProviderModal}
                text={t('unlock')}
              />
            </div>
          )}
      </Page>
    </Switch>
  )
}

export default Farms
