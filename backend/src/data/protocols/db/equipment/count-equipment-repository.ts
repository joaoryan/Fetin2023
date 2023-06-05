import { CountEquipment } from '../../../../domain/usecases/count-equipment'

export interface CountEquipmentRepository {
  countEquipment: (where?: CountEquipmentRepository.Parameter) => Promise<CountEquipmentRepository.Result>
}
// eslint-disable-next-line no-redeclare
export namespace CountEquipmentRepository {
  export type Parameter = CountEquipment.Parameter
  export type Result = CountEquipment.Response
}
