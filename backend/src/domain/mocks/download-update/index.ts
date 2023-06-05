import { DownloadUpdate } from '../../usecases/download-update'

export const mockRequest = (): DownloadUpdate.Request => ({ params: { ovenModel: 'FIT' } })

export const mockResponse = (): DownloadUpdate.Response => 'fitFile'
