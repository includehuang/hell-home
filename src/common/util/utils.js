// noinspection JSUnusedGlobalSymbols
const utils = {
    /**
     * RSA加密
     * @param pubKey
     * @param str
     * @returns {string}
     */
    encrypted: function(pubKey, str){
        const NodeRSA = require("node-rsa")
        const RSA = new NodeRSA(pubKey)
        return RSA.encrypt(str, 'base64')
    },
    /**
     * RSA解密
     * @param pubKey
     * @param str
     * @returns {string}
     */
    decrypted: function(pubKey, str){
        const NodeRSA = require("node-rsa")
        const RSA = new NodeRSA(pubKey)
        return RSA.decrypt(str, 'utf8')
    },
    /**
     * 判断两个数组是否包含相同元素
     * @param a {[String|Number]}
     * @param b {[String|Number]}
     * @returns {boolean}
     */
    isHaveSameElement: function(a, b) {
        const arr = new Set([...a, ...b])
        return a.length + b.length !== arr.size
    }
}
export default utils
