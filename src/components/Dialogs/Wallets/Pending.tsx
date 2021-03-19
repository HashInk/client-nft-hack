import { Flex, Spinner, Text } from '@chakra-ui/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { FiRotateCcw } from 'react-icons/fi';

import getIcon from '../../../assets/icons';
import { injected } from '../../../utils/connectors';
import { SUPPORTED_WALLETS } from '../../../utils/supported_wallets';

export default function Pending({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}: {
  connector?: AbstractConnector;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: AbstractConnector) => void;
}) {
  function getConnectorInfo() {
    const isMetaMask = MetaMaskOnboarding.isMetaMaskInstalled();

    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];

    const icon = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];

    return (
      <>
        {getIcon(icon)}
        <Text fontSize="1.25rem" fontWeight="600" m="0">
          {name}
        </Text>
      </>
    );
  }

  function retry() {
    if (!error) return;
    setPendingError(false);
    connector && tryActivation(connector);
  }

  return (
    <Flex
      alignItems="center"
      borderRadius="base"
      justifyContent="space-between"
      my="0.5rem"
      p="0.75rem 1rem"
      textAlign="center"
      transition="all 0.3s ease 0s"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
      bgColor="blue.100"
      color="white"
      onClick={() => retry()}
      cursor={error ? 'pointer' : undefined}
      _hover={{
        bgColor: error ? 'walletItems.200' : undefined,
        textDecoration: error ? 'none' : undefined,
      }}
    >
      {getConnectorInfo()}
      {!error ? <Spinner size="sm" /> : <FiRotateCcw />}
    </Flex>
  );
}
