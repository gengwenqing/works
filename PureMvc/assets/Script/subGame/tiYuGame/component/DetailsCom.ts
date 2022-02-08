/**
 * 详情组件
 */

import { timeStamp } from "console";
import List from "../../../frame/pureMvc/tools/List";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import { DetailsMediator } from "../mediator/DetailsMediator";
import DetailsComItemCom from "./DetailsComItemCom";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DetailsCom extends cc.Component {

    @property(cc.Node)
    return: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(List)
    list: List = null;

    static data = [
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false },
        { "isMorn": false }

        // 0: {pid: 21, pn: "世界", pon: 1, cid: 785, cn: "俱乐部友谊赛", cpmon: 470, crbon: 600, scn: "julebuyouyisai",…}
        // 1: {pid: 59, pn: "印度尼西亚", pon: 2, cid: 107, cn: "印度尼西亚甲级联赛", cpmon: 235, crbon: 2570,…}
        // 2: {pid: 199, pn: "VS PES", pon: 3, cid: 21033, cn: "VS - IM独家PES21亚洲友谊赛", cpmon: 9910, crbon: 2640,…}
        // 3: {pid: 199, pn: "VS PES", pon: 3, cid: 19861, cn: "VS - IM独家PES21 欧洲友谊赛", cpmon: 9916, crbon: 2645,…}
        // 4: {pid: 181, pn: "VS FIFA", pon: 4, cid: 17173, cn: "VS - IM 独家FIFA20意大利", cpmon: 9914, crbon: 2655,…}
        // 5: {pid: 181, pn: "VS FIFA", pon: 4, cid: 17172, cn: "VS - IM 独家FIFA20西班牙", cpmon: 9915, crbon: 2660,…}
        // 6: {pid: 181, pn: "VS FIFA", pon: 4, cid: 17175, cn: "VS - IM 独家FIFA20中国", cpmon: 9911, crbon: 2670,…}
        // 7: {pid: 8, pn: "澳大利亚", pon: 5, cid: 4507, cn: "澳洲女足联赛", cpmon: 50, crbon: 4812, scn: "aozhounvzuliansai",…}
        // 8: {pid: 50, pn: "印度", pon: 6, cid: 14238, cn: "印度曼尼普尔邦联赛杯", cpmon: 9999, crbon: 5030,…}
        // 9: {pid: 25, pn: "阿尔及利亚", pon: 7, cid: 939, cn: "阿尔及利亚预备队甲级职业联赛", cpmon: 6049, crbon: 5435,…}
        // 10: {pid: 61, pn: "以色列", pon: 8, cid: 3720, cn: "以色列足球丙级联赛", cpmon: 4655, crbon: 5440,…}
    ];

    onLoad() {
        this.return.on('click', this.onReturn, this);
    }

    start() {
        AppFacade.getInstance().registerMediator(new DetailsMediator(DetailsMediator.NAME, this));

        AppFacade.getInstance().sendNotification("初始化list视图", this);
        // this.scrollView.node.on("bounce-bottom", this.onDiBu, this);

        // 


    }

    onDiBu() {
        let maxoffset = this.scrollView.getMaxScrollOffset();
        let currentOffset = this.scrollView.getScrollOffset();

        console.log("maxoffset: " + maxoffset);
        console.log("currentOffset: " + currentOffset);

        let WinSize = cc.winSize;
        let targetOffsetY = Math.abs(currentOffset.y - maxoffset.y);
        let offsetPercent = targetOffsetY / WinSize.height;

        if (offsetPercent > 0.15) {
            setTimeout(() => {

                this.list.numItems += 20;// this.data.length;
            }, 1500);
        }
    }


    onDestroy() {
        AppFacade.getInstance().removeMediator(DetailsMediator.NAME);
    }

    private onReturn() {
        AppFacade.getInstance().sendNotification("关闭自己", this);
    }

    onListRender(item: any, index: number) {
        let data = DetailsCom.data[index];
        (item as cc.Node).getComponent(DetailsComItemCom).updatData(data, index);

        console.log(index);
    }

    setListData(data): void {
        this.list.numItems = 4;
    }

    // update (dt) {}
}
