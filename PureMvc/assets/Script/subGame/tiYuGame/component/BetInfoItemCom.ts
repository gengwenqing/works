import AppFacade from "../../../game/AppFacade";
import BetInfoDataCom from "./BetInfoDataCom";

/**
 * 投注信息详情 组件
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BetInfoItemCom extends cc.Component {

    @property(cc.Label)
    vs0: cc.Label = null;

    @property(cc.Label)
    vs1: cc.Label = null;

    @property(cc.Node)
    titleNode: cc.Node = null;

    @property(cc.Node)
    pageViewTitle: cc.Node = null;

    @property(cc.Node)
    pageViewInfo: cc.Node = null;

    /**投注详情的数据结构体 */
    private data: object = null;

    private index = 0;

    @property(cc.Node)
    fristPageWs: cc.Node = null;

    @property(cc.Node)
    secondPageWs: cc.Node = null;

    @property(cc.Node)
    secondTitleItem: cc.Node = null;

    onLoad() { }

    start() {

    }

    update(dt) { }

    setInfo(data, index) {
        this.index = index;
        this.data = data;
        this.vs0.string = data.htn;
        this.vs1.string = data.atn;
        // 对阵信数据
        let mls = data.mls;
        this.secondPageWs.active = (mls.length > 3);
        this.secondTitleItem.active = (mls.length > 3);
        this.fristPageWs.getComponent(BetInfoDataCom).setWsInfo(this.formatData(mls, 1));
        if (mls.length > 3) {
            this.secondPageWs.getComponent(BetInfoDataCom).setWsInfo(this.formatData(mls, 2));
        }
    }

    private formatData(data, pageIndex) {
        let formatData = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            let ele = data[i];
            if (ele.pi == pageIndex) {
                for (let j = 0; j < ele.ws.length; j++) {
                    let wsEle = ele.ws[j];
                    obj["bit_" + ele.bti + "_" + j] = wsEle.o;
                    if (ele.bti != 3) {
                        obj["bit_" + ele.bti + "_" + j + "hdp"] = this.formatHdp(wsEle.hdp, ele.bti, j);
                    }

                }
                formatData.push(obj);
            }
        }
        return formatData;
    }

    setTitleVisible(bool) {
        this.titleNode.active = bool;
    }

    onPageViewInfo() {
        let pageIndex = this.pageViewInfo.getComponent(cc.PageView).getCurrentPageIndex();
        let childs = this.node.parent.children;
        for (let index = 0; index < childs.length; index++) {
            const element = childs[index];
            element.getComponent(BetInfoItemCom).updatePage(pageIndex);
        }
    }

    updatePage(index) {
        console.log("更新page" + index);

        this.pageViewTitle.getComponent(cc.PageView).scrollToPage(index, 0.3);
        this.pageViewInfo.getComponent(cc.PageView).scrollToPage(index, 0.3);
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

}
