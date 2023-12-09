

export const next_page = ()=>{

     try {
        
        window.location.href = '../customer_chatbot';

     } catch (error) {
        
        console.error({errors:"No se puede acceder",error})
     }
   
}