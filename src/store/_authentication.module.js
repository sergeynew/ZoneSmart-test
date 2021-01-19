import { AuthService } from '@/services';
import { router } from '@/router'

const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = storedUser
    ? { status: { loggedIn: true }, user: storedUser }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,

    actions: {
        login ({ commit }, { username, password }) {
            commit('LOGIN_REQUEST', { username });

            AuthService.login(username, password)
                .then(
                    (user) => {
                        commit('LOGIN_SUCCESS', user);
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
        LOGIN_REQUEST (state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },

        LOGIN_SUCCESS (state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },

        LOGIN_FAILURE (state) {
            state.status = {};
            state.user = null;
        },

        LOGOUT (state) {
            state.status = {};
            state.user = null;
        }
    }
}
