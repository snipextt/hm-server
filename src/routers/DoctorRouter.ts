import { Router } from 'express';
import { DoctorMiddlewere } from './auth';

const DoctorRouter = Router();
DoctorRouter.use(DoctorMiddlewere);

export default DoctorRouter;
