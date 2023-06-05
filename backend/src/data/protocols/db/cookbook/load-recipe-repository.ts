import { RecipeCookbookModel } from '../../../../domain/models/recipe-cookbook'

export interface LoadRecipeCookbookRepository {
    loadRecipeCookbook(idCompany: number): Promise<RecipeCookbookModel[]>
}
