export interface DeleteUserRepository {
  deleteUser(id: number): Promise<boolean>
}
