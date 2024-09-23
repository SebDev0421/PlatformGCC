import { useEffect,useState } from 'react';
import './Login.css';
import Logo from '../Images/Logo.png'


function Home() {
  const position = {lat:53.4,lng:10};
  const [open,setOpen] = useState(false)
  return (
      <div className='Login'>
        <div className='Card-container'>
            <img src={Logo} alt='Logo' style={{width:200,height:60}}/>
            
        </div>
      </div>
  );
}

export default Home;
