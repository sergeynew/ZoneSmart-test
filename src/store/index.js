import Vuex from 'vuex'
import Vue from 'vue'

import { authentication } from './_authentication.module';
import { orders } from './_orders.module';

Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        authentication,
        orders
    }
});
