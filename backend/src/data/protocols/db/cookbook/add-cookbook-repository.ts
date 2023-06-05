import { AddCookbookModel } from '../../../../domain/usecases/add-cookbook'
import { RecipeCookbookModel } from '../../../usecases/load-cookbook/db-load-cookbook-protocols'

export interface AddCookbookRepository {
    addCookbook(cookbook: AddCookbookModel): Promise<RecipeCookbookModel>
}
