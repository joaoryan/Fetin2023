import { UpdateUserByActivationCode, LoadUserByActivationRepository, UpdateActivateTokenRepository } from './db-Update-user-by-activation-protocols'

export class DbUpdateUserByActivation implements UpdateUserByActivationCode {
  private readonly loadUserByActivationRepository: LoadUserByActivationRepository
  private readonly UpdateActivateTokenRepository: UpdateActivateTokenRepository

  constructor (loadUserByActivationRepository: LoadUserByActivationRepository, UpdateActivateTokenRepository: UpdateActivateTokenRepository) {
    this.loadUserByActivationRepository = loadUserByActivationRepository
    this.UpdateActivateTokenRepository = UpdateActivateTokenRepository
  }

  async updateActivationCode (activateToken: string): Promise<void> {
    const user = await this.loadUserByActivationRepository.loadByActivation(activateToken)
    if (user) {
      await this.UpdateActivateTokenRepository.updateActivateToken(user.id, true)
    }
  }
}
