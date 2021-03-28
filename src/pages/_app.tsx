import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import NextApp from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout';
import theme, { GlobalStyles } from '../theme';

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component } = this.props;

    return (
      <>
        <Head>
          <title key="title">HashInk | NFT Autographs</title>
          <link key="favicon" rel="icon" href="./favicon.ico" />
          <meta
            name="description"
            content="HashInk provides NFT autographs, with royalty perks for providers
            and 100% memoribila ownership for the end user."
          />
        </Head>

        <ChakraProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <Layout>
            <Component />
          </Layout>
        </ChakraProvider>
      </>
    );
  }
}
