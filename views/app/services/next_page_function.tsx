


export const nextPage = ()=>{


    const iden = document.getElementById('inden_field') as HTMLInputElement;
    const tbody = document.getElementById('t_body');

    if(iden.value != '' && tbody?.innerHTML !=''){

        window.location.href = '../customer_info';

    }else{

        alert("Por favor, ingresa/busca un documento para poder continuar");
    }

}