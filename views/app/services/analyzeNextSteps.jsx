

import {create_pdf,create_general_pdf} from '../services/generate_pdf';






const enviar_correo_espeficio = ()=>{


  fetch("https://localhost:7087/employe/enviar_correos_cliente",{

      method:'POST',
      headers:{

        'Content-Type':'application/json'
      }

  }).then(()=>{console.log("Correo enviado")}).catch((errors)=>{console.error({errors:"Correo no enviado",errors})})
}


const enviar_correo_general = ()=>{

  fetch("https://localhost:7087/employe/enviar_correos_general",{

  method:'POST',
  headers:{

    'Content-Type':'application/json'
  }

}).then(()=>{console.log("Correo enviado")}).catch((errors)=>{console.error({errors:"Correo no enviado",errors})})

}



const especifico = ()=>{

  create_pdf()
  enviar_correo_espeficio()


}


const general = ()=>{

  create_general_pdf(),
  enviar_correo_general()

}

export const analyzeNextSteps = (step, userResponse) => {

  const employe_name = localStorage.getItem("nombre_Empleado");
  const employe_lastname = localStorage.getItem("apellido_Empleado");

    return step === 1
      ? {
         
          message: `Me alegro!!, Bienvenido, ${employe_name +' '+ employe_lastname} en que te puedo ayudar?`,
          options: [ "Genera el reporte del cliente actual", "Genera un reporte general"]
        }
      : step === 2
      ? userResponse === "Genera el reporte del cliente actual"
      ? {
          
          validator: especifico(),
          message:
            "Vale, peticion procesada",
          options:["Continuar"]
        }:{

          purpose: "specify experience2",
          validator:general(),
          message:
            "Vale, peticion procesada",
          options:["Continuar"]

        }
      : step === 3
      ? {
         
          message:
            "Pdf exportado, te puedo ayudar en algo mas?",
          options: ["Si, porfavor","No, gracias"]
        }
      : step === 4
      ? userResponse === "Si, porfavor"
        ? {
            
            message: "Vale, en ese caso, selecciona una opcion",
            options: ["Genera el reporte del cliente actual","Genera un reporte general"]
          }
        : {
            
            
            message: "En ese caso, que tengas un buen dia. Hasta luego.",
            
          }
      : step === 5
      ? userResponse === "Genera un reporte general"
      ?{
          
          validator:general(),
          message:
            "Pdf exportado. Feliz dia."
        }:{

         
          validator:especifico(),
          message:"Pdf generado, Me alegra haberte ayudado."
        }

      : {
          
          
          message: "Hasta luego"
        };
  };
  