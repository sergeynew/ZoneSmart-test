import Vuex from 'vuex'
import Vue from 'vue'

import { user } from './_user.module'
import { orders } from './_orders.module'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        user,
        orders
    }
})
