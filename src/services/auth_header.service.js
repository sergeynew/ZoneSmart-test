import { TokensStorageService } from './tokens_storage.service'

export const authHeader = () => {
    const access_token = TokensStorageService.getAccessToken()
    if (access_token) {
        return { Authorization: `JWT ${access_token}` }
    }
    return {}
}
