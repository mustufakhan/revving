import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useWindowWidth from '../hooks/useWindowsWidth';

export const MainContentWrap = styled.div`
  width: calc(100% - 260px);
  vertical-align: top;
  margin-left: 260px;
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  height: 100%;
  background: #f4f5fc;
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const Layout = ({ children }: { children: any }) => {
  const [state, setState] = useState({
    left: false
  });

  const onSmallScreen = useWindowWidth();

  type Anchor = 'left';
  // SwipeableDrawer Handler
  const handleB = () => {
    setState({ left: true });
  };

  // Drawer Handler
  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div id='main-wrapper'>
      {onSmallScreen ? (
        <SwipeableDrawer
          anchor='left'
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <Sidebar />
        </SwipeableDrawer>
      ) : (
        <Sidebar />
      )}
      <MainContentWrap>
        <Header handleB={handleB} />
        {children}
      </MainContentWrap>
    </div>
  );
};

export default Layout;
