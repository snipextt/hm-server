import { Router } from 'express';
import { PatientMiddlewere } from './auth';

const PatientRouter = Router();
PatientRouter.use(PatientMiddlewere);

export default PatientRouter;
