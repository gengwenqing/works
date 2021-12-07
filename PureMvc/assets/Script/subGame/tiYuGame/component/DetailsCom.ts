/**
 * 详情组件
 */

import { timeStamp } from "console";
import List from "../../../frame/pureMvc/tools/List";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import { DetailsMediator } from "../mediator/DetailsMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DetailsCom extends cc.Component {

    @property(cc.Node)
    return: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(List)
    list: List = null;

    onLoad() {
        this.return.on('click', this.onReturn, this);
    }

    start() {
        AppFacade.getInstance().registerMediator(new DetailsMediator(DetailsMediator.NAME, this));

        // AppFacade.getInstance().sendNotification("初始化list视图", this);
        this.scrollView.node.on("bounce-bottom", this.onDiBu, this);
        this.list.numItems = 10;
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

    }

    setListData(data): void {
        this.list.numItems = 4;
    }

    // update (dt) {}
}
