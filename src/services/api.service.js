/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { authHeader } from './auth_header.service'
import { LocalStorageService } from './local_storage.service'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = LocalStorageService.getRefreshToken()
            return post('/auth/jwt/refresh', { refresh: refreshToken })
                .then((tokenResponse) => {
                    if (tokenResponse.status === 201) {
                        LocalStorageService.setTokens(tokenResponse.data)
                        axios.defaults.headers.common.Authorization = `JWT ${LocalStorageService.getAccessToken()}`
                        return axios(originalRequest)
                    }
                    return tokenResponse;
                })
        }
        return Promise.reject(error)
    }
)

function get (url, params) {
    return axios.get(url, params, { headers: authHeader })
}

function post (url, params) {
    return axios.post(url, params, { headers: authHeader })
}

function put (url, params) {
    return axios.put(url, params, { headers: authHeader })
}

function patch (url, params) {
    return axios.patch(url, params, { headers: authHeader })
}

export const ApiService = {
    get,
    post,
    put,
    patch
}
