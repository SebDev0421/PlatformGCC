import { useEffect,useState } from 'react';
import './Main.css';
import MapService from '../Components/MapService'
import Logo from '../Images/Logo.png'
import Usuario from '../Icons/usuario.png'
import Solicitud from '../Icons/solicitud.png'

import Options from '../Components/Options';


let listUsers = []


function Main() {

  const [userInformation,setUserInformation] = useState()
  const [componentOption,setComponentOption] = useState()

  useState(()=>{
   setUserInformation(<div style={{position:'absolute',top:0,right:0,display:'flex',flexDirection:'row',justifyItems:'center'}}>

                      <img src={Usuario} alt='photo' style={{width:40,height:40,borderRadius:20,margin:5}}/>
                      <p style={{color:'white'}}>{JSON.parse(localStorage.getItem('credentials')).user.name}</p>
                    </div>
    )
  },[])

  // set interval get database last trasmition of user
  return (
      <div className='Main'>
        
        {componentOption}
        <div className='Header-container'>
          <img src={Logo} alt='Logo' style={{width:100,height:30,top:10,left:10,position:'absolute'}}/>
          {userInformation}
        </div>
        <div className='Map-container'>
            <MapService/>
            <div className='services-button'
              onClick={()=>{
                setComponentOption(<Options exit = {(value)=>{
                  console.log(value)
                  setComponentOption()
                }}/>)
              }}
            >
              <img src={Solicitud} alt='Logo' style={{width:30,height:30}}/>
            </div>
        </div>
      </div>
  );
}

export default Main;
