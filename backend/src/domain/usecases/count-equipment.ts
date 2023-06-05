export interface CountEquipment {
  count(where?: CountEquipment.Parameter): Promise<CountEquipment.Response>
}

// eslint-disable-next-line no-redeclare
export namespace CountEquipment {
  export type Parameter = {
    [key: string] : string
  }
  export type Request = {
    query: {
      where?: Parameter
     }
  }
  export type Response = {
    count: number
  }
}
