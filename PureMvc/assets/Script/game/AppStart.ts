/**
 * 游戏启动函数
 * @author
 * 2021-06-21
 */
// import { JSEncrypt } from "../libs/src/JSEncrypt";
// import { JSEncrypt } from "../libs/src/JSEncrypt";
import Test from "../test/test";
import AppFacade from "./AppFacade";
import encryptUtils from "./utils/encryptUtils";
import UIManager from "./utils/UIManager";
// const NodeRSA = require('node-rsa');


const { ccclass, property } = cc._decorator;

@ccclass
export default class AppStart extends cc.Component {


    @property(cc.Node)
    btn: cc.Node = null

    @property(cc.Node)
    popLayer: cc.Node = null

    onLoad() {
        this.init();
    }

    private init() {
        /**赋值UIPopLayer */
        UIManager.UIPopLayer = this.popLayer;
        /**启动框架命令 */
        AppFacade.getInstance().startUp();
    }

    start() {

        // let arr = new Set([1, 2, 1, 4, 2]);
        let arr = [1, 1, 2, 3];

        let map = new Map();

        for (let i = 0; i < arr.length; i++) {
            let key = arr[i];
            map.set(key, 1);
        }
        map.set(arr[0], 1);

        (map.forEach(element => {
            console.log(element);
        }))
    }


    onClick() {
        let a = ["path0", "path1"];
        let b = ["path2", "path3"];

        Array.prototype.unshift.apply(a, b);

        console.log("拼接后的数组" + a);
    }

    async laterFun(index) {
        return new Promise((resolve, jectact) => {
            setTimeout(() => {
                resolve("123");
            }, 2000 * index + 1);
        })
    }

}
