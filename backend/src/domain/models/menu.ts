import { MenuConfigsModel } from './menu-configs'

export interface MenuModel {
    id?: number,
    equipTypeId: number,
    companyId: number,
    menuName: string,
    creationDate: string,
    lastUpdate: string,
    menuVersion: number,
    deletionDate: string,
    userId: number,
    deletedBy: string,
    language: string,
    configs?: MenuConfigsModel
}
