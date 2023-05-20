
import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';
import { BookRepository } from '../repositories/BookRepository';


export class BookController {
  private bookService: BookService;
  
  constructor(
    getBookService?: BookService,

  ) {
    const bookRepository = new BookRepository();
    this.bookService = getBookService || new BookService(bookRepository);
  }


  public async create(req, res) {
    try {

      const name =req.body.name;
      const pages= req.body.pages;
      const authorId = req.params.authorId;

      const book = await this.bookService.createBook(authorId, name, pages);
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

public async findAllBooksbyStoreId (req: Request, res: Response, next: NextFunction){
    try {
      const storeId = req.params.storeId;

      const booksInStore = await this.bookService.getAllBooksByStoreId(storeId)
      res.status(200).json(booksInStore);
    } catch (error) {
      next(error);
    }
  };
 

  public async findAllBooksbyAuthorId (req: Request, res: Response, next: NextFunction){
    try {
      const authorId = req.params.authorId;
      const booksAuthors = await this.bookService.findAllBooksbyAuthorId(authorId)
      res.status(200).json(booksAuthors);
    } catch (error) {
      next(error);
    }
  };


    public async getCheapestBooksByAuthor(req: Request, res: Response, next: NextFunction) {
      try {
        const books = await this.bookService.getCheapest();
        res.status(200).json(books);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
        next(error)
      }
    


  }
}