

export const fill_second_table = ()=>{

    const tableBody = document.getElementById('t_body_tb2');
   

    const row = document.createElement('tr');
    
    if(tableBody && tableBody.getElementsByTagName('td').length === 0){


       const createRow = (label:string,value:string)=>{

            const row = document.createElement('tr');

            const label_cell = document.createElement('td');
            label_cell.textContent = label;
            label_cell.style.textAlign = 'left';
            row.appendChild(label_cell);

            const value_cell = document.createElement('td');
            value_cell.textContent = value;
            value_cell.style.textAlign = 'left';
            row.appendChild(value_cell);

            return row;

       }

       const credito = localStorage.getItem("cliente_credito")!.toString();
       const monto = localStorage.getItem("cliente_monto")!.toString();
       const monto_aprovado = localStorage.getItem("cliente_monto_aprovado")!.toString();
       const monto_desembolsar = localStorage.getItem("cliente_monto_desembolsar")!.toString();
       const tramite = localStorage.getItem("cliente_tramite")!.toString();
       const plazo = localStorage.getItem("cliente_plazo")!.toString();

       tableBody.appendChild(createRow("Credito",credito));
       tableBody.appendChild(createRow("Estado","Vigente"));
       tableBody.appendChild(createRow("Clase de cartera","Hipotecario"));
       tableBody.appendChild(createRow("Monto",monto));
       tableBody.appendChild(createRow("Monto Aprovado",monto_aprovado));
       tableBody.appendChild(createRow("Monto Desembolsar",monto_desembolsar));
       tableBody.appendChild(createRow("Tramite",tramite));
       tableBody.appendChild(createRow("Plazo",plazo));




    }


   

} 

