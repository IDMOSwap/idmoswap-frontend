import React from 'react'
import styled from 'styled-components'
// import chef from '../../assets/img/chef.png'
import comingsoon from '../../assets/imgpc/comingsoon.png'
import '../../style/home.scss'
import Footer from '../../components/FooterNew';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (<div className="basepage" >
    <div className="home">
      <div className="bigpic">
        <img src={comingsoon} alt="" style={{ width: '155px' }} />
      </div>
      <div className="homefont">
        <p className="cooming">{t('COOMING_SOON')}</p>
      </div>
    </div>
    <Footer></Footer>
  </div>
  )
}

export default Home
