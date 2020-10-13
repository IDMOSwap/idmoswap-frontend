import BigNumber from 'bignumber.js'

export { default as formatAddress } from './formatAddress'

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export const IsMobile = () => {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  };
  return isMobile.any(); //是移动设备
}