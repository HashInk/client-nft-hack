import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { NextComponentType } from 'next';
import NextApp from 'next/app';
import Head from 'next/head';

import Error from '../components/Error';
import Layout from '../components/Layout';
import theme, { GlobalStyles } from '../theme';

function FunctionalApp({
  Component,
}: {
  Component: NextComponentType;
}): JSX.Element | null {
  const { error } = useWeb3React();

  return <Layout>{error ? <Error /> : <Component />}</Layout>;
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
