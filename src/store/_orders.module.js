import { OrdersService } from '@/services'
import OrderModel from '@/models/OrderModel'

export const orders = {
    namespaced: true,
    state: {
        orders_list: {},
        selected_orders_list: {},
        request_params: {
            offset: 0,
            limit: 10,
            search: ''
        },
        orders_count: 0,
        table_fields: {
            id: {
                title: 'Номер заказа',
                type: 'text'
            },
            create_date: {
                title: 'Дата создания',
                type: 'datetime'
            },
            status: {
                title: 'Статус',
                type: 'text'
            },
            is_paid: {
                title: 'Оплачен',
                type: 'checked'
            },
            is_shipped: {
                title: 'Отправлен',
                type: 'checked'
            },
            is_completed: {
                title: 'Доставлен',
                type: 'checked'
            },
            buyer: {
                title: 'Заказчик',
                type: 'text'
            },
            shipping_method: {
                title: 'Метод доставки',
                type: 'text'
            },
            total_price: {
                title: 'Итоговая цена',
                type: 'price'
            }
        },
        sub_fields: {
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
            total_price: {
                title: 'Цена',
                type: 'price'
            },
            image_url: {
                title: 'Изображение',
                type: 'text'
            }
        },
        status: {
            loading: true,
            loaded: false
        }
    },
    actions: {
        async getOrders ({ state, commit }, params) {
            try {
                commit('SET_LOADING_STATUS')
                commit('SET_REQUEST_PARAMS', params)
                const result = await OrdersService.get(state.request_params)
                commit('SET_ORDERS', result.data.results)
                commit('SET_TOTAL_ORDERS_COUNT', result.data.count)
                commit('SET_LOADED_STATUS')
            } catch (e) {
                throw Error(e)
            }
        },

        selectUnselectAllOrders ({ commit }, is_select) {
            if (is_select) {
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
        },

        updateSelectedOrders ({ state }) {
            const ids = Object.keys(state.selected_orders_list)
            console.log('ОБНОВЛЯЮ:', ids)
        },

        deleteSelectedOrders ({ state }) {
            const ids = Object.keys(state.selected_orders_list)
            console.log('УДАЛЯЮ:', ids)
        }
    },

    mutations: {
        SET_REQUEST_PARAMS (state, params) {
            state.request_params = { ...state.request_params, ...params }
        },

        SET_ORDERS (state, orders_data) {
            const orders_objects = orders_data.reduce(
                (orders_models, item) => {
                    const result = { ...orders_models, [item.order_id]: new OrderModel(item) }
                    return result
                },
                {}
            )
            state.orders_list = orders_objects
        },

        SELECT_ALL (state) {
            state.selected_orders_list = { ...state.orders_list }
        },

        UNSELECT_ALL (state) {
            state.selected_orders_list = {}
        },

        SELECT_ORDER (state, id) {
            Object.assign(state.selected_orders_list, { [id]: state.orders_list[id] })
        },

        UNSELECT_ORDER (state, id) {
            delete state.selected_orders_list[id]
        },

        SET_TOTAL_ORDERS_COUNT (state, count) {
            state.orders_count = count
        },

        SET_LOADING_STATUS (state) {
            state.status.loading = true
            state.status.loaded = false
        },

        SET_LOADED_STATUS (state) {
            state.status.loaded = true
            state.status.loading = false
        }
    }
}
