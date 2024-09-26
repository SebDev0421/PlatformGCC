import { useEffect, useMemo, useState } from "react";
import './MapRecords.css'

import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';





function App(props) {
  const position = { lat: 4.715092503785059, lng: -74.12773658824975 };
  const [open, setOpen] = useState(false);
  const [listPos, setListPos] = useState([]);
  const [firstConn,setFirtsConn] = useState("Primera conexion");
  const [lastConn,setLastConn] = useState("");

  const [slectedMarker, setSlectedMarker] = useState({
    lat: 0,
    lng: 0,
    name: "",
    dateTime: "",
    Battery: 0,
  });

  const [nameUser,setNameUser] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")

  function getUser(idUser){
    fetch('http://198.199.81.203:8000/user/consultUser',{
      method:'POST',
      body:JSON.stringify({
        idUser: idUser
      }),      
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    .then(res=>res.json())
    .then((res)=>{
        console.log(res)
        setNameUser(res.name)
        setEmail(res.email)
        setPhone(res.phone)
        
    })
    .catch(e => console.log(e))
  }


  useEffect(()=>{

    getUser(props.idUser);

  },[props.idUser])


  function consultCurrentPosAPI(userId,dateLow,dateHigh) {
    //user id example '66e3d0a1ecc603b61c2f80e8'
    fetch("http://198.199.81.203:8000/track/readUserRegister", {
      method: "POST",
      body: JSON.stringify({
         userId: userId ,
         isoDate1:dateLow,
         isoDate2:dateHigh
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const lastPoint = res.length;

        setFirtsConn(res[0].dateTime)
        setLastConn(res[lastPoint-1].dateTime)
        setListPos(res);
      })
      .catch((e) => console.log(e));
  }

  /* useEffect(() => {
    consultCurrentPosAPI("66e988896d3d8413ff37a678");
  }, []); */

  const renderPositions = useMemo(() => {
    return (
      listPos &&
      listPos.length > 0 &&
      listPos.map(({ location, dateTime, userId, Battery }) => {
        const [lat, lng] = location;
        return (
          <AdvancedMarker
            key={userId + dateTime}
            position={{ lat, lng }}
            onClick={() => {
              setOpen(true);
              console.log("Clicked", {
                lat,
                lng,
                name: userId,
                dateTime,
                Battery,
              });

              setSlectedMarker({ lat, lng, name: userId, dateTime, Battery });
            }}
          >
            <Pin
              background={"#0000"}
              borderColor={"#0000"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>
        );
      })
    );
  }, [listPos]);

  return (
    <APIProvider apiKey={"AIzaSyDvdVuPcA43FM3OA9DilnVcF7rtpcNR2sY"}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={position}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"d23d71c99cbac180"}
      >
        {renderPositions}

        {open && (
          <InfoWindow
            position={{ lat: slectedMarker.lat, lng: slectedMarker.lng }}
            onCloseClick={() => {
              setOpen(false);
            }}
          >
            <p style={{ color: "black" }}>{slectedMarker.name}</p>
            <p style={{ color: "black" }}>{slectedMarker.dateTime}</p>
            <p style={{ color: "black" }}>
              {(slectedMarker.Battery * 100).toFixed(2)}%
            </p>
          </InfoWindow>
        )}
      </Map>
      <div className="card-information">
        <h4>Informacion usuario</h4>
        <h5>{nameUser}</h5>
        <a>{email}</a>
        <a>{phone}</a>
        <a>{props.idUser}</a>
        <a>{firstConn}</a>
        <a>{lastConn}</a>
      </div>

      <div className="calendarContainer">
        <Calendar onChange={(value)=>{
            
            const dateObject = new Date(value)
            const isoDateLow = dateObject.toISOString()
            
            const dategetting = new Date(isoDateLow)
            
            dategetting.setDate(dategetting.getDate()+1)

            const isoDateHigh = dategetting.toISOString()
            console.log(isoDateHigh)
            
            console.log(props.idUser)

            consultCurrentPosAPI(props.idUser,isoDateLow,isoDateHigh);
            
        }} />
    </div>
    </APIProvider>
  );
}

export default App;