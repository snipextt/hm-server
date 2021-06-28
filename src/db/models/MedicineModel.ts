import { prop, getModelForClass } from '@typegoose/typegoose';

class MedicineSchema {
  @prop({ type: String, required: true, unique: true })
  public name!: string;
  @prop({ type: Number, required: true })
  public cost!: string;
}

const Medicine = getModelForClass(MedicineSchema);

export { Medicine, MedicineSchema };
