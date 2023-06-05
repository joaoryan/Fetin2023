import { AddStoreModel } from '../../usecases/add-store'
import { StoreModel } from '../../models/store'
import { HttpRequest } from '../../../presentation/protocols'

export const mockFakeStoreWithId = (): AddStoreModel => ({
  storeName: 'storeName',
  cnpj: 'storeCnpj',
  companyId: 1,
  street: 'streetName',
  state: 'stateName',
  neighborhood: 'neighborhoodName',
  zipCode: 12345678,
  streetNumber: 1,
  city: 'cityName',
  latitude: 1.12345,
  longitude: -1.12345
})

export const mockFakeStore = (id: number = 1): StoreModel => ({ id: 1, ...mockFakeStoreWithId(), equipmentCount: 0 })

// CREATE

export const mockAddStoreRequest = (): HttpRequest => (
  {
    body: {
      store: mockFakeStoreWithId()
    }
  }
)
export const mockAddStoreResponse = (): StoreModel => mockFakeStore(1)

// READ
export const mockLoadStoresByCompanyIdRequest = (): HttpRequest => ({ params: { companyId: 1, userId: 1, userPrivilegeUser: 'admCli' } })

export const mockLoadStoresByCompanyIdResponse = (): StoreModel[] => ([{
  ...mockFakeStore(1)
}, {
  ...mockFakeStore(2)
}])

export const mockLoadStoreByIdRequest = (): HttpRequest => ({ params: { id: 1 } })

export const mockLoadStoreByIdResponse = (): StoreModel => mockFakeStore(1)

// UPDATE
export const mockUpdateStoreRequest = (updateId: number): HttpRequest => (
  {
    body: {
      store: mockFakeStore(updateId)
    },
    params: {
      id: updateId
    }
  }
)

// DELETE
export const mockDeleteStoreRequest = (id: number): HttpRequest => ({ params: { id } })
