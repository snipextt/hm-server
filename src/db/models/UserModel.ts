import { prop, getModelForClass } from '@typegoose/typegoose';
const _UserTypes = ['a', 'd', 'p'];
const _UserGenders = ['m', 'f', 'o'];
const USER_TYPES = {
  ADMIN: _UserTypes[0],
  DOCTOR: _UserTypes[1],
  PATIENT: _UserTypes[2],
};
const USER_GENDERS = {
  MALE: _UserGenders[0],
  FEMALE: _UserGenders[1],
  OTHER: _UserGenders[2],
};
class UserSchema {
  @prop({ type: String, required: true })
  public name!: string;
  @prop({ type: String, required: true, unique: true })
  public email!: string;
  @prop({ type: String, required: true })
  public password!: string;
  @prop({ type: String, enum: _UserTypes, required: true })
  public userType!: string;
  @prop({ type: Number })
  public age?: string;
  @prop({ type: [String], default: [] })
  public medicalConditions?: [string];
  @prop({ type: String, required: true, enum: _UserGenders })
  public gender!: string;
  @prop({ type: String, required: true })
  public phone!: string;
}
const User = getModelForClass(UserSchema);
export { User, USER_TYPES, USER_GENDERS, UserSchema };
