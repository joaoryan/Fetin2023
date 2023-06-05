import { UserModel } from '../../../../domain/models/user'
import { EditUserDataModel } from '../../../../domain/usecases/update-user-data'

export interface EditUserDataRepository {
    editUserData (userData: EditUserDataModel): Promise<UserModel>
}
