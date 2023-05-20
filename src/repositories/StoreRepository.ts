
import { Book } from "../models/Book.entity";
import { Store } from "../models/Store.entity";
import { StoreBook } from "../models/StoreBooks.entity";
import { IStoreRepository } from "./IStoreRepository";


export class StoreRepository  implements  IStoreRepository{
    public async create(store: Store): Promise<Store> {
        const newStore = await Store.create(store);
        return newStore;
    }


    public async sellBookInstore(price,storeId,bookId): Promise<any>{

        const store = await Store.findById(storeId);
        if (!store) {
            throw new Error('Store not found' );
        }
        const book = await Book.findById(bookId);

        if (!book) {
            throw new Error( 'Book not found');
        }
        const storeBook = StoreBook.create({ store:storeId, book: bookId, price });

            return storeBook
    }

}
