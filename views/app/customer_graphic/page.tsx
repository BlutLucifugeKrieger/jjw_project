
"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import '../styles/customer_graphic.css';
import { jsPDF } from 'jspdf';
  const Page: React.FC = () => {

    const exits = ()=>{

        window.location.href = '../customer_chatbot'
    }

    useEffect(() => {

        const userName = localStorage.getItem('current_customer_name');
        const lastName = localStorage.getItem('current_customer_lastname');
        const credito_aprobado = localStorage.getItem('current_customer_monto_aprobado');
        const credito_desembolsado = localStorage.getItem('current_customer_monto_desembolsado');
        const result_promedio = localStorage.getItem('result_promedio_tasa');

        if (userName && lastName && credito_aprobado && credito_desembolsado && result_promedio) {
            const userElement = document.getElementById('user_name_span');
            const credito_a = document.getElementById('credito_aprobado');
            const credito_d = document.getElementById('credito_desembolsado');
            const promedio = document.getElementById('valor_promedio_tasa');

            if (userElement) {

            userElement.innerText = userName +' '+ lastName;
    
            }

            if(credito_a){

                credito_a.innerText = credito_aprobado;
            }

            if(credito_d){

                credito_d.innerText = credito_desembolsado;
            }
            
            if(promedio){

                promedio.innerText = result_promedio;
            }
            
        }
        }, []); 



  const chartTasaRef = useRef<HTMLCanvasElement | null>(null);
  const enero = localStorage.getItem('current_user_tasaActual_enero');
  const febrero = localStorage.getItem('current_user_tasaActual_febrero');
  const marzo = localStorage.getItem('current_user_tasaActual_marzo');

  useEffect(() => {
   
    

    const tasaData = {
      labels: ['Enero', 'Febrero', 'Marzo'],
      datasets: [{
        label: 'Tasa de Interés Mensual',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [enero, febrero, marzo],
      }]
    };

   
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

  
  
    const ctxTasa = document.getElementById('chart-tasa') as HTMLCanvasElement;

    if ( ctxTasa) {
       
     
        const existingChartTasa = Chart.getChart(ctxTasa);
      
      
        if (existingChartTasa) {
          existingChartTasa.destroy();
        }
      
     
      
        new Chart(ctxTasa, {
          type: 'bar',
          data: tasaData,
          options: chartOptions
        });
      }
  }, []);

  const captureScreen = () => {
    const targetHeight = 700; 
  
    
    const captureOptions = {
      height: targetHeight,
      scrollY: 0,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
    };
  
    html2canvas(document.body, captureOptions).then(function (canvas) {
   
      const imgData = canvas.toDataURL('image/png');
  
     
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'informe_mensual.png';
      const pdf = new jsPDF();

      pdf.addImage(imgData, 'PNG', -10, 10, 250, 190); 
  
     
      pdf.save('informe_mensual.pdf');
      link.click();
    });
  };

  return (
    <div className='container'>
      <h1>Bienvenido/a, <span id='user_name_span'></span></h1>

      <div id="resumen">
        <h2>Resumen Mensual</h2>
        <p>Su tasa de interés actual es del  <span id='valor_promedio_tasa'></span>%. A continuación, se presentan algunas estadísticas de su crédito:</p>
        <ul>
          <li>Crédito Aprobado: $<span id='credito_aprobado'></span> </li>
          <li>Crédito Desembolsado: $<span id='credito_desembolsado'></span> </li>
          <li>Pagos Realizados: 3</li>
          <li>Próximo Pago: 1 de abril de 2023</li>
        </ul>
      </div>

      <h2>Estadísticas de Tasa de Interés</h2>
      <canvas id="chart-tasa" ref={chartTasaRef}></canvas>

      <div>
        <button id="capture-button" onClick={captureScreen}>Exportar documentos</button>
      </div>
      <br />
      <div>
        <button id="capture-button" onClick={exits}>Salir</button>
      </div>
    </div>
  );
};

export default Page;
