
import { Request, Response, NextFunction } from 'express';

import { Author } from '../models/Author.entity';
import { AuthorService } from '../services/author.service';
import { AuthorRepository } from '../repositories/AuthorRepository';


export class AuthorController {
  private authorService: AuthorService;
  
  constructor(
    getAuthorService?: AuthorService,

  ) {
    const authorRepository = new AuthorRepository();
    this.authorService = getAuthorService || new AuthorService(authorRepository);
  }


  public async create(req: Request, res: Response, next: NextFunction){
    try {
      const author: Author = req.body;
      const createdAuthor= await this.authorService.createAuthor(author);
      res.status(201).json(createdAuthor);
    } catch (error) {
      next(error);
    }
  };

}