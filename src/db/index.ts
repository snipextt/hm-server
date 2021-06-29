import { connect } from 'mongoose';
import { Appointment } from './models/AppointmentModel';
import { Medicine } from './models/MedicineModel';
import { Prescription } from './models/PrescriptionModel';
import { User } from './models/UserModel';

let connectTooDB = connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

export { connectTooDB, User, Appointment, Medicine, Prescription };
