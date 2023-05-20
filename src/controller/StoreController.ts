
import { Request, Response, NextFunction } from 'express';

import {Store } from '../models/Store.entity';
import {StoreBook} from '../models/StoreBooks.entity'
import { StoreService } from '../services/store.service';
import { StoreRepository } from '../repositories/StoreRepository';


export class StoreController {
  private storeService: StoreService;
  
  constructor(
    getStoreService?: StoreService,

  ) {
    const storeRepository = new StoreRepository();
    this.storeService = getStoreService || new StoreService(storeRepository);
  }


  public async create(req: Request, res: Response, next: NextFunction){
    try {
      const store:Store = req.body;
      const createdStore = await this.storeService.createStore(store);
      res.status(201).json(createdStore);
    } catch (error) {
      next(error);
    }
  };

  public async sellBook(req: Request, res: Response, next: NextFunction){
    try {

      
      const storeId = req.params.storeId;
      const bookId= req.params.bookId;
      const price = parseInt(req.body.price);
      
      const storeBook = await this.storeService.sellBookStore(price,storeId,bookId)
      
      if (storeBook){
        res.status(200).send('Book sold successfully');
      } else {
        res.status(404).send('Book not found in store');
      }
      // const store:Store = req.body;
      // const createdStore = await this.storeService.createStore(store);
    } catch (error) {
      next(error);
    }
  };
}