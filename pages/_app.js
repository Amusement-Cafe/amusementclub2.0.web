import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'createEmotionCache';
import { SessionProvider } from "next-auth/react"
import { MaterialUIControllerProvider } from "context";
import Sidenav from 'Sidenav';
import routes from 'routes';

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const darkMode = true
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <MaterialUIControllerProvider>
          <ThemeProvider theme={darkMode? themeDark : theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Sidenav
              color="primary"
              brand={'https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/buns_logo_white.png'}
              brandName="Amusement Club"
              sessionRoutes={routes.sessionRoutes}
              globalRoutes={routes.globalRoutes}
              //onMouseEnter={handleOnMouseEnter}
              //onMouseLeave={handleOnMouseLeave}
            />
            <Component {...pageProps} />
          </ThemeProvider>
        </MaterialUIControllerProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};