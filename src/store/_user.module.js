import { AuthService, TokensStorageService } from '@/services'
import { router } from '@/router'

const initialState = TokensStorageService.getAccessToken()
    ? { status: { loggedIn: true }, user: '' }
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
                        commit('LOGIN_FAILURE', error)
                    }
                )
        },

        logout ({ commit }) {
            AuthService.logout()
            commit('LOGOUT')
        }
    },

    mutations: {
        LOGIN_REQUEST (state, userName) {
            state.status = { loggingIn: true }
            state.user = userName
        },

        LOGIN_SUCCESS (state, userName) {
            state.status = { loggedIn: true }
            state.user = userName
        },

        LOGIN_FAILURE (state) {
            state.status = { loginFailure: true }
            state.user = null
        },

        LOGOUT (state) {
            state.status = {}
            state.user = null
        }
    }
}
