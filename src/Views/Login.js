import { useEffect,useState } from 'react';
import './Login.css';
import Logo from '../Images/Logo.png'


function Login() {
  const position = {lat:53.4,lng:10};
  let email = "";
  let password = "";
  let statusCharger;

  function loginApiService(email,password){
    fetch('http://198.199.81.203:8000/user/login',{
        method:'POST',
        body:JSON.stringify({
            email:email,
            password:password
        }),      
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        return [res.status,res.json()]
        })
      .then((res)=>{
        if(res[0]== 401){
            res[1].then((data)=>{
            alert(data.message)
            })
        }else if(res[0]== 200){
            res[1].then((data)=>{
                const roll = data.user.roll
                
                if(roll == 0){
                    console.log(data)
                    //save credentials
                    localStorage.setItem('credentials',JSON.stringify(data))
                    window.open("/app",'_self')
                    
                }else{
                    alert("Usuario no autorizado")
                }
            })
        }
      })
      .catch(e => console.log(e))
  }

  return (
      <div className='Login'>
        <div className='Card-container'>
            <img src={Logo} alt='Logo' style={{width:200,height:60}}/>
            <h1>Login</h1>
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
            
            <button
                onClick={()=>{

                    loginApiService(email,password)

                }}
                style={{cursor:'pointer'}}
            >
                <a>Ingresar</a>
            </button>

            <p
                onClick={()=>{
                    console.log('open register')
                    window.open("/forget",'_self')
                 }}
    
                 style={{cursor:'pointer'}}
            >Olvidaste tu contraseña</p>
            
            <p
             onClick={()=>{
                console.log('open register')
                window.open("/register",'_self')
             }}

             style={{cursor:'pointer'}}
            >Registrate</p>
        </div>
      </div>
  );
}

export default Login;
