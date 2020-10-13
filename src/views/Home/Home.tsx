import React from 'react'
import styled from 'styled-components'
// import chef from '../../assets/img/chef.png'
import logohome from '../../assets/imgpc/logohome.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import '../../style/home.scss'
import Footer from '../../components/FooterNew';
import { useTranslation } from 'react-i18next';

// const Home: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   return (
//     <Page>
//       <PageHeader
//         icon={<img src={logo} height={200} />}
//         title="欢迎来到IDMOSwap平台"
//       // subtitle="Stake Uniswap LP tokens to claim your very own yummy idmo!"
//       />
//       <p className="pageinfo">
//         {t('loading')}
//           通过提供流动性来赚取IDMO
//       </p>
//       <div className="farmwidth">
//         <Balances />
//       </div>
//       <Spacer size="lg" />
//       <div
//         style={{
//           margin: '0 auto',
//         }}
//       >
//         <Button className="selfbtn3" text="🔪 See the Menu" to="/farms" variant="secondary" />
//       </div>
//     </Page>
//   )
// }

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (<div className="basepage" >
    <div className="home">
      <div className="bigpic">
        <img src={logohome} alt="" />
      </div>
      <div className="homefont">
        <h2>{t('welccome')}</h2>
        <p>{t('tipText')}</p>
      </div>
      <div className="farmwidth">
        <Balances />
      </div>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button className="selfbtn3" text={t('seeMenu')} to="/menu" variant="secondary" />
      </div>
    </div>
    <Footer></Footer>
  </div>
  )
}

export default Home
