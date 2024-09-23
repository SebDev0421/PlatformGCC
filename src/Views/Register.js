import { useEffect,useState } from 'react';
import './Register.css';
import Logo from '../Images/Logo.png'


function Register() {
  const position = {lat:53.4,lng:10};
  const [open,setOpen] = useState(false)
  return (
      <div className='Register'>
        <div className='Card-container'>
            <img src={Logo} alt='Logo' style={{width:200,height:60}}/>
            <h1>Login</h1>
            <div className='textContainer'>
                <p>Email</p>
                <input type='email'/>
            </div>

            <div className='textContainer'>
                <p>Contraseña</p>
                <input type='password'/>
            </div>
            
            <button>
                <a>Ingresar</a>
            </button>

            <p>Olvidaste tu contraseña</p>
            
            <p>Resgitrate</p>
        </div>
      </div>
  );
}

export default Register;
