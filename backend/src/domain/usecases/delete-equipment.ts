export interface DeleteEquipment {
  delete(id: number): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace DeleteEquipment {
  export type Request = {
    params: { id?: number }
  }
}
