import { AuthService, TokensStorageService } from '@/services'
import { router } from '@/router'

const initialState = TokensStorageService.getAccessToken()
    ? { status: { logged_in: true }, user: '' }
    : { status: {}, user: null }

export const user = {
    namespaced: true,
    state: initialState,

    actions: {
        login ({ commit }, { email, password }) {
            commit('LOGIN_REQUEST', email)
            AuthService.login(email, password)
                .then(
                    (response) => {
                        commit('LOGIN_SUCCESS', email)
                        router.push('/')
                    },
                    (error) => {
                        console.error(error)
                        commit('LOGIN_FAILURE')
                    }
                )
        },

        logout ({ commit }) {
            AuthService.logout()
            commit('LOGOUT')
        }
    },

    mutations: {
        LOGIN_REQUEST (state, user_name) {
            state.status = { logged_in: true }
            state.user = user_name
        },

        LOGIN_SUCCESS (state, user_name) {
            state.status = { logged_in: true }
            state.user = user_name
        },

        LOGIN_FAILURE (state) {
            state.status = { login_failure: true }
            state.user = null
        },

        LOGOUT (state) {
            state.status = {}
            state.user = null
        }
    }
}
