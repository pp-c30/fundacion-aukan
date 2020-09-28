import {server} from "./server";


function principal()
{
    //se crea instancia de la clase
    const servidor = new server();
    // se le da arranque al servidor
    servidor.listen();
}

//se ejecuta la funcion
principal();