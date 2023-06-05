export interface DeleteUser {
  deleteUser(id: number): Promise<boolean>
}
