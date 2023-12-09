
import {customer_method} from '../services/graphic_info';
import '../services/graphic_info';






let messages = "Este usuario sera redireccionado. Si permanece leyendo este mensaje por mas de 10 segundos, usted tiene tasas de interes erroneas, esto se solventara en 24 horas. No obstante, asegurese de que su documento sea valido, ya que, de lo contrario no se reportara el incidente." 

const tasas_validacion =  async (iden)=>{

  
  await customer_method(iden);

}



const identificaciones =  async (identificacion)=>{


  await fetch("https://localhost:7087/clientes",{


  method:'GET',
  headers:{

    'Content-Type':'application/json'
  }

  }).then((response)=>{

    console.log(response)
    return response.json();

  }).then((data)=>{

    
    console.log(data)
    const coincidencias = [];

    data.forEach(element => {
      
      if(element.identificacion.toString() === identificacion.toString() ){

          coincidencias.push(element);
      }

    })

    console.log(coincidencias)

    if(coincidencias.length>0){

      
      tasas_validacion(identificacion)

     

    }
    

  })
}





export const analyzeNextSteps = (step, userResponse) => {

  const user_res = localStorage.getItem("user_response");
  
    return step === 1
      ? { 
          
          purpose: "specify field",
          message: `Bienvenido, Cliente en que te puedo ayudar?`,
          options: [ "Visualizar reporte comparativo mensual", "Salir"]
        }
      : step === 2
      ? userResponse === "Visualizar reporte comparativo mensual"
      ? {
          purpose: "specify experience",
          validator: identificaciones(user_res),
          
          message:  messages
            ,
        }:{

          purpose: "specify experience2",
          message:
            "Hasta luego",
          
        }
      : step === 3
      ? {
          purpose: "specify projects",
          message:
            "Hasta luego",
          
        }

      : {
          
          purpose: "despedida",
          message: "Hasta luego"
        };
  };
  


  

  