export interface UpdateActivateTokenRepository {
    updateActivateToken(id: number, emailVerified: boolean): Promise<void>
}
