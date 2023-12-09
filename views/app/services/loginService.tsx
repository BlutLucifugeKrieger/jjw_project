
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getAllUsers = () =>{

    fetch("https://localhost:7087/employe/login",{

        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }).then((result)=>{

        return result.json()
    }).then((data)=> console.log(data)).catch(()=>console.error({errors:"no se pudo obtener los usuarios"}))
}


export const login=(Cedula_Empleado: string,Contraseña: string)=>{

    fetch("https://localhost:7087/employe/login",{

        method:'POST',
        body:JSON.stringify({Cedula_Empleado,Contraseña}),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((response)=>{

        return response.json()

    }).then((data)=>{

        if(data.length !=0){

            const values = data[0]
            localStorage.setItem("nombre_Empleado",values.nombre_Empleado);
            localStorage.setItem("id_Empleado",values.id_Empleado);
            localStorage.setItem("Cedula_Empleado",values.Cedula_Empleado);
            localStorage.setItem("apellido_Empleado",values.apellido_Empleado);
            localStorage.setItem("contraseña_empleado",values.contraseña);
            window.location.href = '../logged';
        }else{

            alert("Cuenta invalida")
        }

    }).catch(()=>console.error({errors:"Error en el procedimiento"}))
}



