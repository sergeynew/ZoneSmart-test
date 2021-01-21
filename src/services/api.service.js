/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import { API_URLS } from '@/utils/api_urls.config'
import { authHeader } from './auth_header.service'
import { TokensStorageService } from './tokens_storage.service'

const { JWT_CREATE_URL } = API_URLS.auth
const { JWT_REFRESH_URL } = API_URLS.auth

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
})

// Interceptor for refreshing token.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        if (originalRequest.url !== JWT_CREATE_URL) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const refreshToken = TokensStorageService.getRefreshToken()
                if (!refreshToken) return Promise.reject(error)
                return post(JWT_REFRESH_URL, { refresh: refreshToken })
                    .then((tokenResponse) => {
                        if (tokenResponse.status === 200) {
                            TokensStorageService.setAccessToken(tokenResponse.data.access)
                            Object.assign(originalRequest.headers, authHeader())
                            return axiosInstance(originalRequest)
                        }
                        return Promise.reject(error)
                    })
            }
        }
        return Promise.reject(error)
    }
)

// Interceptor for setting Auth headers.
axiosInstance.interceptors.request.use((request) => {
    Object.assign(request.headers.common, authHeader())
    return request
})

function get (url, params) {
    return axiosInstance.get(url, { params })
}

function post (url, params) {
    return axiosInstance.post(url, params)
}

function put (url, params) {
    return axiosInstance.put(url, params)
}

function patch (url, params) {
    return axiosInstance.patch(url, params)
}

export const ApiService = {
    get,
    post,
    put,
    patch
}
