export interface RegisterEquipRepository {
    registerEquip (idEquip: number, idCompany: number): Promise<void>
}
