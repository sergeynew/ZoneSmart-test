<template lang="pug">
   #login-page.login-form
        form.login-form__wrapper.flex-column(
            @submit.prevent="onSubmit"
        )
            .login-form__title
                h2 Вход
            .login-form__field.form-input(
                :class="{ 'form-input_error': $v.email.$error }"
            )
                input.form-control(
                    v-model.trim="$v.email.$model"
                    name="email"
                    type='email'
                    placeholder="E-mail или телефон"
                )
            .login-form__field.form-input(
                :class="{ 'form-input_error': $v.password.$error }"
            )
                input#password-field.form-control(
                    v-model.trim="$v.password.$model"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                )
                i.icon.form-input__icon(
                    :class="show_password ? 'hide-icon' : 'show-icon'"
                    @click="togglePasswordVisibility"
                )
            .login-form__errors(
                v-if="errors.credentials_required"
            ) {{ errors_text.credentials_required }}
            .login-form__errors(
                v-else-if="login_status.login_failure"
            ) {{ errors_text.login_failure }}
            .login-form__submit
                button.btn.btn_green.uppercase(
                    type="submit"
                    :disabled="$v.anyError"
                ) Войти
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

const ERRORS = {
    login_failure: 'Пользователь не найден',
    credentials_required: 'Пожалуйста введите e-mail / пароль'
}

export default {
    mixins: [validationMixin],

    data () {
        return {
            email: '',
            password: '',
            errors: {},
            is_sumbitted: false,
            show_password: false,
            errors_text: ERRORS
        }
    },

    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },

    created () {
        // Delete all existing data about user
        this.$store.dispatch('user/logout')
    },

    methods: {
        onSubmit () {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.errors = { credentials_required: true }
            } else {
                this.errors = {}
                this.submitted = true
                if (this.email && this.password) {
                    this.$store.dispatch('user/login', { email: this.email, password: this.password })
                }
            }
        },

        togglePasswordVisibility () {
            const input = document.getElementById('password-field')
            this.show_password = !this.show_password
            input.type = this.show_password ? 'text' : 'password'
        }
    },

    computed: {
        ...mapState({
            login_status: (state) => state.user.status
        })
    }
}
</script>

<style lang="sass">
.login-form
    display: flex
    min-height: 100vh

    &__wrapper
        width: 400px
        min-height: 450px
        margin: auto
        padding: 0 40px
        border: none
        background: white
        box-shadow: 0px 14px 64px rgba(48, 56, 64, 0.16)
        border-radius: 6px
    &__title
        margin: 40px 0
        text-align: center
    &__field
        width: 100%
    &__submit
        margin: auto 0 40px 0
        .btn
            width: 100%
    &__errors
        color: $error-red-color
        font-weight: 600
</style>
