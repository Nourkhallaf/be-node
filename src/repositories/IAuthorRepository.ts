import { Author } from "../models/Author.entity";
import { Book } from "../models/Book.entity";

export interface IAuthorRepository {

    create(author: Author): Promise<Author>;
}