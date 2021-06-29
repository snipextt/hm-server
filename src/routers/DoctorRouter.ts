import { Router } from 'express';
import { Appointment, Prescription } from '../db';
import { DoctorMiddlewere } from './auth';

const DoctorRouter = Router();
DoctorRouter.use(DoctorMiddlewere);

DoctorRouter.get('/appointments/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).json({ err: 'Missing id' });
  const appointments = await Appointment.find({ doctor: id }).catch((err) => {
    res.status(500).json(err);
  });
  if (appointments!.length) res.status(200).json(appointments);
});

DoctorRouter.get('/prescriptions/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).json({ err: 'Missing id' });
  const prescription = await Prescription.find({ doctor: id }).catch((err) => {
    res.status(500).json(err);
  });
  if (prescription) res.status(200).json(prescription);
});

DoctorRouter.post('/prescription', async (req, res) => {
  const presecriptionInfo = req.body;
  const prescription = await Prescription.create({
    ...presecriptionInfo,
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (prescription) res.status(200).json(prescription);
});

export default DoctorRouter;
