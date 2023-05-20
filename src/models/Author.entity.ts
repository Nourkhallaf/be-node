

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Author extends Document {
  name: string;
}

const authorSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true }
});

export const Author: Model<Author> = mongoose.model<Author>('Author', authorSchema);