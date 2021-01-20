import { AuthService } from '@/services';
import { router } from '@/router'

const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = storedUser
    ? { status: { loggedIn: true }, user: storedUser }
    : { status: {}, user: null };

export const user = {
    namespaced: true,
    state: initialState,

    actions: {
        login ({ commit }, { email, password }) {
            commit('LOGIN_REQUEST', { email });
            AuthService.login(email, password)
                .then(
                    (response) => {
                        commit('LOGIN_SUCCESS', response.data);
                        router.push('/');
                    },
                    (error) => {
                        commit('LOGIN_FAILURE', error);
                    }
                );
        },

        logout ({ commit }) {
            AuthService.logout();
            commit('LOGOUT');
        }
    },

    mutations: {
        LOGIN_REQUEST (state, userData) {
            state.status = { loggingIn: true };
            state.user = userData;
        },

        LOGIN_SUCCESS (state, userData) {
            state.status = { loggedIn: true };
            state.user = userData;
        },

        LOGIN_FAILURE (state) {
            state.status = { loginFailure: true }
            state.user = null;
        },

        LOGOUT (state) {
            state.status = {};
            state.user = null;
        }
    }
}
