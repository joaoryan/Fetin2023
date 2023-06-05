export interface UpdateEquipByCompany {
    update(idEquip: number, idCompany: number): Promise<void>
}
