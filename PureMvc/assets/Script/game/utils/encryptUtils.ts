
import { AES, enc, mode } from "crypto-ts";

export default class encryptUtils {

    private static aseKey: string = "QeSEKSwYLXqYNLGs";

    public static publicKey: string = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDf2lqx9TDDxarmXiCRZbecwQJa
    nrYuDbC9DjVQM3di8pf8/uanA0EVNiLJU4gjp/MAJHMX0GQD4N/ToFLQXtvtWx/t
    41RGNumWEToxKWpky6lk+D665Jfx0AFlhrZG4t23c78nPgb5VyMxkuBTKUPULIXC
    CtJjtOVJ/wM2LMi44QIDAQAB
    -----END PUBLIC KEY-----`


    public static isDecrypt = true;

    /**
     * AES加密
     * @param messageBody 
     */
    private static encrypt(messageBody) {

        // 组合 消息体
        let msg = messageBody;
        let jsonMsg = JSON.stringify(msg);
        let time = Date.parse(new Date().toString()) / 1000;
        let temp = jsonMsg + time;
        console.log(temp);
        return AES.encrypt(temp, enc.Utf8.parse(encryptUtils.aseKey), { mode: mode.ECB }).toString();
    }

    /**
     * 生成16位私有key
     * 对时间加加密,取前16位置;
     * 作为动态key;
     */
    private static pruduct16PrivateKey(): string {
        let n = "";
        let t = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < 16; i++) {
            n += t.charAt(Math.floor(Math.random() * t.length));
        }
        console.log("产生的16位 key:       " + n);
        return n
    }

    /**
     * AES解密
     * @param messageBody 
     */
    private static decrypt(aesKey: string, messageBody) {
        let decryptedBody = AES.decrypt(messageBody, enc.Utf8.parse(aesKey), { mode: mode.ECB });
        return enc.Utf8.stringify(decryptedBody);
    }


    //------------------------------------------------- 获取http 头key方法---------------------------------

    /**
     * encryptedBody 
     * 获取AES加密后的消息体
     * @param messageBody 
     * @returns  加密后的结果
     */
    public static get_aes_encrypedBody(messageBody): any {
        if (messageBody == null) {
            messageBody = {};
        }
        return encryptUtils.encrypt(messageBody);
    }

    /**
     * encryptKey 
     * 获取ras加密后的 私有key
     * @returns 
     */
    public static get_ras_aes128_key(): any {
        let jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(encryptUtils.publicKey);
        return jsEncrypt.encrypt(encryptUtils.aseKey);
    }

    /**
     * 获取aes128 
     * 16位asekey;
     */
    public static careate_aes128_16_key() {
        encryptUtils.aseKey = encryptUtils.pruduct16PrivateKey();
        return  encryptUtils.aseKey;
    }
    /**
     * timestamp 对应http头参数
     * 获取时间戳 10位 (秒级)
     */
    public static get_timestamp(): number {
        return Date.parse(new Date().toString()) / 1000;
    }

    /**
     * 获取解密后的消息体
     * // 目前服务器没有加密返回,返回结果是明文
     * @param messageBody 
     * @returns 
     */
    public static get_decryptBody(aeskey, messageBody): string {
        return encryptUtils.decrypt(aeskey, messageBody);
    }

    /**
     * 获取解密的 RAS解密后的 key;
     * @returns 
     */
    public static get_decryptKey(aesKeyBase64): string {
        let decryptor = new JSEncrypt();
        decryptor.setPublicKey(encryptUtils.publicKey);
        let data = decryptor.decrypt(aesKeyBase64, true);
        return data;
    }

}
