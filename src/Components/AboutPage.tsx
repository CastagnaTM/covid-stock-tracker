import React from 'react';
import Cees from './headshot.png';

function AboutPage() {
  return (
    <div>
      <p>Hello this is the about page and will soon contain a headshot of Cees :D</p>
      <img src={Cees}
        style={{marginLeft: '20px'}}
      ></img>
      
    </div>
  );
}

export default AboutPage;
