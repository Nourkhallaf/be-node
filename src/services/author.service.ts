import { Author } from './../models/Author.entity';
import { Book } from '../models/Book.entity';
import { IAuthorRepository } from '../repositories/IAuthorRepository';

export class AuthorService {
  private repository: IAuthorRepository;

  constructor(repository: IAuthorRepository) {
    this.repository = repository;
  }

  public async createAuthor(author: Author): Promise<Author> {
    try{
        return await this.repository.create(author);
    }catch(error){
        throw error;
    }
  }




}