export interface ActivationModel {
    activateToken: string
}

export interface UpdateUserByActivationCode {
    updateActivationCode (activateToken: String): Promise<void>;
}
