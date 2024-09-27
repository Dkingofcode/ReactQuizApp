import React from 'react';
import ReactLogo from "./assets/react.svg"; 


const Header = () => {
  return (
    <div>
     <div>
      <img src={ReactLogo} alt='react logo' />
       <h1>The React Quiz</h1>
        </div>

    </div>
  )
}

export default Header;
