import { Router } from 'express';
import { Catnoticiacontroller } from '../controllers/cat_noticiascontroller';
/*se importa el archivo verificartoken y luego se utiliza la funcion validarToken 
para proteger la routa que se quiera proteger*/
import { validarToken } from '../libs/verificartoken';


let catnoticiacontroller = new Catnoticiacontroller

const enrutadorCatnoticia = Router();

enrutadorCatnoticia.route('/catnoticia').get(validarToken,catnoticiacontroller.listarcatnoticias);
enrutadorCatnoticia.route('/catnoticia').post(catnoticiacontroller.guardarcatnoticias);
enrutadorCatnoticia.route('/catnoticia/:id').delete(catnoticiacontroller.eliminarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').put(catnoticiacontroller.actualizarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').get(catnoticiacontroller.buscarcatnoticia);

export default enrutadorCatnoticia;
