import { useEffect,useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
}from "@vis.gl/react-google-maps"


import './MapService.css';

import batteryFull from '../Icons/full-battery.png'
import batteryMed from '../Icons/battery.png'
import batteryHalf from '../Icons/half-battery.png'
import batteryEmpty from '../Icons/empty-battery.png'

function MapService() {
  const position = {lat:4.715092503785059,lng:-74.12773658824975};
  const [open,setOpen] = useState(false)
  const [listPos,setListPos] = useState([])

  const [popInformation,setPopInformation] = useState()
  const [batteryStatus,setBatteryStatus] = useState()
  
  function consultCurrentPosAPI(){
    fetch('http://198.199.81.203:8000/track/readLastPos')
    .then(res=>res.json())
    .then((res)=>{
      const listInf = res.listPos
      setListPos(listInf)
      //console.log(res)
    })
    .catch(e => console.log(e))
  }

  useEffect(()=>{
    consultCurrentPosAPI()
  }
  ,[])



  return (
      <APIProvider apiKey={'AIzaSyDvdVuPcA43FM3OA9DilnVcF7rtpcNR2sY'}>
        <Map
          style={{width: '100%', height: '100%'}}
          defaultCenter={position}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={"d23d71c99cbac180"}
        >
          {
            listPos.map((data)=>{
              return(
                <AdvancedMarker
                  position={{lat:data.location[0],lng:data.location[1]}}
                  onClick={()=>{
                    setOpen(true)
                    setPopInformation(
                      <InfoWindow position={{lat:data.location[0],lng:data.location[1]}} onCloseClick={()=>{setOpen(false)}}>
                        <p>{data.name}</p>
                        <p>{data.dateTime}</p>
                        <p>{data.battery*100}</p>
                      </InfoWindow>
                    )
                    setOpen(true)}}
                >
                  <Pin
                    background={"grey"}
                    borderColor={"green"}
                    glyphColor={"purple"}
                  />
                </AdvancedMarker>
              )
            },[listPos])
          }

          {open && (
            popInformation
          )}
        </Map>

        <div className="card-information" style={{height:'90%',backgroundColor:'white'}}>
          <h3>Lista de usuarios</h3>
          {
            listPos.map((data)=>{
              /* 
              else if(Math.round(data.battery*100)>40 && Math.round(data.battery*100)<=80){
                setBatteryStatus(<img src={batteryMed} alt='battery' style={{width:30,height:30}}/>)
              }
              else if(Math.round(data.battery*100)>10 && Math.round(data.battery*100)<=40){
                setBatteryStatus(<img src={batteryHalf} alt='battery' style={{width:30,height:30}}/>)
              }
              else if(Math.round(data.battery*100)<=10){
                setBatteryStatus(<img src={batteryEmpty} alt='battery' style={{width:30,height:30}}/>)
              } */
              return(
                <div className='user-information' onClick={()=>{
                  console.log(data.id)
                  window.open("/records/"+data.id);
                }}>
                  <a>
                    {data.name}
                  </a>
                  <a>
                    {data.id}
                  </a>
                  <a>
                    {data.location}
                  </a>
                  <div className='battery-information' style={{position:'relative',display:'flex',textAlign:'center',justifyContent:'center'}}>
                    
                    <img src={batteryMed} alt='battery' style={{width:30,height:30}}/>

                    <a>
                      {Math.round(data.battery*100)}
                    </a>
                  </div>
                  
                </div>
              )
            },[listPos])
          }
        </div>

      </APIProvider>
  );
}

export default MapService;
