import React from 'react'
import Head from 'next/head'
import Header from './header'

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>Amusement Club</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      <meta name="description" content="Claim and create cards, choose your hero character, craft various effects and trade on auctions." />
      <meta property="og:title" content="Amusement Club - Discord bot" />
      <meta property="og:type" content="discord bot" />
      <meta property="og:url" content="https://amu.cards" />
      <meta property="og:image" content="https://a.amu.cards/web/amusement-logo-small.png" />
      <meta property="og:description" content="Claim and create cards, choose your hero character, craft various effects and trade on auctions." />
    </Head>
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background-color: #222;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 1px;
        color: #fff;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }

      .container {
        max-width: 63rem;
        margin: auto;
      }

      pre code {
        background-color: rgba(20,20,20,0.3);
        border-radius: 3px;
        display: block;
        padding: 20px;
      }

      code {
        display: inline;
        font-family: Consolas, Menlo, Courier, monospace;
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        border-radius: 3px;
        background-color: rgba(20,20,20,0.3);
      }

      h1 {
        width: 100%;
        display: block;
        font-size: 10em;
        font-weight: 700;
        color: #c14c2c;
        margin: 30px 0;
      }

      h2 {
        width: 100%;
        display: block;
        font-size: 30px;
        font-weight: 600;
        color: #c14c2c;
      }

      a {
        text-decoration: none;
        color: #e5cd8f;
        font-weight: 500;
      }

    `}</style>
    <main>
      <div className="container">{props.children}</div>
    </main>
  </React.Fragment>
)

export default Layout
