const MessageError = require('../error/messageError')

function GetMessage (messages=[]){
    //DETERMINA QUE HAYA MENSAJES A EVALUAR DE LO CONTRARIO SE MANDA ESTE ERROR
    if(!messages.length) throw(new MessageError("No hay mensajes"))
    //DETERMINA QUE POR LO MENOS EL PRIMER MENSAJE VENGA CON VALORES YA QUE SINO NO SE PUEDE DETERMINAR EL MENSAJE RESULTANTE
    else if(!messages[0].length)throw(new MessageError("No hay suficientes mensajes para determinar el mensaje real"))
    //DETERMINA QUE SI SOLO VIENE UNA MENSAJA ÉSTE VANGA SIN VACIOS DE LO CONTRARIO NO SE PUEDE DETERMINAR EL MENSAJE RESULTANTE
    else if(messages.length===1 && messages[0].length > 0 && messages[0].filter(e=>!e).length > 0 )throw(new MessageError("No hay suficiente información para determinar el mensaje"))
    //SE TOMA COMO BASE EL PRIMER O UNICO MENSAJE PARA DETERMINAR LA LONGITUD YA QUE TODAS DEBEN CUMPLIR EL MISMO TAMAÑO
    const longBase=messages[0].length;
    let isDistinto = false; 
    const indexBlank =[]
    for(let i=0;i<messages.length;i++){
        //VALIDA QUE TODOS LOS MENSAJES TENGAN LA MISMA LONGITUD DE LO CONTRARIO NO SE PUEDE CONTINUAR CON EL CALCULO
        if(messages[i].length!==longBase){
            isDistinto=true
            break;
        }
        //SE BUSCA TODOS LOS INDICES LLENOS DE CADA UNO DE LOS MENSAJES PARA DESPUES LOCALIZAR LOS FALTANTES EN LOS DEMAS MENSAJES
        indexBlank.push(messages[i].map((e,y)=>{
            if(e)
               return y
             return null
        }).filter(e=>e!==null))
    }
    if(isDistinto) throw(new MessageError("No es posible determinar el mensaje"))
    let message='';
    
    //SE BUSCA EL INDICE DE ALGUN MENSAJE QUE ESTE LLENO YA QUE ESTO SIGNIFICARIA QUE HAY UN MENSAJE COMPLETO POR LO QUE NO REQUERIMOS CALCULAR EL MENSAJE RESULTANTE
    const indexMensajeCompleto =indexBlank.findIndex(e=>e.length===longBase);
    if(indexMensajeCompleto !== -1){
        message=messages[indexMensajeCompleto].join(" ");
    }
    else{
        // SE TOMA COMO BASE EL PRIMER MENSAJE
        let newMessage=messages[0];
        for(let col = 0; col < indexBlank.length ; col++){
            for(let row = 0 ;row<indexBlank[col].length;row++){
                if(!newMessage[indexBlank[col][row]])
                    newMessage[indexBlank[col][row]]=messages[col][indexBlank[col][row]]
            }     
        }
        message=newMessage.join(" ");
    }
    return message;
}

module.exports=GetMessage;