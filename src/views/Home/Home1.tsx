import React from 'react'
import styled from 'styled-components'
// import chef from '../../assets/img/chef.png'
import logo from '../../assets/img/biglogo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={200} />}
        title="欢迎来到IDMOSwap平台"
      // subtitle="Stake Uniswap LP tokens to claim your very own yummy idmo!"
      />
      <p className="pageinfo">
        {t('loading')}
          通过提供流动性来赚取IDMO
      </p>
      <div className="farmwidth">
        <Balances />
      </div>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button className="selfbtn3" text="🔪 See the Menu" to="/menu" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
