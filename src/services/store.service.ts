import { Store } from '../models/Store.entity';
import { IStoreRepository } from '../repositories/IStoreRepository';

export class StoreService {
  private repository: IStoreRepository;

  constructor(repository: IStoreRepository) {
    this.repository = repository;
  }

  public async createStore(store: Store): Promise<Store> {
    try{

        return await this.repository.create(store);
    }catch(error){
        throw error;
    }
  }

 
  public async sellBookStore(price,storeId,bookId) {
    try{

        return await this.repository.sellBookInstore(price,storeId,bookId);
    }catch(error){
        throw error;
    }
  }

}