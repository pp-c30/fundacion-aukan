import { Router } from "express";
import { DonacionesController } from "../controllers/donaciones.controller"; 
import { validarToken } from '../libs/verificarToken';
let donacionesController = new DonacionesController();

const enrutadorDonaciones = Router();

enrutadorDonaciones.route('/donaciones').get(validarToken,donacionesController.listarDonaciones);
enrutadorDonaciones.route('/donaciones-public').get(donacionesController.listarDonaciones);
enrutadorDonaciones.route('/donaciones').post(donacionesController.guardarDonaciones);
enrutadorDonaciones.route('/donaciones/:id').delete(donacionesController.eliminarDonaciones);
enrutadorDonaciones.route('/donaciones/:id').put(donacionesController.actualizarDonaciones);
enrutadorDonaciones.route('/donaciones/:id').get(donacionesController.buscarDonaciones);

export default enrutadorDonaciones;