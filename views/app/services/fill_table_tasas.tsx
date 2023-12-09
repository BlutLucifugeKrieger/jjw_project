

export const fill_tasas=()=>{


    const id_cliente = localStorage.getItem("cliente_Id_Cliente");

    fetch(`https://localhost:7087/tasa_cliente/${id_cliente}`,{

            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        return response.json()

    }).then((data)=>{


        interface objects{

            fecha_Modificacion:Date,
            cuota:number,
            rubro:string,
            tasa_Actual:number,
            tasa_Efectiva:number
        }



        data.forEach((element:objects) => {
            

            const tableBody = document.getElementById('t_body_modal');

            const row = document.createElement('tr');


            const fecha_Modificacion = document.createElement('td');
            fecha_Modificacion.textContent = element.fecha_Modificacion.toString();
            row.appendChild(fecha_Modificacion);

            const cuota = document.createElement('td');
            cuota.textContent = element.cuota.toString();
            row.appendChild(cuota);

            const rubro = document.createElement('td');
            rubro.textContent = element.rubro;
            row.appendChild(rubro);

            const tasa_actual = document.createElement('td');
            tasa_actual.textContent = element.tasa_Actual.toString();
            row.appendChild(tasa_actual);

            const tasa_efectiva = document.createElement('td');
            tasa_efectiva.textContent = element.tasa_Efectiva.toString();
            row.appendChild(tasa_efectiva);

            console.log(tasa_efectiva)
            tableBody?.appendChild(row);

        });
    })

}