import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600');
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif !important; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1 {
    font-weight: bold;
  }
  
  h4:first-child {
    margin-top: 0 !important;
  }
  h4 {
    margin-top: 20px !important;
  }
`;