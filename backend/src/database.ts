import { createPool } from "promise-mysql";

export async function conexion(){
    const connect= await createPool({
        host:'localhost',
        user:'root',
        password:'',
        database:'aukan'
    })

    return connect;
}