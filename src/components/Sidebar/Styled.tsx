import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export const SidebarWrapper = styled.div`
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  background-color: rgb(35, 48, 68);
  z-index: 99;
  width: 260px;

  .active {
    background: #888;
  }
`;

export const ListStyled = styled(List)`
  background: transparent;
  padding: 0;
  font-weight: 400;
  color: rgb(238, 238, 238);
  .MuiListSubheader-root {
    color: rgba(238, 238, 238, 0.9);
    font-weight: 300;
    font-size: 13px;
  }
  .MuiListItemIcon-root {
    min-width: 40px;
    color: rgb(238, 238, 238);
    svg {
      height: 20px;
    }
  }
  .MuiTypography-body1 {
    font-size: 13px;
    font-weight: 300;
  }
`;

export const ListItemStyled = styled(ListItem)`
  .MuiListItemIcon-root {
    min-width: 40px;
    color: rgb(238, 238, 238);
    font-weight: 300;
    font-size: 13px;
    svg {
      height: 20px;
    }
  }
  .MuiTypography-body1 {
    color: rgb(238, 238, 238);
    font-weight: 300;
    font-size: 13px;
  }
`;
