
import { API_URLS } from '@/utils/api_urls.config'
import { TokensStorageService } from './tokens_storage.service'
import { ApiService } from './api.service'

const { JWT_CREATE_URL } = API_URLS.auth

function login (email, password) {
    return ApiService.post(JWT_CREATE_URL, { email, password })
        .then((response) => {
            if (response.data) {
                TokensStorageService.setTokens(response.data)
            }
            return response
        })
}

function logout () {
    // Delete user from localStorage
    TokensStorageService.clearTokens();
}

export const AuthService = {
    login,
    logout
}
