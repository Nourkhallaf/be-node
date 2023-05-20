// ./src/models/book.ts

import mongoose, { Document, Model, Schema } from 'mongoose';
import { Author } from './Author.entity';

export interface Book extends Document {
  name: string;
  pages: number;
  author: Author['_id'];
}

const bookSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  pages: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: false }
});

export const Book: Model<Book> = mongoose.model<Book>('Book', bookSchema);
// export default mongoose.model<Book>('Book', bookSchema);