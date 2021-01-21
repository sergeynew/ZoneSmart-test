import { OrdersService } from '@/services'
import OrderModel from '@/models/OrderModel'

export const orders = {
    namespaced: true,
    state: {
        ordersList: {},
        tableFields: {
            id: {
                title: 'Номер заказа',
                type: 'text'
            },
            createDate: {
                title: 'Дата создания',
                type: 'datetime'
            },
            status: {
                title: 'Статус',
                type: 'text'
            },
            isPaid: {
                title: 'Оплачен',
                type: 'checked'
            },
            isShipped: {
                title: 'Отправлен',
                type: 'checked'
            },
            isCompleted: {
                title: 'Доставлен',
                type: 'checked'
            },
            buyer: {
                title: 'Заказчик',
                type: 'text'
            },
            shippingMethod: {
                title: 'Метод доставки',
                type: 'text'
            },
            totalPrice: {
                title: 'Итоговая цена',
                type: 'price'
            }
        }
    },
    actions: {
        getOrders ({ commit }, params) {
            OrdersService.get(params)
                .then((response) => {
                    const ordersArray = response.data.results
                    commit('SET_ORDERS', ordersArray)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    },
    mutations: {

        SET_ORDERS (state, ordersData) {
            const ordersObjects = ordersData.reduce(
                (result, item) => Object.assign(result, { [item.order_id]: new OrderModel(item) }),
                {}
            )
            state.ordersList = ordersObjects
        },

        SET_PARAMS (state, params) {
        },

        CLEAR_STATE (state) {
            state.orders = {}
        }
    }
}
