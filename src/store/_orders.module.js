import { OrdersService } from '@/services'
import OrderModel from '@/models/OrderModel'

export const orders = {
    namespaced: true,
    state: {
        ordersList: {},
        selectedOrdersList: {},
        allOrdersSelectedFlag: false,
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
        },
        subFields: {
            sku: {
                title: 'SKU',
                type: 'text'
            },
            title: {
                title: 'Название',
                type: 'text'
            },
            quantity: {
                title: 'Количество',
                type: 'text'
            },
            totalPrice: {
                title: 'Цена',
                type: 'price'
            },
            image_url: {
                title: 'Изображение',
                type: 'text'
            }
        }
    },
    actions: {
        async getOrders ({ commit }, params) {
            try {
                const result = await OrdersService.get(params)
                commit('SET_ORDERS', result.data.results)
            } catch (e) {
                throw Error(e)
            }
        },

        selectUnselectAllOrders ({ commit }, isSelect) {
            if (isSelect) {
                commit('SELECT_ALL')
            } else {
                commit('UNSELECT_ALL')
            }
        },

        selectUnselectOrderItem ({ commit }, params) {
            const { flag, id } = params
            if (flag) {
                commit('SELECT_ORDER', id)
            } else {
                commit('UNSELECT_ORDER', id)
            }
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

        SELECT_ALL (state) {
            state.allOrdersSelectedFlag = true
            Object.assign(state.selectedOrdersList, state.ordersList)
        },

        UNSELECT_ALL (state) {
            state.allOrdersSelectedFlag = false
            state.selectedOrdersList = {}
        },

        SELECT_ORDER (state, id) {
            Object.assign(state.selectedOrdersList, { [id]: state.ordersList[id] })
            const ordersLength = Object.keys(state.ordersList).length
            const selectedLength = Object.keys(state.selectedOrdersList).length
            state.allOrdersSelectedFlag = ordersLength === selectedLength
        },

        UNSELECT_ORDER (state, id) {
            state.allOrdersSelectedFlag = false
            delete state.selectedOrdersList[id]
        }
    }
}
