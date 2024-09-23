import { useEffect,useState } from 'react';
import './Main.css';
import MapService from '../Components/MapService'
import Logo from '../Images/Logo.png'


let listUsers = []

function getUsersList(){
  console.log("Getting users List")
  fetch('http://localhost:8000/user/consultListUsersMap',{
    method:'POST',
    body:JSON.stringify({
      pass:'gcc12345'
    }),      
    headers:{
      'Content-Type' : 'application/json'
    }
  })
  .then(res=>res.json())
  .then((res)=>{
    listUsers = res.list
  })
  .catch(e => console.log(e))
}



function Main() {
  const [open,setOpen] = useState(false)

  // set interval get database last trasmition of user
  return (
      <div className='Main'>
        <div className='Header-container'>
        <img src={Logo} alt='Logo' style={{width:100,height:30,top:10,left:10,position:'absolute'}}/>
        </div>
        <div className='Map-container'>
            <MapService/>
        </div>
      </div>
  );
}

export default Main;
