import { OrdersService } from '@/services';

export const orders = {
    namespaced: true,
    state: {
        orders: {}
    },
    actions: {
        getOrders ({ commit }, params) {
            OrdersService.get(params)
                .then((response) => {
                    commit('SET_ORDERS', response.data)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    },
    mutations: {

        SET_ORDERS (state, ordersArray) {
            state.orders = ordersArray
        },

        CLEAR_STATE (state) {
            state.orders = {}
        }
    }
}
