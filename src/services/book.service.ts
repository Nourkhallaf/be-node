import { Book } from '../models/Book.entity';
import { IBookRepository } from '../repositories/IBookRepository';

export class BookService {
  private repository: IBookRepository;

  constructor(repository: IBookRepository) {
    this.repository = repository;
  }

  public async createBook(authorId, name,pages): Promise<any> {
    try{
        return await this.repository.create(authorId, name, pages);
    }catch(error){
        throw error;
    }
  }

   public async getAllBooksByStoreId(storeId:any) {
    try {
      return await this.repository.findAllBooksbyStoreId(storeId);
    } catch (error) {
        throw error;

    }
        
  }

  public async findAllBooksbyAuthorId(authorId:any) {
    try {
      
      return await this.repository.findAllBooksbyAuthorId(authorId)
    } catch (error) {
        throw error;

    }
        
  }

  public async getCheapest(){

    try {
        return await this.repository.findcheapest()

    } catch (error) {
        throw error;

    }
  }

  
}
