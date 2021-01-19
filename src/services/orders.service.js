import { ApiService } from './api.service'

export const OrdersService = {
    get
};

function get (...params) {
    ApiService.get(...params)
}
