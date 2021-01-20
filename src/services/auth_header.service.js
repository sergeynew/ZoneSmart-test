import { TokensStorageService } from './tokens_storage.service'

export const authHeader = () => {
    const accessToken = TokensStorageService.getAccessToken()
    if (accessToken) {
        return { Authorization: `JWT ${accessToken}` }
    }
    return {}
}
