import { UpdateCookbookModel } from '../../../../domain/usecases/update-cookbook'

export interface UpdateCookbookRepository {
    updateCookbook(id: number, cookbook: UpdateCookbookModel): Promise<boolean>
}
