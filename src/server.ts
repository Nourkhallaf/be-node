

import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import {AuthorController} from './controller/AuthorController';
import { StoreController } from './controller/StoreController';
import {BookController} from './controller/BookController';


class Server {
  public app: Application;

  private authorController: AuthorController;
  private storeController: StoreController;

  private bookController: BookController;


  constructor() {
    this.app = express();
    this.authorController = new AuthorController();
    this.storeController = new StoreController();
    this.bookController = new BookController();



    this.config();
    this.routes();
    this.connectToDatabase();
    // this.handleError();
  }

  private config() {
    this.app.use(bodyParser.json());
  }


  // Configure routes
  private routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the Book Store API!');
    });

    // Book
   this.app.post('/author/:authorId/books', this.bookController.create.bind(this.bookController));
   this.app.get('/books/:storeId', this.bookController.findAllBooksbyStoreId.bind(this.bookController));
   this.app.get('/books/authors/:authorId', this.bookController.findAllBooksbyAuthorId.bind(this.bookController));
   this.app.get('/books/:authorId/cheapest', this.bookController.getCheapestBooksByAuthor.bind(this.bookController));

   // author
   this.app.post('/author', this.authorController.create.bind(this.authorController));
   
   //Store
   this.app.post('/store', this.storeController.create.bind(this.storeController));
   this.app.post('/store/:storeId/:bookId', this.storeController.sellBook.bind(this.storeController));
   
  }
  

  private connectToDatabase() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/BookStore', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log('Connected to database'))
      .catch((err) => console.log(err));
  }




//   private handleError() {
//     this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//       errorHandler(err, req, res, next);
//     });

//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       notFoundHandler(req, res, next);
//     });
//   }
}

const server = new Server();

server.app.listen(3000, () => {
  console.log('Server started on port 3000');
});
