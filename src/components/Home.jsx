import React, { useEffect, useContext } from 'react';
import axios from "axios";

import ConfContext from '../context/ConfContext'
import Header from './Header';
import Body from './Body';
import '../css/Home.css'

export default function Home() {
  const { ca, setCa } = useContext(ConfContext);

  useEffect(() => {
    // getCA()
  }, []);

  const getCA = async () => {
    await axios.get("http://localhost:3000/api/ca")
    .then(res => {
      if (res.data === null) {
        setCa([])
        return
      }
      setCa(res.data);
    })
  }

  return (
    <div id='home'>
      <div id="home_header">
        <Header />
      </div>
      <div id="home_body">
        <Body />
      </div>
    </div>
  );
}