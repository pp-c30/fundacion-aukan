import { Router } from "express";
import { Catgaleriacontroller } from '../controllers/cat_galeria.controller';

let catgaleriacontroller = new Catgaleriacontroller;

const enrutadorCatgaleria = Router();

enrutadorCatgaleria.route('/catgaleria').get(catgaleriacontroller.listarcatgaleria);
enrutadorCatgaleria.route('/catgaleria').post(catgaleriacontroller.guardarcatgaleria);
enrutadorCatgaleria.route('/catgaleria/:id').delete(catgaleriacontroller.eliminarcatgaleria);
enrutadorCatgaleria.route('/catgaleria/:id').put(catgaleriacontroller.actualizarcatgaleria);
enrutadorCatgaleria.route('/catgaleria/:id').get(catgaleriacontroller.buscarcatgaleria)
export default enrutadorCatgaleria;
