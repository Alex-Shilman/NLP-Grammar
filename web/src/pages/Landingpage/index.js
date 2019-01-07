import React from 'react';
import landingImage from '../../assets/landing.png';
import styled from 'styled-components';
import { NavigateNext } from 'styled-icons/material'
import { Link } from "react-router-dom";

const Next = styled(NavigateNext)`
  color:#2185C9;
  border: 1px solid #2185C9;
`;

export default () => (
  <div>
    <h2 style={{padding:5}}>SERMO.io</h2>
    <img src={landingImage} alt="landingImg" />
    <Link to="/dashboard"><Next size={70}/></Link>
  </div>
)