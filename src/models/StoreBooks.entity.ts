// ./src/models/store_book.ts

import mongoose, { Document, Model, Schema } from 'mongoose';
import { Book } from './Book.entity';
import { Store } from './Store.entity';

export interface StoreBook extends Document {
  store: Store['_id'];
  book: Book['_id'];
  price: number;
}

const storeBookSchema: Schema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  price: { type: Number, required: true }
});

export const StoreBook: Model<StoreBook> = mongoose.model<StoreBook>('StoreBook', storeBookSchema);

// export default mongoose.model<StoreBook>('StoreBook', storeBookSchema);