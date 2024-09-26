import { useEffect,useState } from 'react';
import './Register.css';
import Logo from '../Images/Logo.png'


function Register() {
  const position = {lat:53.4,lng:10};
  const [open,setOpen] = useState(false)
  
  let name = "";
  let roll = 0;
  let email = "";
  let password = "";
  let phone = "";

  function RegisterApiService(name,roll,email,password,phone){
    fetch('http://198.199.81.203:8000/user/register',{
        method:'POST',
        body:JSON.stringify({
            name:name,
            roll:roll,
            email:email,
            password:password,
            phone:phone
        }),      
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then(res => res.json())
      .then((res)=>{
        console.log(res)
        alert("El usuario fue regsitrado en el sistema espera aprobacion de administrador")
      })
      .catch(e => console.log(e))
  }

  return (
      <div className='Register'>
        <div className='Card-container'>
            <img src={Logo} alt='Logo' style={{width:200,height:60}}/>
            <h1>Registro</h1>
            <div className='textContainer'>
                <p>Email</p>
                <input type='email'
                 onChange={(evt)=>{
                    email = evt.target.value
                 }}
                />
            </div>
            <div className='textContainer'>
                <p>Contraseña</p>
                <input type='password'
                    onChange={(evt)=>{
                        password = evt.target.value
                     }}
                />
            </div>
            <div className='textContainer'>
                <p>Nombre</p>
                <input type='text'
                    onChange={(evt)=>{
                        name = evt.target.value
                     }}
                />
            </div>
            <div className='textContainer'>
                <p>Numero de telefono</p>
                <input type='number'
                    onChange={(evt)=>{
                        phone = evt.target.value
                     }}
                />
            </div>
            <button
             style={{cursor:'pointer'}}
             onClick={()=>{
                    RegisterApiService(name,roll,email,password,phone)
             }}
            >
                <a>Registrate</a>
            </button>
        </div>
      </div>
  );
}

export default Register;
