
import { Author } from "../models/Author.entity";
import { IAuthorRepository } from "./IAuthorRepository";


export class AuthorRepository  implements  IAuthorRepository{
    public async create(author: Author): Promise<Author> {
        
        const newAuthor = await Author.create(author);
        return newAuthor;
    }



}
