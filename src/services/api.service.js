/* eslint-disable no-underscore-dangle */

import axios from 'axios'
import apiUrls from '@/utils/api_urls.config'
import { authHeader } from './auth_header.service'
import { LocalStorageService } from './local_storage.service'

const { JWT_CREATE_URL } = apiUrls.auth
const { JWT_REFRESH_URL } = apiUrls.auth

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

// Interceptor for refreshing token.
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        if (originalRequest.url !== JWT_CREATE_URL) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const refreshToken = LocalStorageService.getRefreshToken()
                return post(JWT_REFRESH_URL, { refresh: refreshToken })
                    .then((tokenResponse) => {
                        if (tokenResponse.status === 201) {
                            LocalStorageService.setAccessToken(tokenResponse.access)
                            axios.defaults.headers.common.Authorization = authHeader()
                            return axios(originalRequest)
                        }
                        return tokenResponse
                    })
            }
        }
        return Promise.reject(error)
    }
)

function get (url, params) {
    return axios.get(url, params, { headers: authHeader() })
}

function post (url, params) {
    return axios.post(url, params, { headers: authHeader() })
}

function put (url, params) {
    return axios.put(url, params, { headers: authHeader() })
}

function patch (url, params) {
    return axios.patch(url, params, { headers: authHeader() })
}

export const ApiService = {
    get,
    post,
    put,
    patch
}
