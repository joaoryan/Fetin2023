import { MenuModel } from '../models/menu'

export interface LoadMenuById {
    loadMenu (id: number): Promise<MenuModel | null>
}
