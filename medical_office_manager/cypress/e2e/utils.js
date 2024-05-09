export function getCurrentDateFromSystem(){
    const data = new Date()

    const dia = String(data.getDate()).padStart(2,'0') // 1-> 01
    const mes = String(data.getMonth() + 1).padStart(2,'0') // jan a dez (0 a 11). jan + 1 -> 01
    const ano = data.getFullYear()//2024

    //const currentDate = `${dia}/${mes}/${ano}`
    const currentDate = `${ano}-${mes}-${dia}`

    return currentDate
}

export function formatDateBR(date){
    const dateParts = date.split("-")

    const dia = dateParts[2]
    const mes = dateParts[1]
    const ano = dateParts[0]

    //const currentDate = `${dia}-${mes}-${ano}`
    const formatedDateBR = `${dia}/${mes}/${ano}`

    return formatedDateBR
}

export function getCurrentDateUTC3(){
    var date = new Date();

    const recifeTime = date.toLocaleString("en-US", {timeZone: "America/Recife"});

    const dateCompleteParts = recifeTime.split(",");
    const dateParts = dateCompleteParts[0].split("/");

    const dia = dateParts[1].padStart(2,'0');
    const mes = dateParts[0].padStart(2,'0');
    const ano = dateParts[2];

    const currentDateUTC3 = `${ano}-${mes}-${dia}`;

    return currentDateUTC3;
}
