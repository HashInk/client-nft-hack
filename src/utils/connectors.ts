import { InjectedConnector } from '@web3-react/injected-connector';
import { MagicConnector } from '@web3-react/magic-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY;
const MAGIC_API_KEY = process.env.REACT_APP_MAGIC_API_KEY;

const RPC_URLS: { [chainId: number]: string } = {
  1: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 12000,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'HashInk',
});

export const magic = new MagicConnector({
  apiKey: 'pk_test_2DAF39CC34DBCECE',
  chainId: 1,
  email: 'hello@example.org',
});
