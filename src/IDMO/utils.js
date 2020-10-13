import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import toaster from "toasted-notes";
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (idmo) => {
  return idmo && idmo.masterChefAddress
}
export const getidmoAddress = (idmo) => {
  return idmo && idmo.idmoAddress
}
export const getWethContract = (idmo) => {
  return idmo && idmo.contracts && idmo.contracts.weth
}

export const getMasterChefContract = (idmo) => {
  return idmo && idmo.contracts && idmo.contracts.masterChef
}
export const getidmoContract = (idmo) => {
  return idmo && idmo.contracts && idmo.contracts.idmo
}

export const getFarms = (idmo) => {
  return idmo
    ? idmo.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
        htlpAddresses,
        htlpContract
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        earnToken: 'IDMO',
        earnTokenAddress: idmo.contracts.idmo.options.address,
        icon,
        htlpAddresses,
        htlpContract
      }),
    )
    : []
}


export const getViewPoolInfo = async (masterChefContract) => {
  if (masterChefContract) {
    let viewPoolInfo = await masterChefContract.methods.viewPoolInfo(0).call();
    return viewPoolInfo
  } else {
    return []
  }
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(0, pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint(0)
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingToken(0, pid, account).call()
}

export const getMultiplier = async (masterChefContract, number) => {
  return masterChefContract.methods.getMultiplier(0, number, number + 1).call()
}

export const getstartBlock = async (masterChefContract) => {
  return masterChefContract.methods.startBlock(0).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
  tokenSymbol,
  name
) => {
  // Get balance of the token address   etc:3000DAI
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call() // etc:18
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call() // 1 lptoken
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call() // 100 lptken
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()  // 1000 eth 
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  // console.log(lpContract, pid + 'aaalpContract');
  // console.log(masterChefContract, pid + 'aaamasterChefContract');
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  // console.log(tokenAmount.toNumber(), pid + 'tokenAmount');
  // console.log(wethAmount.toNumber(), pid + 'wethAmount');
  // console.log(totalLpWethValue.toNumber(), 'totalWethValue');
  // let aa = await getPoolWeight(masterChefContract, pid)
  // console.log(aa.toNumber(), 'poolWeight');
  if (name === "IDMO-ETH") {
    return {
      tokenAmount,
      wethAmount,
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
      tokenPriceInWeth: new BigNumber(lpContractWeth).div(new BigNumber(tokenAmountWholeLP)),
      poolWeight: await getPoolWeight(masterChefContract, pid),
      tokenSymbol,
      name
    }
  }
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
    tokenSymbol,
    name
  }
}

export const getIDMOAPY = async (
  masterChefContract,
  pid,
) => {
  // console.log(pid, 'pid');
  const { amount } = await masterChefContract.methods.poolInfo(0, pid).call();
  // console.log(amount, 'amount');
  return {
    totalWethValue: new BigNumber(amount).div(new BigNumber(10).pow(18)),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getHTAPY = async (
  masterChefContract,
  wethContract,
  htlpContract,
  tokenContract,
  pid,
) => {
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(htlpContract.options.address)
    .call()
  const lpContractWeth = await wethContract.methods
    .balanceOf(htlpContract.options.address)
    .call()  // 1000 eth 
  // 火币价格  每一个火币对应多少ETH
  let huobi_price = new BigNumber(lpContractWeth).div(tokenAmountWholeLP);
  // console.log(huobi_price, 'huobi_price');
  // console.log(pid, 'htpid');
  const { amount } = await masterChefContract.methods.poolInfo(0, pid).call();
  // console.log(amount, 'htamount');
  return {
    totalWethValue: new BigNumber(amount).div(new BigNumber(10).pow(18)).times(huobi_price),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getIDMOUSDTAPY = async (
  masterChefContract,
  wethContract,
  htlpContract,  // IDMO地址
  tokenContract,  //usdt地址
  lpContract,  // IDMO-USDT权益币地址
  pid,
) => {
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

  const tokenDecimals = await tokenContract.methods.decimals().call() // 获取usdt的精度， 一般币种为18， USDT特殊为 6
  const balance = await lpContract.methods.balanceOf(masterChefContract.options.address).call() // 获取主合约中有IDMO-USDT权益币的数量， 即IDMO-USDT池中存入的权益币数量
  const totalSupply = await lpContract.methods.totalSupply().call() // 获取IDMO-USDT权益币的总发行量

  const lpContractIDMO = await htlpContract.methods.balanceOf(htlpContract.options.address).call() // 获取权益币地址中的IDMO的数量

  const portionLp = balance / totalSupply;  // 获取存入池中的IDMO-USDT权益币的数量占总发行量的比例

  const totalLpUSDTValue = portionLp * (tokenAmountWholeLP) * (2); // 主合约中权益币的价值， 以USDT计价 （乘以2， 表示权益币地址中两种币的总价值）， 即存入主合约中的IDMO-USDT权益币的价值值多少USDT

  const totalLpUSDTAmount = totalLpUSDTValue / Math.pow(10, tokenDecimals); // 获取池中IDMO-USDT权益币值USDT的个数， 由于1个USDT 在程序中为 1000000， 转换为USDT个数

  const IDMO_usdt_price = (tokenAmountWholeLP / Math.pow(10, tokenDecimals)) / (lpContractIDMO / Math.pow(10, 18)); // 获取IDMO对USDT的价格， 即多少USDT对应一个IDMO

  // console.log(amount, 'htamount');
  return {
    IDMO_usdt_price,
    totalLpUSDTAmount,
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account, callback) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      callback(tx)
      return tx.transactionHash
    })
}

export const getidmoSupply = async (idmo) => {
  return new BigNumber(await idmo.contracts.idmo.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account, callback) => {
  return masterChefContract.methods
    .deposit(
      0,
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      callback(tx)
      return tx.transactionHash
    })
    .on('receipt', function (receipt) {
      console.log(receipt, 'receipt');
    })
    .on('confirmation', function (confirmationNumber, receipt) {

    })
}

export const unstake = async (masterChefContract, pid, amount, account, callback) => {
  return masterChefContract.methods
    .withdraw(
      0,
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      callback(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(0, pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(0, pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

var baseApi = 'https://defi.idmoswap.com/api'
// var baseApi = 'http://192.168.1.35:8080/api'
export const myFetch = (url, params) => {
  if (params) {
    const paramsArray = []
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`))
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`
    } else {
      url += `&${paramsArray.join('&')}`
    }
  }
  let option = {
    method: 'GET'
  }
  return new Promise((resolve, reject) => {
    fetch(baseApi + url, option)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('服务器异常')
        }
      }).then(data => {
        if (data.flag === 100101) {
          resolve(data.data)
        } else {
          toaster.notify(data.message || '服务器异常')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getFarmsAxjx = () => {
  return myFetch('/mgm/getPoolInfo')
}