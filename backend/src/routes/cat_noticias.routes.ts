import { Router } from 'express';
import { Catnoticiacontroller } from '../controllers/cat_noticiascontroller';

let catnoticiacontroller = new Catnoticiacontroller

const enrutadorCatnoticia = Router();

enrutadorCatnoticia.route('/catnoticia').get(catnoticiacontroller.listarcatnoticias);
enrutadorCatnoticia.route('/catnoticia').post(catnoticiacontroller.guardarcatnoticias);
enrutadorCatnoticia.route('/catnoticia/:id').delete(catnoticiacontroller.eliminarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').put(catnoticiacontroller.actualizarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').get(catnoticiacontroller.buscarcatnoticia);

export default enrutadorCatnoticia;
