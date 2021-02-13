import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
// import CryptoIndexContainer from './crypto/crypto_index_container';
import CryptoSplashIndexContainer from './crypto/crypto_splash_index_constainer';
import PaperTradeAdvert from './advert/papertrading_advert';

const COINS = [
        { name: "Bitcoin", symbol: "BTC"}
]

class Splash extends React.Component {
    render() {
        return (
          <div className="splash-page">
            <div className="splash-container">
              <div className="splash-sent">
                The World's Most Trustworthy
                <br />
                Cryptocurrency Exchange
              </div>
              <div className="splash-subsent">
                Trade Bitcoin, BNB, and hundreds of other cryptocurrencies in
                minutes.{" "}
              </div>

              <div className="splash-subsent2">I want to spend</div>
              <div className="splash-subsent3">I want to buy</div>

              <img src={window.imageUrl.advertise} className="ad-logo" />
              <NavLink to="/">
                <div className="splash-logo"></div>
              </NavLink>

              <input
                type="number"
                placeholder="Enter amount"
                className="splash-amount"
                minLength='1' maxLength='6'
              />
              <input
                type="number"
                placeholder="Enter amount"
                className="splash-buy"
                minLength='1' maxLength='6'
              />
              <NavLink className="buy-button" to="/coins/BTC">
                Buy BTC
              </NavLink>
            </div>

            <a href="https://vincengai.github.io/Currency-Compare/" className="currency-compare">
              <div className="cur-comp-link">
                <img src={window.imageUrl.megaphone} className='megaphone'/>
                Need advice investing? Come checkout my project Currency Compare
              </div>
            </a>

            <PaperTradeAdvert />
            <CryptoSplashIndexContainer />
          </div>
        );}
};

export default Splash; 