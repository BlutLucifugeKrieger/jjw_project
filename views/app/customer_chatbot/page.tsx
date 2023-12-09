"use client"
import React, { useState } from 'react';
import '../styles/customer_chatbot.css';
import Image from 'next/image';
import {Modal,ModalBody,ModalHeader,ModalFooter,Label,Input} from 'reactstrap';
import Chats from '../services/Client_chats';
import {analyzeNextSteps} from '../services/customerNextSteps';
import 'bootstrap/dist/css/bootstrap.min.css';
import {logOut} from '../services/exitService';
import '../styles/ChatBot.scss';
import '../styles/customer_bot_page.css';
import mision from '../images/mision.png';
import vision from '../images/vision.png';

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  }


 const Page:React.FC = ()=>{


    
    const [isChatOpen, setChatOpen] = useState(false);
    const [userResponse, setUserResponse] = useState<string>("");
    const [sendUserResponse, setSendUserResponse] = useState<string>("");

    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot"
  });
  
   

    const chat_modal = (e:React.MouseEvent<HTMLButtonElement>)=>{

        try {
            
            setStep(0);
            setChatOpen(!isChatOpen);

        } catch (error) {

            console.error({errors:"No se puede abrir el chatbot",error});
            
        }

    }


    const setNextStep = (response: string) => {
        setStep(prevState => prevState + 1);
        setSendUserResponse(response);
        let res = analyzeNextSteps(step + 1, response);
        setBotResponse({ ...res, sender: "bot" });
        setUserResponse("");
      };
      

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };


  const close_chatbot = (e:React.MouseEvent<HTMLButtonElement>)=>{

    try {
        
        setChatOpen(false);

    } catch (error) {
        
        console.log({errors:"No se puede cerrar el chatbot",error})
    }
}


const exit = ()=>{

    try {
        
        logOut()

    } catch (error) {
        
        console.error({errors:"No se pudo salir",error})
    }
}

    return(

<header className="hero">
    <main className="f">
      
                
           
              <div>
              </div> 
                  <div>
                  
                  </div>
                <div>
                     <Image src={mision} width={100} height={100} alt='mision_icon' id='mision'></Image>
                     <p id='mision_title'><b>Mision</b></p> <div></div>
                     <p id='text_title'> Contribuir al bienestar de los afiliados, 
                        convirtiendo su ahorro en vivienda.​</p>
                    
                      
                </div>

                <div>
                    <Image src={vision} width={100} height={100} alt='vision_icon' id='vision'></Image>
                    <p id='vision_title'><b>Vision</b></p> <div></div>
                    <p id='text_title'>Ser una entidad eficiente y 
                        sostenible que garantice productos y servicios de calidad, 
                        contribuyendo al bienestar de sus afiliados. ​</p>

                      
                </div>
              
                            <div>
                                <Modal isOpen={isChatOpen} toggle={chat_modal} id="modal_general">
                                        <ModalHeader id="modal2_header">
                                                    <p>Chatbot</p>
                                        </ModalHeader>

                                        <ModalBody id="modal2_body">

                                        <div className="chat-container">
                                                <Chats
                                                userResponse={userResponse}
                                                botResponse={botResponse}
                                                sendUserResponse={sendUserResponse}
                                                optionClick={optionClick}
                                                />
                                                <form onSubmit={e => handleSubmit(e)} className="form-container">
                                                <input
                                                    onChange={e => handleInputChange(e)}
                                                    value={userResponse}
                                                ></input>
                                                <button id="send_message_button"></button>
                                                </form>
                                        </div>
                                        </ModalBody>

                        <ModalFooter id="modal2_footer">
                                <div>
                                    <button className="btn" onClick={(e)=>{close_chatbot(e)}}>Salir</button>
                                </div>
                        </ModalFooter>
                </Modal>
                        </div>


             
              <div>
                <button type="submit" className="create_button" id="iniciar_bot" onClick={chat_modal}>Iniciar ChatBot</button>
              </div>
              <div>
                <button type="button" className="create_button" id="salir" onClick={exit}>Salir</button>
              </div>
              
           



      
    </main>

    <footer id='footer_jjw'>
                <p> Todos los derechos reservados a &copy;JJW</p>
      </footer>
    </header>

    )


}

export default Page;