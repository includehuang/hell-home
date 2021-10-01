const utils = {
    /**
     * RSA加密
     * @param pubKey
     * @param str
     * @returns {string}
     */
    encrypted: function(pubKey, str){ // 注册方法
        const NodeRSA = require("node-rsa")
        const RSA = new NodeRSA(pubKey)
        return RSA.encrypt(str, 'base64')
    },
    decrypted: function(pubKey, str){ // 注册方法
        const NodeRSA = require("node-rsa")
        const RSA = new NodeRSA(pubKey)
        return RSA.decrypt(str, 'utf8')
    }
}
export default utils
