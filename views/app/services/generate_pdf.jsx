
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export const create_pdf = async ()=>{


    const employe_name = localStorage.getItem("nombre_Empleado");
    const employe_lastname = localStorage.getItem("apellido_Empleado");
    const customer_name = localStorage.getItem("cliente_nombre_Cliente");
    const customer_lastname = localStorage.getItem("cliente_apellidos");
    const customer_id = localStorage.getItem("cliente_Id_Cliente");
    const cliente_Id = Number(customer_id)
    var arrayBody = {cliente_Id}
    var jsonBody = JSON.stringify(arrayBody);
    var pdf = new jsPDF();

    pdf.text(`Pdf generado por el empleado ${employe_name +' '+employe_lastname}`,10,10)
    pdf.text(`informacion del cliente ${customer_name +' '+customer_lastname}`,10,20);
    pdf.text('Fecha: Enero del Año 2023',10,30);

    pdf.setFont('helvetica','bold');
    pdf.text('Problematica',10,50);
    pdf.setFont('helvetica','normal');

    pdf.text('estamos enfrentando un déficit financiero significativo,',10,60);
    pdf.text('debido a la presencia de órdenes de pago erradas en nuestra organización.',10,65);
    pdf.text('Estas órdenes de pago incorrectas,',10,70);
    pdf.text('están generando un hueco financiero,',10,75);
    pdf.text('que afecta negativamente nuestra salud financiera.',10,80);


    fetch(`https://localhost:7087/tasa_cliente/mes/1`,{

            method:'POST',
            body:jsonBody,
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then(async (data)=>{

        

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
              
           

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,100)
                pdf.setFont('helvetica','normal');
                
                const malCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 110,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                
                            

           

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 160);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);
          
                pdf.autoTable({
                  startY: 170,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }



        
        await reporte_febrero(pdf);
        await reporte_marzo(pdf);
        solution(pdf);
            

        

        });

    

}




const reporte_febrero = async (pdf)=>{

  const customer_id = localStorage.getItem("cliente_Id_Cliente");
  const cliente_Id = Number(customer_id)
  var arrayBody = {cliente_Id}
  var jsonBody = JSON.stringify(arrayBody);

  pdf.addPage();
  pdf.text("Fecha: Febrero del Año 2023",10,10);

 await fetch(`https://localhost:7087/tasa_cliente/mes/2`,{

            method:'POST',
            body:jsonBody,
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

        

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
              
            

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,50)
                pdf.setFont('helvetica','normal');
                
                const malCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 60,
                  startX:10,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 90);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);
          
                pdf.autoTable({
                  startY: 99,
                  startX:10,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }

        
            
            

        });

    
  
}

const reporte_marzo = async (pdf)=>{

  const customer_id = localStorage.getItem("cliente_Id_Cliente");
  const cliente_Id = Number(customer_id)
  var arrayBody = {cliente_Id}
  var jsonBody = JSON.stringify(arrayBody);
  const customer_name = localStorage.getItem("cliente_nombre_Cliente");
  pdf.addPage();
  pdf.text("Fecha: Marzo del Año 2023",10,10);

  await fetch(`https://localhost:7087/tasa_cliente/mes/3`,{

            method:'POST',
            body:jsonBody,
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

        

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
              
            

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,50)
                pdf.setFont('helvetica','normal');
                
                const malCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 60,
                  startX:10,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 90);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id', 'Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.tasa_Actual, element.tasa_Efectiva]);
          
                pdf.autoTable({
                  startY: 99,
                  startX:10,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }

            
          
        

        });

    
  
}



const solution = (pdf)=>{


  pdf.save(`Reporte_cliente`);
}

const solution_general = (pdf)=>{


  pdf.save(`Reporte_general`);
}


export const create_general_pdf = async (pdf)=>{

  const employe_name = localStorage.getItem("nombre_Empleado");
  const employe_lastname = localStorage.getItem("apellido_Empleado");

  var pdf = new jsPDF();
  pdf.text(`Pdf generado por el empleado ${employe_name +' '+employe_lastname}`,10,10);
  pdf.text("Informacion general de todos los clientes",10,20);

  pdf.setFont('helvetica','bold');
    pdf.text('Problematica',10,50);
    pdf.setFont('helvetica','normal');

    pdf.text('estamos enfrentando un déficit financiero significativo,',10,60);
    pdf.text('debido a la presencia de órdenes de pago erradas en nuestra organización.',10,65);
    pdf.text('Estas órdenes de pago incorrectas,',10,70);
    pdf.text('están generando un hueco financiero,',10,75);
    pdf.text('que afecta negativamente nuestra salud financiera.',10,80);

  await general_enero(pdf);
  await general_febrero(pdf);
  await general_marzo(pdf);
  await solution_general(pdf);
}





 const general_enero = async (pdf)=>{


  pdf.text("Fecha: Enero del Año 2023",10,100);

  await fetch(`https://localhost:7087/tasa_cliente/total_mes/1`,{

            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

        

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
              
            

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,110)
                pdf.setFont('helvetica','normal')
                
                const malCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial,element.cliente_Id,element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 120,
                  startX:10,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 160);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.cliente_Id, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 170,
                  startX:10,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }

            
            
            

        });

  


}


 const general_febrero = async (pdf)=>{


  pdf.addPage();
  pdf.text("Fecha: Febrero del Año 2023",10,10);

  await fetch(`https://localhost:7087/tasa_cliente/total_mes/2`,{

            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

        

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
              
            

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,50)
                pdf.setFont('helvetica','normal')
                
                const malCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial,element.cliente_Id,element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 60,
                  startX:10,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 100);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.cliente_Id, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 110,
                  startX:10,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }

            
           
            

        });

  


}


 const general_marzo = async (pdf)=>{


  pdf.addPage();
  pdf.text("Fecha: Marzo del Año 2023",10,10);

  await fetch(`https://localhost:7087/tasa_cliente/total_mes/3`,{

            method:'GET',
            headers:{

                'Content-Type':'application/json'
            }
    }).then((response)=>{

        
        return response.json();

    }).then((data)=>{

        

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
              
            

                pdf.setFont('helvetica','bold');
                pdf.text('Tasas mal calculadas',10,50)
                pdf.setFont('helvetica','normal')
                
                const malCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const malCalculadasData = tasasMalCalculadas.map(element => [element.secuencial,element.cliente_Id,element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 60,
                  startX:10,
                  head: [malCalculadasHeaders],
                  body: malCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] }
                });
                
                

              if (tasasBienCalculadas.length > 0) {
                pdf.setFont('helvetica', 'bold');
                pdf.text('Tasas sin errores', 10, 100);
                pdf.setFont('helvetica', 'normal');
          
             
                const bienCalculadasHeaders = ['Id','Id Cliente','Tasa Actual', 'Tasa Efectiva'];
                const bienCalculadasData = tasasBienCalculadas.map(element => [element.secuencial, element.cliente_Id, element.tasa_Actual, element.tasa_Efectiva]);

                pdf.autoTable({
                  startY: 110,
                  startX:10,
                  head: [bienCalculadasHeaders],
                  body: bienCalculadasData,
                  headStyles: { fillColor: [0, 0, 0] },
                });
              }


            } else {
              
              pdf.text('Este cliente no tiene tasas mal calculadas', 10, 95);
            }

            
            
            

        });

  


}