import React from 'react'
import styled from 'styled-components'
import '../../style/footer.css'
import footerbg from '../../assets/img/bg.png'
import logoMian from '../../assets/img/logo-mian.png'
import { useTranslation } from 'react-i18next';
import safe from '../../assets/imgpc/safe.png';
const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <StyledFooter>
      <StyledFooterInner>
        <div className="footerleft">
          {/* <h3> <img src={logoMian} /> */}
          {/* </h3> */}
          <div className="social-links">
            <li><a href="https://t.me/joinchat/JVqSRh3EJzmDeealM79UNQ" target="_blank"><img src={require('../../assets/img/telegram@2x.png')} alt="" /></a><p>Telegram</p></li>
            <li><a href="https://twitter.com/IdmoSwap" target="_blank"><img src={require('../../assets/img/twitter@2x.png')} alt="" /></a> <p>Twitter</p></li>
            <li><a href="https://www.facebook.com/idmoswap.idmoswap.5" target="_blank"><img src={require('../../assets/img/FaceBook@2x.png')} alt="" /></a><p>Facebook</p></li>
            <li><a href="mailto:idmoswap@gmail.com" target="_blank"><img src={require('../../assets/img/gmail@2x.png')} alt="" /></a><p>Gmail</p></li>
          </div>
          {/* <div className="copyright">Copyright &copy; 2020.Company name All rights reserved.</div> */}
        </div>
        <div className="footerright">
          <div className="joinus">
            <p className="font30 " style={{ height: '110px', }}>
              {t('joinUs')}
            </p>
            <p style={{ height: '50px', }}>{t('abloutUs')}</p>
            <p>©2020 IDMOSwap</p>
            {i18n.language !== 'en' && <p className="safe">
              <a href="https://defi.idmoswap.com/files/idmo_smart_contract_audit_zh_cn.pdf" target="_blank" rel="noopener noreferrer">
                <img src={safe} alt="" />
                <span>{t('safe')}</span>
              </a>
            </p>}
          </div>
        </div>
        <div className="phone-footerleft">
          <li><a href="https://t.me/joinchat/JVqSRh3EJzmDeealM79UNQ" target="_blank"><img src={require('../../assets/img/telegramP.png')} alt="" /></a><p>Telegram</p></li>
          <li><a href="https://twitter.com/IdmoSwap" target="_blank"><img src={require('../../assets/img/twitterP.png')} alt="" /></a> <p>Twitter</p></li>
          <li><a href="https://www.facebook.com/idmoswap.idmoswap.5" target="_blank"><img src={require('../../assets/img/FaceBookP.png')} alt="" /></a><p>Facebook</p></li>
          <li><a href="mailto:idmoswap@gmail.com" target="_blank"><img src={require('../../assets/img/gmailP.png')} alt="" /></a><p>Gmail</p></li>
        </div>

        <div className="phone-footerright">
          <img src={require('../../assets/img/logoP.png')} style={{ width: '119px', height: '27px', marginTop: '19px' }}></img>
          <p style={{ fontSize: '12px', color: '#fff' }}>©2020 IDMOSwap</p>
          {i18n.language !== 'en' && <p className="safe">
            <a href="https://defi.idmoswap.com/files/idmo_smart_contract_audit_zh_cn.pdf" target="_blank" rel="noopener noreferrer">
              <img src={safe} alt="" />
              <span>{t('safe')}</span>
            </a>
          </p>}
        </div>
      </StyledFooterInner>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  // background: url(${footerbg}) no-repeat  center;
  background:#1E4088;
  // background-size: 100% 100%;
`
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 402px;
  @media (max-width: 768px) {
    display: block;
    height:236px;
  }
  width: 100%;
  max-width: 1200px;

`

export default Footer