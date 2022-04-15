import Link from 'next/link'
import cookie from 'js-cookie'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Avatar, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';

import { Settings } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    height: 35,
    width: 35
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  appbar: {
    backgroundColor: '#39bfaa',
    position: 'fixed',
  },
  toolbar: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: '65rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const Header = (props) => {
  const username = cookie.get('username')
  const avatar = cookie.get('avatar')
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <header>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar variant="dense" className={classes.toolbar}>

          {isTabletOrMobile?(
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>):
          (<IconButton color="inherit">
            <Link href="/">
              <img src={'https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/buns_logo_white.png'} className={classes.avatar} />
            </Link>
          </IconButton>
          )}

          {/*<div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>*/}

          <Link href="/cards">
            <Button color="inherit">Sample Cards</Button>
          </Link>

          <a href="https://docs.amusement.cafe/en/latest-changelog" style={{color: '#fff'}}>
            <Button color="inherit">Latest Changelog</Button>
          </a>

          {/*<Link href="/cards">
            <Button color="inherit">Store</Button>
          </Link>*/}

          <a href="https://docs.amusement.cafe/" style={{color: '#fff'}}>
            <Button color="inherit">Documentation</Button>
          </a>

          <div className={classes.grow} />

          {/*<IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <Settings />
            </Badge>
        </IconButton>*/}
          {/*username && avatar? (
            <IconButton color="inherit">
              <Link href="/profile">
                <Avatar alt={username} src={avatar} className={classes.avatar} />
              </Link>
            </IconButton>
          ):(
            <Link href="/api/login">
              <Button color="inherit">Login</Button>
            </Link>
          )*/}
        </Toolbar>
      </AppBar>
      <style jsx>{`
        .nav {
          display: flex;
          margin-left: auto;
          margin-right: auto;
          max-width: 65rem;
        }

        ul {
          display: flex;
          list-style: none;
          margin-left: auto;
          vertical-align: middle;
        }

        ul.left {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 1em;
        }

        li {
          margin-right: 1rem;
          vertical-align: middle;
        }

        a {
          color: #9f9f9f;
          text-decoration: none;
        }

        a:hover {
          color: #fff;
        }

        header {
          color: #9f9f9f;
          background-color: #222;
          font-size: 20px;
        }

        .alexandrite-header {
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, #eb2196, #0d4acf, #2b9ab5);
          box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.2), 
                      0px -2px 2px 0px rgba(0, 0, 0, 0.14), 
                      0px -3px 1px -2px rgba(0, 0, 0, 0.12);
        }
        
        .bort-header {
          width: 100%;
          height: 7px;
          background: linear-gradient(to right, #79F2DF, #2B4E54, #4B0017, #2C000D);
        }
      `}</style>
    </header>
  )
}

export default Header
