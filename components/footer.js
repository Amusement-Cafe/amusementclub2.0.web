import React from 'react'
import { Divider } from '@material-ui/core' 

export default class Footer extends React.Component {
  constructor(props) { super(props) }

  render() {
  return (
    <div className="footer">
      <Divider />
      <div className="content">
        <div className="block">
          <a href="https://discord.com/">
            <img src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/discord_logo_2021.svg"/>
          </a>
          <img src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/amusement-cafe-smalltext.png"/>
          <span><b>support@amusement.cafe</b></span>
          <span><b>Website <a href="https://twitter.com/madebynoxc">@madebynoxc</a></b></span>
          <span><b>Bort art by <a href="https://twitter.com/NAMIORII">@NAMIORII</a></b></span>
        </div>
        <div className="block">
          <span className="title">Get Started</span>
          <ul>
            <li><a href="https://discordapp.com/oauth2/authorize?client_id=340988108222758934&scope=bot&permissions=126016">Invite</a></li>
            <li><a href="https://docs.amusement.cafe/">Documentation</a></li>
            <li><a href="https://discord.gg/kqgAvdX">Bot Discord</a></li>
          </ul>
        </div>
        <div className="block">
          <span className="title">Links</span>
          <ul>
            <li><a href="https://github.com/Amusement-Cafe/amusementclub2.0">GitHub</a></li>
            <li><a href="https://github.com/Amusement-Cafe">Amusement Cafe</a></li>
            <li><a href="https://github.com/NoxCaos/amusement-club">Legacy Bot</a></li>
            <li><a href="https://ko-fi.com/noxcaos">Donate</a></li>
          </ul>
        </div>
        <div className="block">
          <span className="title">Using</span>
          <ul>
            <li><a href="https://github.com/abalabahaha/eris">Eris</a></li>
            <li><a href="https://nodejs.org/">NodeJS</a></li>
            <li><a href="https://www.mongodb.com/">MongoDB</a></li>
            <li><a href="https://reactjs.org/">React</a></li>
            <li><a href="https://nextjs.org/">NEXT.js</a></li>
            <li><a href="https://material-ui.com">Material UI</a></li>
          </ul>
        </div>
      </div>

    <style jsx>{`
    .footer {
      width: 100%;
      bottom: 0;
      color: '#fff';
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .footer .content {
      display: flex;
      margin-top: 1em;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 5%;
    }

      .footer .content .block {
        display: flex;
        flex-direction: column;
        vertical-align: top;
      }

        .footer .content .block span {
          display: block;
          font-size: 14px;
        }

        .footer .content .block span.title {
          font-weight: bold;
          font-size: 25px;
        }

        .footer .content .block ul {
          list-style: none;
          padding: 0;
        }

          .footer .content .block ul li {
            opacity: .8;
          }

          .footer .content .block ul li:hover {
            opacity: 1;
          }

            .footer .content .block ul li a {
              font-weight: 600;
            }

      .footer .content img {
        width: 136px;
        margin-bottom: 10px;
      }

      .footer .content .centered-span {
          display: block;
          width: 100%;
          font-size: 14px;
          text-align: center;
          margin-top: -20px;
          margin-bottom: 20px;
      }

      `}</style>
      </div>
    )
  }
}
