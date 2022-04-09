import React from 'react'
import Head from 'next/head'
import Header from './header'
import dynamic from 'next/dynamic';

const Layout = props => (
  <>
    <Head>
      <title>Amusement Club Gacha</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      <meta name="description" content="Amusement Club is a global Discord bot for collecting amazing cards from your favourite show or game! Gift a fun game to your Discord community!" />
      <meta property="og:title" content="Amusement Club: Discord gacha" />
      <meta property="og:type" content="discord bot" />
      <meta property="og:url" content="https://club.amusement.cafe" />
      <meta property="og:image" content="https://amusementclub.nyc3.digitaloceanspaces.com/web/amusement-logo-small.png" />
      <meta property="og:description" content="Global gacha game for Discord with thousands of cute and fancy cards made by the bot's community." />
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
        max-width: 65rem;
        margin: auto;
        padding-left: 1rem;
        padding-right: 1rem;
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
        color: #79F2DF;
        margin: 30px 0;
      }

      h2 {
        width: 100%;
        display: block;
        font-size: 30px;
        font-weight: 600;
        color: #79F2DF;
      }

      a {
        text-decoration: none;
        color: #4b0118;
        font-weight: 500;
      }

    `}</style>
    <Header />
    <main>
      <div className="container">{props.children}</div>
    </main>
  </>
)

export default Layout
