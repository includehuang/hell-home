<template>
    <div class="main">
        <a-form
            id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit"
        >
            <a-tabs
                :activeKey="customActiveKey"
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                @change="handleTabClick"
            >
                <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
                    <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="$t('user.login.message-invalid-credentials')" />
                    <a-form-item>
                        <a-input
                            size="large"
                            type="text"
                            :placeholder="$t('user.login.userName.placeholder')"
                            v-decorator="[
                                'username',
                                {rules: pattern.userName(), validateTrigger: 'change'}
                            ]"
                        >
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input-password
                            size="large"
                            :placeholder="$t('user.login.password.placeholder')"
                            v-decorator="[
                                'password',
                                {rules: pattern.userPassword(), validateTrigger: 'blur'}
                            ]"
                        >
                            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input-password>
                    </a-form-item>
                </a-tab-pane>
                <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-mobile')">
                    <a-form-item>
                        <a-input size="large" type="text" :placeholder="$t('user.login.mobile.placeholder')" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: $t('user.login.mobile.placeholder') }], validateTrigger: 'change'}]">
                            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="16">
                            <a-form-item>
                                <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: $t('user.verification-code.required') }], validateTrigger: 'blur'}]">
                                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <a-button
                                class="getCaptcha"
                                tabindex="-1"
                                :disabled="state.smsSendBtn"
                                @click.stop.prevent="getCaptcha"
                                v-text="!state.smsSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
                            ></a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>

            <a-form-item>
                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{ $t('user.login.remember-me') }}</a-checkbox>
                <router-link
                    :to="{ name: 'recover', params: { user: 'aaa'} }"
                    class="forge-password"
                    style="float: right;"
                >{{ $t('user.login.forgot-password') }}</router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                >{{ $t('user.login.login') }}</a-button>
            </a-form-item>

            <div class="user-login-other">
                <span>{{ $t('user.login.sign-in-with') }}</span>
                <a>
                    <a-icon class="item-icon" type="alipay-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="taobao-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="weibo-circle"></a-icon>
                </a>
                <router-link class="register" :to="{ name: 'Register' }">{{ $t('user.login.signup') }}</router-link>
            </div>
        </a-form>

    </div>
</template>

<script>
import pattern from "@/common/validator/pattern"

// const pattern = () => import('@/common/validator/pattern')

export default {
    components: {
    },
    data() {
        return {
            pattern,
            customActiveKey: 'tab1',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            }
        }
    },
    created() {
    },
    methods: {
        // handler
        handleUsernameOrEmail(rule, value, callback) {
            const regex = /^[\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4FA-Za-z0-9_]+$/
            if (regex.test(value)) {
                callback()
            } else {
                callback('????????')
            }
        },
        handleTabClick(key) {
            this.customActiveKey = key
            // this.form.resetFields()
        },
        handleSubmit(e) {
            e.preventDefault()
            const {
                form: { validateFields },
                state,
                customActiveKey,
                Login
            } = this

            state.loginBtn = true

            const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

            validateFields(validateFieldsKey, { force: true }, (err, values) => {
                if (!err) {
                    console.log('login form', values)
                    const loginParams = { ...values }
                    delete loginParams.username
                    loginParams[!state.loginType ? 'email' : 'username'] = values.username
                    loginParams.password = md5(values.password)
                    Login(loginParams)
                        .then((res) => this.loginSuccess(res))
                        .catch(err => this.requestFailed(err))
                        .finally(() => {
                            state.loginBtn = false
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },
        /**
         * 发送手机验证码
         * @param e
         */
        getCaptcha(e) {

        },
        stepCaptchaSuccess() {
            this.loginSuccess()
        },
        stepCaptchaCancel() {
            this.Logout().then(() => {
                this.loginBtn = false
                this.stepCaptchaVisible = false
            })
        },
        loginSuccess(res) {
            console.log(res)
            // check res.homePage define, set $router.push name res.homePage
            // Why not enter onComplete
            /*
            this.$router.push({ name: 'analysis' }, () => {
              console.log('onComplete')
              this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`
              })
            })
            */
            this.$router.push({ path: '/' })
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
            this.isLoginError = false
        },
        requestFailed(err) {
            this.isLoginError = true
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                duration: 4
            })
        }
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
    }

    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
}
</style>
