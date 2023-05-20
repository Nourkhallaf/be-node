
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Store extends Document {
  name: string;
  address: string;
}

const storeSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
});

export const Store: Model<Store> = mongoose.model<Store>('Store', storeSchema);
