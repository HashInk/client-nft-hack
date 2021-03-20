import { ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { NextComponentType } from 'next';
import NextApp from 'next/app';
import Head from 'next/head';
import { useEffect, useLayoutEffect, useState } from 'react';

import Error from '../components/Error';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import theme, { GlobalStyles } from '../theme';
import { CHAIN_ID_NAMES } from '../utils';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function FunctionalApp({
  Component,
}: {
  Component: NextComponentType;
}): JSX.Element | null {
  const [painted, setPainted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setPainted(true);
  }, []);
  const { error, chainId } = useWeb3React();
  const requiredChainId = process.env.REQUIRED_CHAIN_ID;

  return !painted ? null : (
    <Layout>
      {error ? (
        <Error />
      ) : typeof requiredChainId === 'number' && chainId !== requiredChainId ? (
        <Flex
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          pt="5rem"
        >
          <VStack alignItems="center">
            <Text fontSize="1.5rem">
              Please connect to the {requiredChainId === 1 ? 'Ethereum' : ''}{' '}
              {CHAIN_ID_NAMES[requiredChainId]}
              {requiredChainId !== 1 ? ' testnet' : ''}.
            </Text>
          </VStack>
          {console.log('here')}
        </Flex>
      ) : (
        <Component />
      )}
    </Layout>
  );
}

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component } = this.props;

    return (
      <>
        <Head>
          <title key="title">HashInk | NFT Autographs</title>
          <link key="favicon" rel="icon" href="./favicon.ico" />
        </Head>

        <Web3ReactProvider getLibrary={getLibrary}>
          <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <FunctionalApp Component={Component} />
          </ChakraProvider>
        </Web3ReactProvider>
      </>
    );
  }
}
