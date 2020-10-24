import React, { useState } from 'react';
import SpotifyApp from '../components/SpotifyApp/SpotifyApp';
import './home.css';

const Home = (props) => {
  return (
    <div>
      <SpotifyApp />
    </div>
  );
  
};

Home.propTypes = {};

export default Home;