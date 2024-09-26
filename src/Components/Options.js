import { useEffect, useMemo, useState } from "react";
import './Options.css'

//iconos
import Settings from '../Icons/ajuste.png';
import Clients from '../Icons/clientes.png';
import Informs from '../Icons/informe.png';
import Users from '../Icons/usuarios.png';
import ExtraTime from '../Icons/tiempo.png';
import Logout from '../Icons/cerrar-sesion.png';

import Close from '../Icons/x.png'




function Options(props) {
  
  return (
    <div className="options-conatainer">
        
        <div className="box-options">
            <div className="header">
                    <img src={Close} style={{width:30,height:30,position:'absolute',left:10}}
                        onClick={()=>{
                            props.exit(true)
                        }}
                    
                    />
                    <h3>Modulos</h3>
            </div>
            <div className="box-option">
                <img src={Settings} style={{width:90,height:90}}/>
                <p>Configuracion</p>
            </div>

            <div className="box-option">
                <img src={Clients} style={{width:90,height:90}}/>
                <p>Clientes</p>
            </div>

            <div className="box-option">
                <img src={Informs} style={{width:90,height:90}}/>
                <p>Informes</p>
            </div>

            <div className="box-option">
                <img src={Users} style={{width:90,height:90}}/>
                <p>Tecnicos</p>
            </div>
            <div className="box-option">
                <img src={ExtraTime} style={{width:90,height:90}}/>
                <p>Tiempos extra</p>
            </div>

            <div className="box-option"
                onClick={()=>{
                    //logout
                    localStorage.setItem('credentials',null)
                    window.open("/login",'_self')
                }}
            >
                <img src={Logout} style={{width:90,height:90}}/>
                <p>cerrar sesión</p>
            </div>
        </div>
    </div>
  );
}

export default Options;