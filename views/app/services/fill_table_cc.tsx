

export const fillTable = (Identificacion:string)=>{


    fetch(`https://localhost:7087/clientes/search/${Identificacion}`,{

            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        return response.json();

    }).then((data)=>{

        const tableBody = document.getElementById('t_body');
        tableBody!.innerHTML = "";


        interface objects{

            id_Cliente:number,
            apellidos:string,
            nombre_Cliente:string,
            identificacion:number,
            
        }

        console.log(data)
        data.forEach((element:objects) => {
            
            const row = document.createElement('tr');

            const id = document.createElement('td');
            id.textContent = element.id_Cliente.toString();
            row.appendChild(id);

            const apellidos = document.createElement('td');
            apellidos.textContent = element.apellidos;
            row.appendChild(apellidos);

            const nombre = document.createElement('td');
            nombre.textContent = element.nombre_Cliente;
            row.appendChild(nombre);

            const cedula = document.createElement('td');
            cedula.textContent = element.identificacion.toString();
            row.appendChild(cedula);

            tableBody?.appendChild(row);

        });

    }).catch((error)=> console.error({errors:"No se pudo llenar la tabla",error}))
}




