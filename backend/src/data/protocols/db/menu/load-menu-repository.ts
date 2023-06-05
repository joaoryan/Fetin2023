import { MenuModel } from '../../../../domain/models/menu'

export interface LoadMenuRepository {
    loadMenuById (id: number): Promise<MenuModel>
}
