
export default class Footer extends React.Component {
  constructor(props) { super(props) }

  render() {
  return (
    <div className="footer">
      <hr/>
      <div className="content">
        <div className="block">
          <img src="https://amusementclub.nyc3.digitaloceanspaces.com/web/amusement-logo-small.png"/>
          <img src="https://amusementclub.nyc3.digitaloceanspaces.com/web/discord.png"/>
          <span>with ❤️ by NoxCaos</span>
        </div>
        <div className="block">
          <span className="title">Get Started</span>
          <ul>
            <li><a href="https://discordapp.com/oauth2/authorize?client_id=340988108222758934&scope=bot&permissions=126016">Invite</a></li>
            <li><a>Documentation</a></li>
            <li><a href="https://discord.gg/kqgAvdX">Bot Discord</a></li>
          </ul>
        </div>
        <div className="block">
          <span className="title">Links</span>
          <ul>
            <li><a href="https://github.com/NoxCaos/amusementclub2.0">GitHub</a></li>
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
      margin-top: 2em;
    }

    .footer .content {
      display: flex;
      margin-top: 2em;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-right: 20%;
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
