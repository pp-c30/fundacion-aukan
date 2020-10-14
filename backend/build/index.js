"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
function principal() {
    //se crea instancia de la clase
    const servidor = new server_1.server();
    // se le da arranque al servidor
    servidor.listen();
}
//se ejecuta la funcion
principal();
