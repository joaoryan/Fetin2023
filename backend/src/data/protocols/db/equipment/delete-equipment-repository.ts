export interface DeleteEquipmentRepository {
  deleteEquipment: (id: number) => Promise<boolean>
}
