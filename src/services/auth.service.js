import apiUrls from '@/utils/api_urls.config'
import { ApiService } from './api.service'
import { LocalStorageService } from './local_storage.service'

const { JWT_CREATE_URL } = apiUrls.auth

export const AuthService = {
    login,
    logout
};

function login (email, password) {
    return ApiService.post(JWT_CREATE_URL, { email, password })
        .then((response) => {
            if (response.data) {
                LocalStorageService.setTokens(response.data);
            }
            return response;
        })
}

function logout () {
    // Delete user from localStorage
    localStorage.removeItem('user');
}
