import React from 'react';

import logoASH from '../img/ash-logo-white.svg';
import '../css/Header.css'

export default function Header() {
  return (
    <div id='header'>
      <img id='header_logo' src={logoASH} alt="Logo American Steak House" width="123px" height="auto" />
    </div>
  );
}