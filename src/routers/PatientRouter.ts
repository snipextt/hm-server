import { Router } from 'express';
import { Appointment, Prescription, User } from '../db';
import { PatientMiddlewere } from './auth';

const PatientRouter = Router();
PatientRouter.use(PatientMiddlewere);

PatientRouter.get('/appointments/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).json({ err: 'Missing id' });
  const appointments = await Appointment.find({ patient: id }).catch((err) => {
    res.status(500).json(err);
  });
  if (appointments!.length) res.status(200).json(appointments);
});

PatientRouter.get('/prescriptions/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).json({ err: 'Missing id' });
  const appointments = await Prescription.find({ patient: id }).catch((err) => {
    res.status(500).json(err);
  });
  if (appointments!.length) res.status(200).json(appointments);
});

PatientRouter.post('/appointment', async (req, res) => {
  const appointmentInfo = req.body;
  const appointment = await Appointment.create({
    ...appointmentInfo,
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (appointment) res.status(200).json(appointment);
});

PatientRouter.get('/doctors', async (req, res) => {
  const doctors = await User.find({ userType: 'd' }).catch((err) => {
    res.status(400).json({ err: err });
  });
  if (doctors!.length) res.status(200).json(doctors);
});

export default PatientRouter;
