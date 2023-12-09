

let res_enero=false;
let res_febrero=false;
let res_marzo=false;


 const customer_total_info =  async (identificacion)=>{


    

   await fetch(`https://localhost:7087/tasa_cliente/info_cliente/${identificacion}`,{


            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }

    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

       
          

            localStorage.setItem("current_customer_name",data[0].nombre_Cliente);
            localStorage.setItem("current_customer_lastname",data[0].apellidos);
            localStorage.setItem("current_customer_id",data[0].id_Cliente);
            localStorage.setItem("current_customer_monto_aprobado",data[0].monto_Aprobado)
            localStorage.setItem("current_customer_monto_desembolsado",data[0].monto_desembolsar)

    }).catch((error)=>{console.error({errors:"Identificacion invalida",error})});
    
}



 export const info_enero =  async ()=>{


    var cliente_Id = localStorage.getItem("current_customer_id");
    var array = {cliente_Id}
    var jsonFinal = JSON.stringify(array)
    

   await  fetch('https://localhost:7087/tasa_cliente/mes/1',{

        method:'POST',
        body:jsonFinal,
        headers:{

            'Content-Type':'application/json'
        }
    }).then((result)=>{

        
        return result.json();

    }).then((data)=>{

        var values = data[0];
        
        
        const tasasMalCalculadas = [];
        const tasasBienCalculadas = [];

        data.forEach(element => {
            
            if (element.tasa_Actual !== element.tasa_Efectiva) {
              
                tasasMalCalculadas.push(element);
              }

            if (element.tasa_Actual === element.tasa_Efectiva) {
            
                tasasBienCalculadas.push(element);
            } 

            });

            if (tasasMalCalculadas.length > 0) {


                res_enero=false;


            }else{

                res_enero=true;
            }





        localStorage.setItem("current_user_tasaActual_enero",values.tasa_Actual);
        localStorage.setItem("current_user_tasaEfectiva_enero",values.tasa_Efectiva);
        
      

    }).catch((error)=>{console.error({errors:"Mes incorrecto enero",error})});
}



 export const info_febrero =  async ()=>{


    var cliente_Id = localStorage.getItem("current_customer_id");
    var array = {cliente_Id}
    var jsonFinal = JSON.stringify(array)
    

   await fetch('https://localhost:7087/tasa_cliente/mes/2',{

        method:'POST',
        body:jsonFinal,
        headers:{

            'Content-Type':'application/json'
        }
    }).then((result)=>{

        return result.json();

    }).then((data)=>{

        var values = data[0];
        

        const tasasMalCalculadas = [];
        const tasasBienCalculadas = [];

        data.forEach(element => {
            
            if (element.tasa_Actual !== element.tasa_Efectiva) {
              
                tasasMalCalculadas.push(element);
              }

            if (element.tasa_Actual === element.tasa_Efectiva) {
            
                tasasBienCalculadas.push(element);
            } 

            });

            if (tasasMalCalculadas.length > 0) {


                res_febrero=false;


            }else{

                res_febrero=true;
            }




        localStorage.setItem("current_user_tasaActual_febrero",values.tasa_Actual);
        localStorage.setItem("current_user_tasaEfectiva_febrero",values.tasa_Efectiva);

      


    }).catch((error)=>{console.error({errors:"Mes incorrecto febrero",error})});
}


 export const info_marzo =  async()=>{


    var cliente_Id = localStorage.getItem("current_customer_id");
    var array = {cliente_Id}
    var jsonFinal = JSON.stringify(array)
    

   await fetch('https://localhost:7087/tasa_cliente/mes/3',{

        method:'POST',
        body:jsonFinal,
        headers:{

            'Content-Type':'application/json'
        }
    }).then((result)=>{

        return result.json();

    }).then((data)=>{

        var values = data[0];

        
        const tasasMalCalculadas = [];
        const tasasBienCalculadas = [];

        data.forEach(element => {
            
            if (element.tasa_Actual !== element.tasa_Efectiva) {
              
                tasasMalCalculadas.push(element);
              }

            if (element.tasa_Actual === element.tasa_Efectiva) {
            
                tasasBienCalculadas.push(element);
            } 

            });

            if (tasasMalCalculadas.length > 0) {


                res_marzo=false;


            }else{

                 res_marzo=true;
            }

        localStorage.setItem("current_user_tasaActual_marzo",values.tasa_Actual);
        localStorage.setItem("current_user_tasaEfectiva_marzo",values.tasa_Efectiva);
        


    }).catch((error)=>{console.error({errors:"Mes incorrecto marzo",error})});
}




export const customer_method = async (identificacion)=>{

  
    try {
        

        await customer_total_info(identificacion);
        await info_enero();
        await info_febrero();
        await info_marzo();

        
            console.log(res_enero);
            console.log(res_febrero);
            console.log(res_marzo);

            if(res_enero && res_febrero  && res_marzo){

                valor_promedio_tasa();
                window.location.href = '../customer_graphic';
                return true;
                
            }else{

                enviar_error(identificacion);
                return false;
            }
            


    } catch (error) {

        console.error({errors:"Error en la generacion de la grafica",error})
        return false;
    }


}


const valor_promedio_tasa = ()=>{


    const enero = localStorage.getItem('current_user_tasaActual_enero');
    const febrero = localStorage.getItem('current_user_tasaActual_febrero');
    const marzo = localStorage.getItem('current_user_tasaActual_marzo');

    var enero_value = Number(enero);
    var febrero_value = Number(febrero);
    var marzo_value = Number(marzo);

    var result = (enero_value+febrero_value+marzo_value)/3

    localStorage.setItem("result_promedio_tasa",result);

}


const enviar_error = (cc)=>{


    fetch(`https://localhost:7087/employe/enviar_correos_cliente_error/${cc}`,{


        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(()=>{console.log("Correo enviado")}).catch((errors)=>{console.error({errors:"Correo no enviado",errors})})
}


localStorage.setItem("correc","El usuario debe corregir")