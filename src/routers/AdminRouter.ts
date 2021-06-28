import { genSalt, hash } from 'bcryptjs';
import { json, Router } from 'express';
import { Medicine, Prescription, User } from '../db';
import AdminMiddlewere from './auth/utils/AdminMiddlewere';

const AdminRouter = Router();
AdminRouter.use(AdminMiddlewere);

AdminRouter.post('/user', async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.password)
    return res.status(400).json({ err: 'Missing password field' });
  const salt = await genSalt(10);
  const passwordHash = await hash(userInfo.password, salt);
  const user = await User.create({
    ...userInfo,
    password: passwordHash,
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (user) res.status(200).json(user);
});

AdminRouter.get('/users', async (req, res) => {
  const users = await User.find({
    $or: [{ userType: 'p' }, { userType: 'd' }],
  }).catch((err) => {
    res.status(500).json(err);
  });
  if (users) res.status(200).json(users);
});

AdminRouter.get('/user/:id', async (req, res) => {
  const userID = req.params.id;
  if (!userID) res.status(400).json({ err: 'Missing user id' });
  const user = await User.findById(userID).catch((err) => {
    res.status(500).json(err);
  });
  if (user) res.status(200).json(user);
});

AdminRouter.post('/medicine', async (req, res) => {
  const medicineInfo = req.body;
  const medicine = await Medicine.create({
    ...medicineInfo,
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (medicine) res.status(200).json(medicine);
});

AdminRouter.get('/medicines', async (req, res) => {
  const medicine = await Medicine.find({}).catch((err) => {
    res.status(500).json(err);
  });
  if (medicine) res.status(200).json(medicine);
});

AdminRouter.post('/prescription', async (req, res) => {
  const presecriptionInfo = req.body;
  const prescription = await Prescription.create({
    ...presecriptionInfo,
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (prescription) res.status(200).json(prescription);
});

AdminRouter.get('/prescriptions', async (req, res) => {
  const prescription = await Prescription.find({}).catch((err) => {
    res.status(500).json(err);
  });
  if (prescription) res.status(200).json(prescription);
});

AdminRouter.get('/prescription/:id', async (req, res) => {
  const prescriptionID = req.params.id;
  if (!prescriptionID) res.status(400).json({ err: 'Missing prescription id' });
  const prescription = await Prescription.findById(prescriptionID).catch(
    (err) => {
      res.status(500).json(err);
    }
  );
  if (prescription) res.status(200).json(prescription);
});

export default AdminRouter;
