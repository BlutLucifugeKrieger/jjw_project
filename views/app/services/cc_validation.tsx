
import {fillTable} from '../services/fill_table_cc';


export const ccValidation = (Identificacion:string)=>{

    fetch(`https://localhost:7087/clientes/search/${Identificacion}`,{

        method:'GET',
        headers:{

            'Content-Type':'application/json'
        }
    }).then((response)=>{

        return response.json();

    }).then((data)=>{


        const values = data[0];

        if(!values || !values.identificacion){

             alert("Numero de documento invalido, intenta con otro diferente");

        }else{

            localStorage.setItem("cliente_Id_Cliente",values.id_Cliente);
            localStorage.setItem("cliente_credito",values.credito);
            localStorage.setItem("cliente_monto",values.monto);
            localStorage.setItem("cliente_monto_aprovado",values.monto_Aprobado);
            localStorage.setItem("cliente_monto_desembolsar",values.monto_desembolsar);
            localStorage.setItem("cliente_identificacion",values.identificacion);
            localStorage.setItem("cliente_apellidos",values.apellidos);
            localStorage.setItem("cliente_nombre_Cliente",values.nombre_Cliente);
            localStorage.setItem("cliente_tipo_amortiza",values.tipo_amortiza);
            localStorage.setItem("cliente_edad",values.edad);
            localStorage.setItem("cliente_tasa",values.tasa);
            localStorage.setItem("cliente_tramite",values.tramite);
            localStorage.setItem("cliente_plazo",values.plazo);
            fillTable(Identificacion)
        }

        

    }).catch((error)=> console.error({errors:"Error con la validacion del documento",error}))

}