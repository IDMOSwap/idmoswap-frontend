import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/imgpc/logo.png'
import logom from '../../assets/imgm/logo.png'
import menu from '../../assets/imgm/menu.png'
import './head.scss';
import AccountButton from './AccountButton'
import { IsMobile } from '../../utils';
import useTransactionAdder from '../../hooks/useTransactionAdder';
import { useTranslation, Trans, Translation } from 'react-i18next'
function Head () {
  const [menushow, setMenushow] = useState(false)
  const { transactions } = useTransactionAdder()
  console.log(transactions, 'transactions');
  const { t, i18n } = useTranslation();
  if (IsMobile()) {
    return <div className="moblietopBar">
      <NavLink className="mlogo" to="/">
        <img src={logom} />
      </NavLink>
      <div className="account">
        <AccountButton />
      </div>
      <div className="mnav">
        <div className="mmenu">
          <img src={menu} onClick={() => setMenushow(!menushow)} />
          {
            menushow && <ul>
              <li>
                <a
                  href="https://home.idmoswap.com/"
                  target="_blank">
                  {t('home')}
                </a>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/menu" onClick={() => setMenushow(!menushow)}>{t('meun')}</NavLink>
              </li>

              <li>
                <NavLink exact activeClassName="active" to="/" onClick={() => setMenushow(!menushow)}>{t('Pledge')}</NavLink>
              </li>
              <li>
                <a href="https://vote.idmoswap.com/"
                  target="_blank">{t('vote')}</a>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/IDMO" onClick={() => setMenushow(!menushow)}>{t('IDMO')}</NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/EXCHANGE" onClick={() => setMenushow(!menushow)}>{t('EXCHANGE')}</NavLink>
              </li>
              <li>
                <a
                  href="https://help.idmoswap.com/"
                  target="_blank">
                  {t('About')}
                </a>
              </li>
            </ul>
          }

        </div>
        <div className="language">
          <span className={i18n.language == 'cn' && 'active' || ""} onClick={() => i18n.changeLanguage("cn")}>CN</span>
          <span className={i18n.language == 'en' && 'active' || ""} onClick={() => i18n.changeLanguage('en')}>EN</span>
        </div>
      </div>
    </div>
  }
  return <div className="topBar">
    <div className="logo">
      <NavLink to="/">
        <img src={logo} height="41" />
      </NavLink>
    </div>
    <div className="nav">
      <ul>
        <li>
          <a
            href="https://home.idmoswap.com/"
            target="_blank">
            {t('home')}
          </a>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/menu">{t('meun')}</NavLink>
        </li>

        <li>
          <NavLink exact activeClassName="active" to="/">{t('Pledge')}</NavLink>
        </li>
        <li>
          <a href="https://vote.idmoswap.com/"
            target="_blank">{t('vote')}</a>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/IDMO">{t('IDMO')}</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/EXCHANGE">{t('EXCHANGE')}</NavLink>
        </li>
        <li>
          <a
            href="https://help.idmoswap.com/"
            target="_blank">
            {t('About')}
          </a>
        </li>
      </ul>
      <div className="account">
        <AccountButton />
      </div>
    </div>
    <div className="language">
      <span className={i18n.language == 'cn' ? 'active' : ''} onClick={() => i18n.changeLanguage("cn")}>CN</span>
      <span className={i18n.language == 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>EN</span>
    </div>
  </div>

}

export default Head