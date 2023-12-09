
"use client"
import Image from 'next/image';
import './styles/index_page.css';
import jjwlogo from './images/jjw_logo.png';
import {login} from './services/loginService';
import {next_page} from './services/customer_init_page';
import { useState } from 'react';


export default function Home() {

  const [cc, setCc] = useState<string>('');
  const [password, setPassword] = useState<string>('');

    const handleLogin=async (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,action: 'login'|'signUp')=>{

      e.preventDefault();

      try {
        
        if(action==='login'){

          await login(cc,password);

        }else if(action==='signUp'){

          console.log("Funcionalidad aun no implementada");
        }

      } catch (error) {
        
      }

    }

  
    const customer_page = async (e:React.MouseEvent<HTMLButtonElement>)=>{

      try {
       
       await next_page();

      } catch (error) {
        
        console.error({errors:"No se pudo redireccionar a la pagina deseada"})
      }
    }



  return (

    <header className="hero">
    <main className="f">
      
              <Image src={jjwlogo} width={599} height={600} alt='jjw_logo'></Image>
              <h1>  Inicio de sesion</h1>
                
            <form id="forms">
              <div>
              </div> 
              <div>
                <label className="nombre_cuenta">Numero de cedula</label>
                <input type="number" name="nombre"  id="cuenta" value={cc} onChange={(e)=>setCc(e.target.value)}/>
              </div>
              <div>
                <label  className="contraseña_usuario">Contraseña</label>
                <input type="password" name="contraseña"  id="pass" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div>
                <button type="submit" className="create_button" id="login_cuenta_button" onClick={(e)=>handleLogin(e,'login')}>Iniciar sesion</button>
              </div>
              <div>
                <button type="button" className="create_button" id="login_cuenta_registro" onClick={(e)=>customer_page(e)}>Chatbot para clientes</button>
              </div>
              
            </form>
      
    </main>

    <footer id='footer_jjw'>
                <p> Todos los derechos reservados a &copy;JJW</p>
      </footer>
    </header>
  )
}




