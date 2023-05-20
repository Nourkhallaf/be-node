
import mongoose from "mongoose";
import { Author } from "../models/Author.entity";
import { Book } from "../models/Book.entity";
import { IBookRepository } from "./IBookRepository";
import { StoreBook } from "../models/StoreBooks.entity";
import { Store } from "../models/Store.entity";


export class BookRepository  implements  IBookRepository{
  public async create(authorId, name, pages): Promise<Book> {
    
    const author = await Author.findById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    const book = await Book.create({ author: authorId, name, pages });
    return book;
  }
    
   
    public async findAllBooksbyStoreId(storeId: any) {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new Error('Store not found');
      }
      const storeBooks = await StoreBook.find({ store: storeId }).populate('book');
      const books = storeBooks.map((storeBook) => storeBook.book);
      return books
  }

  public async findAllBooksbyAuthorId(authorId: any) {
    const author = await Author.findById(authorId);
    if (!author) {
      throw new Error('Book not found fort this Author');
    }
    const books= await Book.find({ author: authorId }).populate('author')
    return books
}

public async findcheapest(){


  const cheapestBooks = await StoreBook.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: 'book',
        foreignField: '_id',
        as: 'book',
      },
    },
    { $unwind: '$book' },
    {
      $lookup: {
        from: 'authors',
        localField: 'book.author',
        foreignField: '_id',
        as: 'book.author',
      },
    },
    { $unwind: '$book.author' },
    {
      $group: {
        _id: '$book.author._id',
        book: { $first: '$book' },
        price: { $min: '$price' },
      },
    },
    {
      $project: {
        _id: 0,
        author: '$_id',
        book: '$book._id',
        price: 1,
      },
    },
  ]);

  return cheapestBooks;
}

}