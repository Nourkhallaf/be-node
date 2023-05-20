import { Store } from "../models/Store.entity";

export interface IStoreRepository {

    create(store: Store): Promise<Store>;
    sellBookInstore(price,storeId,bookId):Promise<any>;

}