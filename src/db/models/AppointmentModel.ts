import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserSchema } from './UserModel';

class AppointmentSchema {
  @prop({ type: String, required: true, ref: UserSchema })
  public doctor!: Ref<UserSchema, string>;
  @prop({ type: String, required: true, ref: UserSchema })
  public patient!: Ref<UserSchema, string>;
  @prop({ type: Date, required: true })
  public date!: Date;
  @prop({ type: String, required: true })
  public timeFrom!: string;
  @prop({ type: String, required: true })
  public timeTo!: string;
}

const Appointment = getModelForClass(AppointmentSchema);
export { AppointmentSchema, Appointment };
