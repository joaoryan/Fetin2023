import { MenuModel } from '../models/menu'

export interface LoadCompanyMenu {
    loadMenu (idCompany: number): Promise<MenuModel[] | null>
}
