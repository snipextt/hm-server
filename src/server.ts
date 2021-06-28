import express from 'express';
import { AdminRouter, DoctorRouter, PatientRouter } from './routers';
import dotenv from 'dotenv';
import { AuthRouter } from './routers/auth';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/patient', PatientRouter);
app.use('/doctor', DoctorRouter);

export default app;
