import { Router } from "express";
import { Catgaleriacontroller } from '../controllers/cat_galeria.controller';

let catgaleriacontroller = new Catgaleriacontroller;

const enrutadorCatgaleria = Router();

enrutadorCatgaleria.route('/catgaleria').get(catgaleriacontroller.listarcatgaleria);

export default enrutadorCatgaleria;
