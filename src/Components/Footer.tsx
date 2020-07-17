import React from 'react';
import { FooterStyle } from '../Components/Styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
const Footer = () => {
  return (
    <FooterStyle>
      <div>
        <p>Thomas Castagna</p> 
        <a href="https://github.com/CastagnaTM" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/castagnatm/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
      <div>
        <p>Cees Wang</p> 
        <a href="https://github.com/CeesWang" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/cees-wang/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
      <div>
        <p>Amber Ye</p> 
        <a href="https://github.com/tingtingye24" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/ting-ting-ye-73a6b0157/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
    </FooterStyle>
  );
}

export default Footer;
