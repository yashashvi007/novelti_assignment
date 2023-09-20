import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import {StyledAppBar , ButtonContainer , linkStyles } from './NavbarStyles.js'



function Navbar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <ButtonContainer>
          <NavLink
            to="/"
            exact
            style={linkStyles}
           
          >
            All Users
          </NavLink>
          <NavLink
            to="/create"
            style={linkStyles}
           
          >
            Create User
          </NavLink>
        </ButtonContainer>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
