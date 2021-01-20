import { API_URLS } from '@/utils/api_urls.config'
import { ApiService } from './api.service'

const { ORDER_INDEX_URL } = API_URLS.orders

export const OrdersService = {
    get
}

function get (params) {
    return ApiService.get(ORDER_INDEX_URL, params)
}
