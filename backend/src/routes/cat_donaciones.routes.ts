import { Router } from 'express';
import { Catdonacionescontroller } from '../controllers/cat_donaciones.controller';

let catdonacionescontroller = new Catdonacionescontroller;

const enrutadorcatdonaciones = Router();

enrutadorcatdonaciones.route('/catdonaciones').get(catdonacionescontroller.listarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones').post(catdonacionescontroller.guardarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones/:id').delete(catdonacionescontroller.eliminarcatdonaciones)
enrutadorcatdonaciones.route('/catdonaciones/:id').put(catdonacionescontroller.actualizarcatdonaciones)
enrutadorcatdonaciones.route('/catdonaciones/:id').get(catdonacionescontroller.buscarcatdonaciones)



export default enrutadorcatdonaciones;