import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

// import chef from '../../assets/img/chef.png'
import logo from '../../assets/img/biglogo.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm/PledgeFarm'

import FarmCards from './components/FarmCards'
import { useTranslation } from 'react-i18next';

import logohome from '../../assets/imgpc/logohome.png'
interface LabelProps {
  pledgejson?: string
}

const ShowWhich: React.FC<LabelProps> = ({ pledgejson }) => {
  const { t, i18n } = useTranslation();
  return !pledgejson ? <>
    <div className="home pd10">
      <div className="bigpic">
        <img src={logohome} alt="" />
      </div>
      <div className="homefont">
        <h2>{t('oneStop')}</h2>
      </div>
    </div>
    <FarmCards />
  </>
    : <Farm pledgeId={pledgejson} />

}

const Pledge: React.FC = () => {
  let pledgejson = localStorage.getItem("pledge")
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const { t, i18n } = useTranslation();

  return (
    <Switch>
      <Page>
        {!!account ? (
          <ShowWhich pledgejson={pledgejson} />
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

export default Pledge
