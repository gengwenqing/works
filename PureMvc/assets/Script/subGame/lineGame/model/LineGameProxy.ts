/**
 * 连线游戏 数据代理;
 */

import IProxy from "../../../frame/pureMvc/interfaces/IProxy";
import Proxy from "../../../frame/pureMvc/patterns/proxy/Proxy";
import { LineGameVo } from "./vo/LineGameVo";

export default class LineGameProxy extends Proxy implements IProxy {


    static NAME = "LineGameProxy";
    /**
     * 被注册调用
     */
    public onRegister() {
        console.log("GameProxy被调用");
    }

    /**
     * 被删除调用
     */
    public onRemove() {
        console.log("GameProxy被删除");
    }

    public createMapData() {
        let map = [

            [-10, -11, -12, -13, -14, -15],
            [-11, -2, -2, -2, -2, -2],
            [-12, -2, -2, -2, -2, -2],
            [-13, -2, -2, -2, -2, -2],
            [-14, -2, -2, -2, -2, -2],
            [-15, -2, -2, -2, -2, -2],
            [-16, -2, -2, -2, -2, -2],
            [-17, -2, -2, -2, -2, -2],
            [-18, -2, -2, -2, -2, -2],
            [-19, -2, -2, -2, -2, -2],
            [-20, -2, -2, -2, -2, -2],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 3, 0, 0],
            // [0, 1, 0, 3, 0, 0],
            // [0, 0, 0, 0, 0, 0],
            // [0, 3, 0, 1, 0, 0],
            // [0, 0, 0, 0, 0, 0]
        ];
        // 赋值
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 5; j += 2) {
                let ele = this.randomMax(6);
                map[i][j] = ele;
                map[i][j + 1] = ele;
            }
        }

        //打乱顺序
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 5; j++) {
                let rI = this.randomMax(8) + 1;
                let rJ = this.randomMax(4) + 1;
                let temp = map[rI][rJ];
                map[rI][rJ] = map[i][j];
                map[i][j] = temp;
            }
        }

        let data = this.getData() as LineGameVo;
        data.mapArr = map;

        cc.log("数据", map);
    }

    /**
     * 获取0-max随机数;
     * @param max 
     */
    private randomMax(max): number {
        return Math.floor(Math.random() * max);
    }


}
