/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import useWindowWidth from '../../hooks/useWindowsWidth';

import { HeaderWrapper } from './Styled';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

interface HeaderProps {
  handleB: Function;
}

const Header: React.FC<HeaderProps> = ({ handleB }: HeaderProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<any | null>(null);
  const [search, setSearch] = useState<any>('');
  const onSmallScreen = useWindowWidth();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const dispatch = useDispatch();

  // handle ProfileMenuOpen
  function handleProfileMenuOpen(event: any) {
    setAnchorEl(event.currentTarget);
  }

  // handle Mobile MenuClose
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // handle handleMenuClose
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // handle Mobile MenuOpen
  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // handle log out
  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  console.log(window.location.pathname, 'history');

  useEffect(() => {
    setSearch('');
  }, [window.location.pathname]);
  // search API call
  useEffect(() => {
    const { pathname } = window.location;
    const arr = pathname.split('/');
    const lastPath = arr[arr.length - 1];
    const handler = setTimeout(() => {
      if (lastPath == 'event-history') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'ADMIN_TRANSACTION_LEDGER',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'sent-transactional-invoices-status') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'ADMIN_INVOICE_LEDGER',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'factor-invoices-to-purchase') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'ACCOUNTING_DETAILS',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'matched-transactional-invoice') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'NATIONAL_INVOICE',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'user-list') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'USER_LIST',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'month-end-invoices') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'INVOICE_SUMMARY',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'lms-staging') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'LMS_STAGING',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'transactional-invoices') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'TRANS_NOTIONAL_INVOICE',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'lms-invoice-history') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'LMS_INVOICE_HISTORY',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'unmatched-invoices') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'REJECTED_INVOICE_TABLE',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'credit-score-history') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'CREDIT_HISTORY',
          payload: {
            search
          }
        });
      }
      if (lastPath == 'advances-per-billing-invoice') {
        window.localStorage.setItem('search', search);
        dispatch({
          type: 'ADVANCE_REPORT',
          payload: {
            search
          }
        });
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search, dispatch]);

  // search Handler
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value);
    window.localStorage.setItem('search', '');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={(e) => handleProfileMenuOpen(e)}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <HeaderWrapper className='{classes.grow}'>
      <AppBar position='static'>
        <Toolbar>
          {onSmallScreen ? (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={() => handleB()}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ''
          )}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
              </svg>
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              value={search}
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchHandler}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={(e) => handleProfileMenuOpen(e)}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </HeaderWrapper>
  );
};

export default Header;
