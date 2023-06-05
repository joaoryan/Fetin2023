import { RecipeCookbookModel } from '../models/recipe-cookbook'

export interface LoadRecipeCookbook {
    loadRecipeCookbook(idCompany: number | null): Promise<RecipeCookbookModel[]>
}
