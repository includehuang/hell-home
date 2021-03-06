<!--suppress ALL -->
<template>
    <div class="main user-layout-register">
        <h3><span>{{ $t('user.register.register') }}</span></h3>
        <a-form ref="formRegister" :form="form" id="formRegister">

            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    :placeholder="$t('user.login.userName.placeholder')"
                    v-decorator="['username', {rules: pattern.userName(), validateTrigger: 'change'}]"
                >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-input
                    size="large"
                    type="text"
                    :placeholder="$t('user.register.email.placeholder')"
                    v-decorator="['email', {rules: [{ required: true, type: 'email', message: $t('user.email.required') }], validateTrigger: ['change', 'blur']}]"
                ></a-input>
            </a-form-item>

            <a-popover
                placement="rightTop"
                :trigger="['focus']"
                :getPopupContainer="(trigger) => trigger.parentElement"
                v-model="state.passwordLevelChecked">
                <template slot="content">
                    <div :style="{ width: '240px' }" >
                        <div :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
                        <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                        <div style="margin-top: 10px;">
                            <span>{{ $t('user.register.password.popover-message') }}</span>
                        </div>
                    </div>
                </template>
                <a-form-item>
                    <a-input-password
                        size="large"
                        @click="handlePasswordInputClick"
                        :placeholder="$t('user.register.password.placeholder')"
                        v-decorator="['password', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }, pattern.userPasswordRule()], validateTrigger: ['change', 'blur']}]"
                    ></a-input-password>
                </a-form-item>
            </a-popover>

            <a-form-item>
                <a-input-password
                    size="large"
                    :placeholder="$t('user.register.confirm-password.placeholder')"
                    v-decorator="['password2', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                ></a-input-password>
            </a-form-item>

            <!-- 手机号和验证码 -->
            <!--
            <a-form-item>
                <a-input size="large" :placeholder="$t('user.login.mobile.placeholder')" v-decorator="['mobile', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
                    <a-select slot="addonBefore" size="large" defaultValue="+86">
                        <a-select-option value="+86">+86</a-select-option>
                        <a-select-option value="+87">+87</a-select-option>
                    </a-select>
                </a-input>
            </a-form-item>

            <a-row :gutter="16">
                <a-col class="gutter-row" :span="16">
                    <a-form-item>
                        <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <a-button
                        class="getCaptcha"
                        size="large"
                        :disabled="state.smsSendBtn"
                        @click.stop.prevent="getCaptcha"
                        v-text="!state.smsSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
                </a-col>
            </a-row>
            -->

            <a-form-item>
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="register-button"
                    :loading="registerBtn"
                    @click.stop.prevent="handleSubmit"
                    :disabled="registerBtn">{{ $t('user.register.register') }}
                </a-button>
                <router-link class="login" :to="{ name: 'Login' }">{{ $t('user.register.sign-in') }}</router-link>
            </a-form-item>

        </a-form>
    </div>
</template>

<script>
import pattern from "@/common/validator/pattern"

function scorePassword(pass) {
    let score = 0
    if (!pass) {
        return score
    }
    // award every unique letter until 5 repetitions
    const letters = {}
    for (let i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1
        score += 5.0 / letters[pass[i]]
    }

    // bonus points for mixing it up
    const variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass)
    }

    let variationCount = 0
    for (let check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0
    }
    score += (variationCount - 1) * 10

    return parseInt(`${score}`)
}

const levelNames = {
    0: 'user.password.strength.short',
    1: 'user.password.strength.low',
    2: 'user.password.strength.medium',
    3: 'user.password.strength.strong'
}
const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
}
const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a'
}
export default {
    name: 'Register',
    components: {
    },
    data() {
        return {
            pattern,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                level: 0,
                smsSendBtn: false,
                passwordLevel: 0,
                passwordLevelChecked: false,
                percent: 10,
                progressColor: '#FF0000'
            },
            registerBtn: false
        }
    },
    computed: {
        passwordLevelClass() {
            return levelClass[this.state.passwordLevel]
        },
        passwordLevelName() {
            return levelNames[this.state.passwordLevel]
        },
        passwordLevelColor() {
            return levelColor[this.state.passwordLevel]
        }
    },
    methods: {
        handlePasswordLevel(rule, value, callback) {
            if (value === '') {
                return callback()
            }
            if (value.length >= 6) {
                if (scorePassword(value) >= 30) {
                    this.state.level = 1
                }
                if (scorePassword(value) >= 60) {
                    this.state.level = 2
                }
                if (scorePassword(value) >= 80) {
                    this.state.level = 3
                }
            } else {
                this.state.level = 0
                callback(this.$t('user.password.strength.msg'))
            }
            this.state.passwordLevel = this.state.level
            this.state.percent = this.state.level * 33
            callback()
        },
        handlePasswordCheck(rule, value, callback) {
            const password = this.form.getFieldValue('password')
            if (value === undefined) {
                callback(this.$t('user.password.required'))
            }
            if (value && password && value.trim() !== password.trim()) {
                callback(this.$t('user.password.twice.msg'))
            }
            callback()
        },
        handlePhoneCheck(rule, value, callback) {

        },
        handlePasswordInputClick() {
            this.state.passwordLevelChecked = true
        },
        handleSubmit() {

        },
        getCaptcha(e) {

        },
        requestFailed(err) {

        }
    },
}
</script>
<style lang="less">
.user-register {

    &.error {
        color: #ff0000;
    }

    &.warning {
        color: #ff7e05;
    }

    &.success {
        color: #52c41a;
    }

}

.user-layout-register {
    .ant-input-group-addon:first-child {
        background-color: #fff;
    }
}
</style>
<style lang="less" scoped>
.user-layout-register {

    & > h3 {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .register-button {
        width: 50%;
    }

    .login {
        float: right;
        line-height: 40px;
    }
}
</style>
