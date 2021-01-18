
import { ApiService } from '@/services/_api.service'

export const authService = {
    login,
    logout
};

function login (username, password) {
    return ApiService.post('/login', { username, password })
}

function logout () {
    // Delete user from localStorage
}
