


export const fill_first_table = ()=>{

    const tableBody = document.getElementById('t_body_tb1');
   

    const row = document.createElement('tr');
    
    if(tableBody && tableBody.getElementsByTagName('td').length === 0){


        const linea_credito = document.createElement('td');
        linea_credito.textContent = "CH. AMORTIZACION CUOTA";
        row.appendChild(linea_credito);
    
        const moneda = document.createElement('td');
        moneda.textContent = "COP (PESO COLOMBIANO)"
        row.appendChild(moneda);
    
        const apellido_nombre = document.createElement('td');
        const apellidos = localStorage.getItem("cliente_apellidos");
        const nombres = localStorage.getItem("cliente_nombre_Cliente");
        apellido_nombre.textContent = apellidos +' '+nombres;
        row.appendChild(apellido_nombre);
    
        tableBody?.appendChild(row);


    }


   

} 