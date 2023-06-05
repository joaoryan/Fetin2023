import { UpdateSoftware } from '../../usecases/update-software'

export const mockRequest = (): UpdateSoftware.Request => ({ params: { ovenModel: 'FIT', iokPin: 'valid_PIN' } })

export const mockResponse = (): UpdateSoftware.Response => 'fitFile PIN OK'
