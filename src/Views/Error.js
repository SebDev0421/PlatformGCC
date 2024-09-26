import { useEffect,useState } from 'react';
import './Login.css';
import Logo from '../Images/Logo.png'


function Home() {
  return (
      <div className='Login'>
        <div className='Card-container'>
            <img src={Logo} alt='Logo' style={{width:200,height:60}}/>
            <h1>Lo siento esta ruta no esta activa</h1>
        </div>
      </div>
  );
}

export default Home;
