import { MenuModel } from '../../../../domain/models/menu'

export interface LoadCompanyMenuRepository {
    loadMenu (idCompany: number): Promise<MenuModel[]>
}
