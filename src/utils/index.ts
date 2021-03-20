export const shortenAddress = (address: string, length = 4): string => {
  return `${address.slice(0, length + 2)}…${address.slice(
    address.length - length,
  )}`;
};

enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

export const CHAIN_ID_NAMES: { [key: number]: string } = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
};

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  4: 'rinkeby.',
};

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function toKebabCase(val: string) {
  return val
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');
}
