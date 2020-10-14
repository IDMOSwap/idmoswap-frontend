
import BigNumber from 'bignumber.js'
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getBalanceNumberself = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  // return displayBalance.isZero() ? displayBalance.toNumber() : displayBalance.times(new BigNumber(10).pow(6)).toNumber().toFixed(3) + '*10^(-6)';
  return displayBalance.times(new BigNumber(10).pow(6)).toNumber().toFixed(3)
}

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
