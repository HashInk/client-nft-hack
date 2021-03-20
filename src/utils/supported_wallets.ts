import { AbstractConnector } from '@web3-react/abstract-connector';

import { injected, magic, walletconnect, walletlink } from './connectors';

interface WalletInfo {
  connector: AbstractConnector;
  name: string;
  href: string | null;
  mobile?: true;
  mobileOnly?: true;
}

//todo: replace link for coinbase wallet
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  // INJECTED: {
  //   connector: injected,
  //   name: 'Injected',
  //   href: null,
  // },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    href: null,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase',
    href: null,
  },
  COINBASE_LINK: {
    connector: walletlink,
    name: 'Coinbase',
    href: 'https://go.cb-w.com/7BIvRapG0db',
    mobile: true,
    mobileOnly: true,
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    href: null,
    mobile: true,
  },
  // MAGIC: {
  //   connector: magic,
  //   name: 'Magic',
  //   href: null,
  // },
};
