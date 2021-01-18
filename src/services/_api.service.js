
import axios from 'axios';
import { authHeader } from '@/helpers'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

export const ApiService = {
    get,
    post,
    put,
    patch
}

function get (url, params) {
    return axios.get(url, params, { headers: authHeader })
}

function post (url, params) {
    return axios.post(url, params, { headers: authHeader })
}

function put (url, params) {
    return axios.post(url, params, { headers: authHeader })
}

function patch (url, params) {
    return axios.post(url, params, { headers: authHeader })
}
