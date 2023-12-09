

export const clean_table_cc = ()=>{


    const table = document.getElementById('t_body');
    table!.innerHTML = '';
    var reset = document.getElementById('inden_field') as HTMLInputElement;
    reset.value = '';

    console.log(reset)
}