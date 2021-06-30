import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { MedicineSchema } from './MedicineModel';
import { UserSchema } from './UserModel';

class PrescriptionCLass {
  @prop({ type: Date, required: true })
  public date!: string;
  @prop({ type: String, required: true, ref: UserSchema })
  public doctor!: Ref<UserSchema, string>;
  @prop({ type: String, required: true, ref: UserSchema })
  public patient!: Ref<UserSchema, string>;
  @prop({ type: [String], required: true, ref: MedicineSchema })
  public medicationList!: Ref<MedicineSchema, string>[];
  @prop({ type: String, required: true })
  public medicationDescription!: string;
  @prop({ type: Number, required: true })
  public medicationCost!: number;
}

const Prescription = getModelForClass(PrescriptionCLass);

export { Prescription };
