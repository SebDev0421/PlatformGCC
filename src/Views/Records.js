import { useEffect,useState } from 'react';
import './Records.css';
import MapRecords from '../Components/MapRecords'
import Logo from '../Images/Logo.png'
import { useParams } from 'react-router-dom'



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
  const { id } = useParams()

  // set interval get database last trasmition of user
  return (
      <div className='Main'>
        <div className='Header-container'>
            <img src={Logo} alt='Logo' style={{width:100,height:30,top:10,left:10,position:'absolute'}}/>
        </div>
        <div className='Map-container'>
            <MapRecords idUser={id}/>
        </div>
      </div>
  );
}

export default Main;
