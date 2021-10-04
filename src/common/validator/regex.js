/* eslint-disable key-spacing */
export default {
    userName:              /^[\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4FA-Za-z0-9_@.\-]+$/,
    userNameExceptCN:      /^[A-Za-z0-9_@.\-]+$/,
    userPassword:          /^[A-Za-z0-9_@.\-]+$/,
    userPasswordIncludeCN: /^[\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4FA-Za-z0-9_@.\-]+$/,
    phoneNumber:           /^1[0-9]{10}$/,
}
