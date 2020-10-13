import BigNumber from 'bignumber.js/bignumber'
import ht from '../../assets/imgpc/ht.png'
import idmoeth from '../../assets/imgpc/idmoeth.png'
import usdt from '../../assets/imgpc/usdt.png'
import usdc from '../../assets/imgpc/usdc.png'
import dai from '../../assets/imgpc/dai.png'
import YFI from '../../assets/imgpc/yfi.png'
import wbtc from '../../assets/imgpc/wbtc.png'
import comp from '../../assets/imgpc/comp.png'
import idmo from '../../assets/imgpc/idmo.png'
import htmin from '../../assets/imgpc/htmin.png'
import IDMOUSDT from '../../assets/imgpc/idmousdt.png'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  // 1:  主网   3： 测试网络
  idmo: {  // IDMO币地址
    1: '0x4Ba376dec87EDaa662Cd82278d89406864118EFd',
    3: '0xdd8e6f560510b39e94e0c4cf619c5ef0b237f180',
  },
  masterChef: { // 主合约地址
    1: '0x8D63A7416466832AAaB1482E42250F5D05B309B8',
    3: '0x2193fcc318e01715063e0377b5bf7076a09c5959',
  },
  weth: {  //  交易对 中ETH的代币地址
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    3: '0x0684e22470f12b34CcC5e00bc021832db01Cc91B',
  },
}

export const supportedPools = [
  {
    pid: 8,
    lpAddresses: {
      1: '0XEF6B7D0364253E5B04428443B76546C9F2CAE3D8',
      3: '0x816e010603F503DFD65c306821706DE71f70530C',
    },
    tokenAddresses: {
      1: '0x4Ba376dec87EDaa662Cd82278d89406864118EFd',
      3: '0x4A1665d096cb16A06D734Af5093a08e9546c1362',
    },
    name: 'IDMO-ETH',
    symbol: 'IDMO-ETH UNI-V2 LP',
    tokenSymbol: 'IDMO',
    icon: idmoeth,
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0X0D4A11D5EEAAC28EC3F61D100DAF4D40471F1852',
      3: '0xb1d4a1711A9598aeFb38c495b05F76EE8cE89869',
    },
    tokenAddresses: {
      1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      3: '0xc829555471c4fF74DCc989D845F2E675E411B55d',
    },
    name: 'USDT-ETH',
    symbol: 'USDT-ETH UNI-V2 LP',
    tokenSymbol: 'USDT',
    icon: usdt,
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0XB4E16D0168E52D35CACD2C6185B44281EC28C9DC',
      3: '0x939a6d4Fe2FA0D5806B70949c2C4F298e2C3B283'
    },
    tokenAddresses: {
      1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      3: '0xcE6f5a4e781456CDCc8809E465F403B4cC08B480'
    },
    name: 'USDC-ETH',
    symbol: 'USDC-ETH UNI-V2 LP',
    tokenSymbol: 'USDC',
    icon: usdc,
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0XA478C2975AB1EA89E8196811F51A7B7ADE33EB11',
      3: '0x4CCf13580Fd63652516efC7Dd0c8A6A559E83560'
    },
    tokenAddresses: {
      1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      3: '0xEA2Ce92aC9011fE1D3B30785EC0F72320cCd1930'
    },
    name: 'DAI-ETH',
    symbol: 'DAI-ETH UNI-V2 LP',
    tokenSymbol: 'DAI',
    icon: dai,
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0X2FDBADF3C4D5A8666BC06645B8358AB803996E28',
      3: '0x0A4413Be8C3a24c9b3Fa4E6466b2DfF7F373cb95'
    },
    tokenAddresses: {
      1: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      3: '0x9bD90cF459b64e49E252FF1EE1cF9fED44e39839'
    },
    name: 'YFI-ETH',
    symbol: 'YFI-ETH UNI-V2 LP',
    tokenSymbol: 'YFI',
    icon: YFI,
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0XBB2B8038A1640196FBE3E38816F3E67CBA72D940',
      3: '0xD59f3882b859959104e7BBb09fC500cEFe4dba0c'
    },
    tokenAddresses: {
      1: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      3: '0x1F9553A0013fe8CC603B328C710f4B9dCBb6687C'
    },
    name: 'WBTC-ETH',
    symbol: 'WBTC-ETH UNI-V2 LP',
    tokenSymbol: 'WBTC',
    icon: wbtc,
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0XCFFDDED873554F362AC02F8FB1F02E5ADA10516F',
      3: '0xaceca30d532566dF9ACB8d1CA14f65D65ED1BEc9'
    },
    tokenAddresses: {
      1: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      3: '0x45071AdB4914aEa62AF0Ce5C502335D014b9cf1e'
    },
    name: 'COMP-ETH',
    symbol: 'COMP-ETH UNI-V2 LP',
    tokenSymbol: 'COMP',
    icon: comp,
  },
  {
    pid: 6,
    lpAddresses: {
      1: '0X26CE49C08EE71AFF0C43DB8F8B9BEA950B6CDC67',
      3: '0xfC43D04B1e08f84EAF3dd40851509D19bC4985f0'
    },
    tokenAddresses: {
      1: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161',
      3: '0x67f32446e1D7ff97B0fAb0A81692b8417360F7e6'
    },
    name: 'HT-ETH',
    symbol: 'HT-ETH UNI-V2 LP',
    tokenSymbol: 'HT',
    icon: ht,
  },
  {
    pid: 9,
    lpAddresses: {
      1: '0X4BA376DEC87EDAA662CD82278D89406864118EFD',
      3: '0xDd8e6f560510B39E94e0C4cF619C5ef0B237F180'
    },
    tokenAddresses: {
      1: '0x4Ba376dec87EDaa662Cd82278d89406864118EFd',
      3: '0xDd8e6f560510B39E94e0C4cF619C5ef0B237F180'
    },
    name: 'IDMO',
    symbol: 'IDMO',
    tokenSymbol: 'IDMOSingle',
    icon: idmo,
  },
  {
    pid: 10,
    lpAddresses: {
      1: '0X6F259637DCD74C767781E37BC6133CD6A68AA161',
      3: '0x67f32446e1D7ff97B0fAb0A81692b8417360F7e6'
    },
    tokenAddresses: {
      1: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161',
      3: '0x67f32446e1D7ff97B0fAb0A81692b8417360F7e6' // 火币地址
    },
    htlpAddress: {
      1: '0x26cE49c08EE71afF0C43dB8F8B9bEa950b6cdC67',
      3: '0xfC43D04B1e08f84EAF3dd40851509D19bC4985f0' // 火币 ETH交易对的地址
    },
    name: 'HT',
    symbol: 'HT',
    tokenSymbol: 'HTSingle',
    icon: htmin,
  },
  {
    pid: 11,//IDMO-USDT
    lpAddresses: {
      1: '0X76E87FB3403657F792948E5B83635DFF3E3F387C', // 交易对地址
      3: '0x67f32446e1D7ff97B0fAb0A81692b8417360F7e6'
    },
    tokenAddresses: {
      1: '0xdAC17F958D2ee523a2206206994597C13D831ec7', //usdt地址
      3: '0x67f32446e1D7ff97B0fAb0A81692b8417360F7e6'
    },
    htlpAddress: {
      1: '0x4Ba376dec87EDaa662Cd82278d89406864118EFd', //idmo地址
      3: '0xfC43D04B1e08f84EAF3dd40851509D19bC4985f0'
    },
    name: 'IDMO-USDT',
    symbol: 'IDMO-USDT UNI-V2 LP',
    tokenSymbol: 'IDMO-USDT',
    icon: IDMOUSDT,
  },
]
