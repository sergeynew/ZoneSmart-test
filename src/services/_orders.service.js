import { ApiService } from '@/services/_api.service'

export const ordersService = {
    get
};

function get (...params) {
    ApiService.get(...params)
}
