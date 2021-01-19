
import { ApiService } from './api.service'

export const AuthService = {
    login,
    logout
};

function login (username, password) {
    return ApiService.post('/login', { username, password })
        .then((user) => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout () {
    // Delete user from localStorage
    localStorage.removeItem('user');
}
