"use client"
import React, { useEffect, useMemo, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {fill_first_table} from '../services/customer_info_tb1';
import {fill_second_table} from '../services/customer_info_tb2';
import {back_func} from '../services/back_function';
import {Modal,ModalBody,ModalHeader,ModalFooter,Label,Input} from 'reactstrap';
import {fill_tasas} from '../services/fill_table_tasas';
import {analyzeNextSteps} from '../services/analyzeNextSteps';
import send_logo from '../images/send.png';
import Chats from '../services/Chats';
import '../styles/customer_info.css';
import '../styles/ChatBot.scss';

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  }

const Page:React.FC= ()=>{


    useEffect(()=>{

        fill_first_table();
        fill_second_table();
  
    },[]);


    const back = (e: React.MouseEvent<HTMLButtonElement>)=>{

        try {
            
            back_func()

        } catch (error) {
            
            console.error({errors:"No se puede devolver",error})
        }

    }
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false);
    const [userResponse, setUserResponse] = useState<string>("");

    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

    const toggleModal = () => {
        
        try {

            setModalOpen(!isModalOpen);
            fill_tasas();

        } catch (error) {
            
            console.error({errors:"No se pudo llenar la tabla de tasas",error})
        }
    }

    const closeModal = (e:React.MouseEvent<HTMLButtonElement>)=>{

        try {
            
            setModalOpen(false);

        } catch (error) {
            
            console.error({errors:"No se pudo cerrar el modal",error});
        }
    }

    const chat_modal = (e:React.MouseEvent<HTMLButtonElement>)=>{

        try {
            
            setStep(0);
            setChatOpen(!isChatOpen);

        } catch (error) {

            console.error({errors:"No se puede abrir el chatbot",error});
            
        }

    }


    const close_chatbot = (e:React.MouseEvent<HTMLButtonElement>)=>{

        try {
            
            setChatOpen(false);

        } catch (error) {
            
            console.log({errors:"No se puede cerrar el chatbot",error})
        }
    }


    const setNextStep = (response: string) => {
        setStep(prevState => prevState + 1);
        setSendUserResponse(response);
        let res = analyzeNextSteps(step + 1, response);
        // Asegúrate de que res tenga la propiedad 'purpose' definida
        setBotResponse({ ...res, sender: "bot", purpose: "somePurpose" });
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

      
  


    

    return(
        <div>
                
                <table className="table table-hover">

                    <thead className="table-active">
                        <tr><th colSpan={3} id="info_panel">Panel de informacion</th></tr>
                        <tr>
                            <th id="ths">Linea de credito</th>
                            <th id="ths">Moneda</th>
                            <th id="ths">Cliente</th>
                        </tr>
                    </thead>
                    
                    <tbody id="t_body_tb1"></tbody>
                </table>

                <table className="table table-hover">
                        <thead className="table-active">
                            <tr id="tr_head"> <th colSpan={2} id="th_head">Datos generales</th></tr>
                            <tr>
                                <th id="ths">Datos</th>
                                <th id="ths">Valor</th>
                            </tr>
                        </thead>
                        <tbody id="t_body_tb2"></tbody>
                </table>

                        <div>
                            <button className="btn"  onClick={toggleModal}>Consulta de tasas</button> 
                        </div>
                                          
                        <div>
                                <Modal isOpen={isModalOpen} toggle={toggleModal} id="modal_table">

                                        <ModalHeader id="modal_header"> 
                                            Informacion de las tasas
                                        </ModalHeader>

                                        <ModalBody id="modal_body">

                                            <table className="table table-hover" id="modal_table_class">
                                                <thead className="table-active">
                                    
                                                <tr>
                                                    <th>Fecha Modificacion</th>
                                                    <th>Cuota</th>
                                                    <th>Rubro</th>
                                                    <th>Tasa actual</th>
                                                    <th>Tasa efectiva</th>
                                                </tr>
                                                </thead>
                                                <tbody id="t_body_modal"></tbody>
                                            </table>

                                        </ModalBody>

                                        <ModalFooter>
                                        
                                        <div>
                                                <button className="btn" onClick={(e)=>{closeModal(e)}}>Salir</button>
                                        </div>

                                        </ModalFooter>
                                </Modal>
                        </div>

                        <div>
                            <button className="btn" id="chat_button" onClick={(e)=>{chat_modal(e)}}>ChatBot</button> <span></span>
                            <button className="btn" id="back_button" onClick={(e)=>{back(e)}}>Retroceder</button>
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
                
        </div>
    )


    
}


export default Page;

