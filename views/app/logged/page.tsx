
"use client"
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/logged_page.css'
import {clean_table_cc} from '../services/clean_table_cc';
import {logOut} from '../services/exitService';
import {nextPage} from '../services/next_page_function';
import {ccValidation} from '../services/cc_validation';

const Page: React.FC = () => {
  useEffect(() => {
    
    const userName = localStorage.getItem('nombre_Empleado');
    const lastName = localStorage.getItem('apellido_Empleado');
   
    if (userName && lastName) {
      const userElement = document.getElementById('user_name');
      if (userElement) {
        userElement.innerText = userName +' '+ lastName;
        console.log(userName)
      }
    }
  }, []); 


  const [Identificacion, setIdentificacion] = useState<string>('');

  const fill = async (e:React.MouseEvent<HTMLButtonElement>)=>{

    try {
     
     await ccValidation(Identificacion);

    } catch (error) {
      
      return console.error({errors:"No se pudo llenar la tabla",error})
    }
  }


  const tableClean = (e:React.MouseEvent<HTMLButtonElement>)=>{

    try {

      clean_table_cc()

    } catch (error) {
      
      return console.error({errors:"No se pudo limpiar la tabla",error})
    }
  }

   const exit = (e: React.MouseEvent<HTMLButtonElement>)=>{

    try {
      
      logOut()

    } catch (error) {
      
      console.error({errors:"Error cerrando sesion",error})
    }

   }


   const next = (e: React.MouseEvent<HTMLButtonElement>)=>{

    try {
      

      nextPage()

    } catch (error) {
      
      console.error({errors:"No se puede proceder",error})
    }
   }


  return (
    <div>
      <h2> Bienvenido, empleado <span id='user_name'></span></h2>

      <br />
      <div>
            <input type="number" id='inden_field' onChange={(e)=>setIdentificacion(e.target.value)}/> <span></span>
            <button id='search_button'  className='btn'   onClick={(e)=>{fill(e)}}>Buscar</button> <span></span>
            <button id='clean_button' className='btn'   onClick={(e)=>{tableClean(e)}}>Limpiar</button>
      </div>
      <br />
      <div>
          <table className='table table-hover'>
                <thead  className='table-active'>

                        <tr>
                              <th>Nº</th>
                              <th>Apellidos</th>
                              <th>Nombres</th>
                              <th>C.C</th>
                        </tr>

                </thead>
                <tbody id='t_body'></tbody>
          </table>
      </div>


      <div>
              <button className='btn' onClick={(e)=>{next(e)}}>Continuar</button> <span></span>
              <button className=' btn exit_button' onClick={(e)=>{exit(e)}}>Salir</button>
      </div>
     


    </div>
    
  );
};

export default Page;
