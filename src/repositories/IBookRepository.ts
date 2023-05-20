import { Book } from "../models/Book.entity";

export interface IBookRepository {

     create(authorId, name, pages): Promise<Book>;
     findAllBooksbyStoreId(storeId): any;
     findAllBooksbyAuthorId(authorId): any;
     findcheapest();

    

}