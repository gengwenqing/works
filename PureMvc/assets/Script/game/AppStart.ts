/**
 * 游戏启动函数
 * @author
 * 2021-06-21
 */
// import { JSEncrypt } from "../libs/src/JSEncrypt";
// import { JSEncrypt } from "../libs/src/JSEncrypt";
import { JSEncrypt } from "../libs/src/JSEncrypt";
import Test from "../test/Test";
import test from "../test/Test";
import AppFacade from "./AppFacade";
import encryptUtils from "./utils/encryptUtils";
// const NodeRSA = require('node-rsa');


const { ccclass, property } = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {


    @property(cc.Node)
    btn: cc.Node = null

    @property(cc.Node)
    popLayer: cc.Node = null

    start() {
        this.appStart();
    }

    public appStart() {

        AppFacade.getInstance().startUp();


    }

    onClick() {
        cc.resources.load("Prefabs/Entry", cc.Prefab, (error, asserts) => {
            let node: any = cc.instantiate(asserts);
            this.popLayer.addChild(node);
        })

        // let PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY----- 
        // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxdgoZOYfNp3LFNdvUfOjSfHhL
        // HzGTRy5lEIEZsAmNwkUDJ8+jvr1rOuoyZsCsS1Azs261hZfiHYf+6tc6AIeKP4vE
        // VtTuQZ/hxfsv0sgLBXy8b9E5vNadqZj7W44zCuI1gkJsZziHAwsb90u6SDypMaRk
        // ZPgUeK0z+HCDs5tdXwIDAQAB
        // -----END RSA PUBLIC KEY-----`

        // let PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
        // MIICXAIBAAKBgQCxdgoZOYfNp3LFNdvUfOjSfHhLHzGTRy5lEIEZsAmNwkUDJ8+j
        // vr1rOuoyZsCsS1Azs261hZfiHYf+6tc6AIeKP4vEVtTuQZ/hxfsv0sgLBXy8b9E5
        // vNadqZj7W44zCuI1gkJsZziHAwsb90u6SDypMaRkZPgUeK0z+HCDs5tdXwIDAQAB
        // AoGANIPb5S8TMxa0bgvMLAty0qcm6gQnJZBQ+HNz4OgpS5wL1C050xkk8NCUcana
        // pqH67/HPd0Q7eByJHDTe0DlL4m0C1afcwimSGHPXgwK+N+N9I/d2ylRGDoTxYTaJ
        // K4L9aheteoaYT5qCMCh/rUvj81spM65BFkVOMmOPK2RBGSECQQDlTnn/QMdCzy2K
        // +mVQJUY6vkfkoAEDkLbiVILnyxOVdrgCvVw0jL21Je3havGCIi6kuN/6uLFz8h7q
        // 68wsmhF3AkEAxh6Gk9ghvMkgf1OYqfSZoci7ZKNuK2URvofJypzlKmEMR+abuHRs
        // UB2WfPINchvciEQoNRFq6CjvszyNqinNWQJAFoIihYS1SoCNpuO3SCuwfhmpcu6l
        // ytTMruC+zMPpUzWJEHPH9jyObpafiA34UN7MF00yZyjz+j6c/FBTBVnGNwJAXwgN 
        // baViqXegSvMCa6OUffIXUTLDibU1SbtApBuWITnj9ik70MKnodZPdSd2I6IRqptm
        // 3e245hucvtDw8wqSIQJBAN0IbYObwAO+hxGWdrhgYZU2TdKRWqwN2JtB761+xhmZ
        // 8i0dBC3RB629WbG6dnkxxSRr7jxbqHl5tVqn2YNaIcI=
        // -----END RSA PRIVATE KEY-----`

        // let jiamihou = "XHPPCsZjtWzEExgcvRQ9SJ4Y0jWOxY0qwRazzBUTDnxXrKkZFtuSwxlwg6Nr1ar7cO3W5LmbKIXdRmuTPTq\/Y0Ys1a0KfY1MWI0RtpDxoT\/bTFXv3Nv56XsyciTw1OfmNiphosHoNX5Req\/DU96CM7hu3bf\/+X2PqC4PRxHfg7M="

        // // let jiami = new JSEncrypt({});
        // // jiami.setPrivateKey(PRIVATE_KEY); 
        // // let en64 = jiami.encrypt("123456"); // 加密
        // // console.log("加密后的结果:" + en64);

        // let jiemi = new JSEncrypt({});
        // jiemi.setPublicKey(PUBLIC_KEY); // 设置公钥
        // let data = jiemi.decrypt(jiamihou,true); // 进行解密

        // console.log(data);


        // let obj:Object = {
        //     "key0":0,
        //     "key1":1,
        //     "key2":2,
        //     "key3":3,
        // }

        // for (const key in obj) {
        //     if (Object.prototype.hasOwnProperty.call(obj, key)) {

        //         const element = obj[key];

        //     }
        // }
        // console.log(obj.toString());

        // let xhr = cc.loader.getXMLHttpRequest();
        // xhr.open("POST", "www.baidu.com", true);
        // let obj1 = {
        //     "123":1,
        //     "456":2
        // }

        // xhr.send(obj1);

        // let test = new Test();

        // let name = test.name();
        // name.then(console.log);

        // await test.tarce1()
        // await test.tarce2();
        // await test.tarce3();
        // await test.tarce4();

        // await test.tarce2();
        // await test.tarce3();
        // await test.tarce4();

        // for (let i = 0; i < 1000; i++) {
        //     var data = new FormData();

        //     var xhr = new XMLHttpRequest();
        //     xhr.withCredentials = true;

        //     xhr.addEventListener("readystatechange", function () {
        //         if (this.readyState === 4) {
        //             console.log(this.responseText);
        //         }
        //     });

        //     xhr.open("GET", "http://tg.n9963.com/frontend/v1//captcha?encryptedBody=8wHNYOm7ZjEUnmTYgxTlHpATrtrEcywEA4tttKgtyGdXGpwvp53wnbq%252FZ5hQ2I3g");
        //     xhr.setRequestHeader("request-id", "A5c4N9onHaVzmlCCxj5tQ3zk7go9cS10tq7TUqzQyhc0gneoiZEK5az0Hyq5z3SgPiuvoJqhwQ2RvnfDMkLqxxbphz5XKG8Ph4qEugNYtJGdTGF5w+erbj1wObWLZlSaGpRwT69WBButsLflp2S7fVsHQFQygUgYUjQUgCDEEB8=");
        //     xhr.setRequestHeader("encryptResponse", "1");
        //     xhr.setRequestHeader("timestamp", "1624851334");

        //     xhr.send(data);
        // }


        // let xhr = cc.loader.getXMLHttpRequest();
        // xhr.timeout = timeout;
        // xhr.ontimeout = this._onTimeOut.bind(this, url, dataObj, reConCount, callback, tokenStr, "get", "timeout");
        // xhr.onerror = this._onTimeOut.bind(this, url, dataObj, reConCount, callback, tokenStr, "get", "error");
        // xhr.onreadystatechange = this._onreadystatechange.bind(this, xhr, requestURL, callback);
        // xhr.open("GET", requestURL, true);

        // http://beiyong.u0031.com/



        // let aeskey =  "QeSEKSwYLXqYNLGs";//encryptUtils.careate_aes128_16_key();
        // let obj = "{'id':0}1624875103";
        // let data =  encryptUtils.get_aes_encrypedBody(obj);
        // console.log("加密结果" + data);

        // let data1 = encryptUtils.get_decryptBody(aeskey,data);
        // console.log("解密结果:" + data1);

        // let url = ["1", "2", "3", "4"];

        // for (let i = 0; i < 4; i++) {
        //     let curUrl = url[i];
        //     console.log("同步:curUrl:" + curUrl);
        //     this.laterFun(i).then((result) => {
        //         console.log("result:" + result);
        //         console.log("curUrl:" + curUrl);
        //         console.log("i:" + i);
        //     })
        // }

        // let xhr = new XMLHttpRequest();
        // // console.log(xhr.readyState);
        // xhr.open('GET', 'https://12345671111111111111111189.com/');
        // // console.log(xhr.readyState);
        // xhr.onreadystatechange = () => { 
        //     console.log(xhr.readyState);
        // };
        // xhr.send();
    }

    async laterFun(index) {
        return new Promise((resolve, jectact) => {
            setTimeout(() => {
                resolve("123");
            }, 2000 * index + 1);
        })
    }

}
