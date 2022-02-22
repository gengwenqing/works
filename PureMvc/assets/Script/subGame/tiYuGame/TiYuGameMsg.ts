import AppFacade from "../../game/AppFacade";
import UIManager from "../../game/utils/UIManager";
import Http from "../../net/Http";
import TiYuMediator from "./mediator/TiYuMediator";

/**
 * 体育demo
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TiYuGameMsg extends cc.Component {

    @property(cc.Node)
    popLayer: cc.Node = null;

    onLoad() {
        AppFacade.getInstance().registerMediator(new TiYuMediator(TiYuMediator.NAME, this));
    }

    public static timeDistance = 0;
    public static timeBegin = 0;
    public static timeEnd = 0;
    start() {
        
        let time = Date.now();
        console.log("开始时间",time);
        TiYuGameMsg.timeBegin = time;
        AppFacade.getInstance().sendNotification("添加大厅", this.node);

        UIManager.UIPopLayer = this.popLayer;


        Http.getIns().Post("https://loginim.get1origins.com/mobilesitev2/api/home/getSiteProfile",
            { Token: "YTY4ZDJlNmM0YjZkZGY1ZjllNDVjMzRiYTk2NTQzODcmJmZoX25hbWVnd3FnMCYmJiYxNjQ1NDMzMTAw", BrandId: 1 }, (data) => {
                console.log(data);
            })


        // console.log(this.formatHdp(-0.75, 1, 0));
        // console.log(this.formatHdp(-0.75, 1, 1));


        // console.log(this.formatHdp(-0.25, 1, 0));

        // console.log(this.formatHdp(-0.25, 1, 1));

        // this.pool = new cc.NodePool("111");
        // console.log("刚创建的数量:" + this.pool.size());

        // let node = new cc.Node; node.name = "test";
        // this.pool.put(node)
        // this.pool.put(node)
        // this.pool.put(node)
        // this.pool.put(node)
        // this.pool.put(node)
        // this.pool.put(node)
        // console.log("放入节点后的数量:" + this.pool.size());

        // node = this.pool.get();;
        // console.log("拿到的node", node);
        // console.log("拿到节点后的数量", this.pool.size());

    }

    formatHdp(hdp: number, bit, index) {
        let sNum = this.fract(hdp);
        let str = "";
        if (bit == 2) { // 大小
            let sOrB = index > 0 ? "小" : "大";
            if (sNum > 0) {
                // 有可能要有区间
                if (sNum == 0.5) {
                    str = sOrB + hdp;
                } else {
                    if (sNum > 0.00 && sNum < 0.50) { // .25
                        str = sOrB + Math.trunc(hdp) + "/" + (Math.trunc(hdp) + 0.5);
                    } else if (sNum > 0.50 && sNum < 1) { // .75
                        str = sOrB + (Math.trunc(hdp) + 0.5) + "/" + (Math.trunc(hdp) + 1);
                    } else {
                        str = hdp.toString();
                    }
                }
            } else {
                str = sOrB + hdp;
            }

        } else if (bit == 1) { //让球
            let sHdp = index == 0 ? hdp : -hdp;
            str += sHdp > 0 ? "+" : "-";
            sNum = this.fract(Math.abs(sHdp)); // 小数部分的值;
            if (sNum == 0.5) {
                str += sHdp.toString();
            } else {
                let absHdp = Math.abs(Math.trunc(hdp));
                if (sNum > 0.00 && sNum < 0.50) {
                    str += absHdp + "/" + (absHdp + 0.5);
                } else if (sNum > 0.50 && sNum < 1) {
                    str += (absHdp + 0.5) + "/" + (absHdp + 1);
                } else {
                    str = hdp.toString();
                }
            }
        }
        return str;
    }

    fract(num) {
        return num - Math.trunc(num);
    }



    private pool;
    createPoolAndPutOne() {

    }

    getNodeFromPool() {
        return
    }

    // update (dt) {}
}
