import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AdminRouter, DoctorRouter, PatientRouter } from './routers';
import { AuthRouter } from './routers/auth';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/patient', PatientRouter);
app.use('/doctor', DoctorRouter);

export default app;
