/**
 * 详情组件
 */

import { timeStamp } from "console";
import List from "../../../frame/pureMvc/tools/List";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import { DetailsMediator } from "../mediator/DetailsMediator";
import TiYuGameProxy from "../model/TiYuGameProxy";
import DetailsItemCom from "./DetailsItemCom";
import SportTitleMenuCom from "./SportTitleMenuCom";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DetailsCom extends cc.Component {

    @property(cc.Node)
    return: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(List)
    list: List = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    sportMenu: cc.Node = null;

    private yikaisiItems = [];


    onLoad() {
        this.return.on('click', this.onReturn, this);
    }

    start() {
        AppFacade.getInstance().registerMediator(new DetailsMediator(DetailsMediator.NAME, this));
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

    initMenu(data) {
        this.sportMenu.getComponent(SportTitleMenuCom).init(data);
    }

    async initItems(titleData, betInfoData, machingNum) {
        // [进行中数据] 
        let data0 = titleData[0]["com"];
        if (data0 && data0.length > 0) {
            // 添加抬头
            let itemTitle = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/DetailsItem");
            let itemCom = itemTitle.getComponent(DetailsItemCom);
            let data = { "cn": "进行中", "titleFlag": "已开赛抬头" };
            data.cn = "进行中(" + machingNum + ")";
            itemCom.updatData(data, 0);
            this.content.addChild(itemTitle);
            this.yikaisiItems = [];
            // [0] 进行中
            for (let i = 0; i < data0.length; i++) {
                let item = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/DetailsItem");
                let itemCom = item.getComponent(DetailsItemCom);
                item["type"] = "已开赛";
                data0[i].titleFlag = "已开赛";
                itemCom.updatData(data0[i], i + 1);
                this.yikaisiItems.push(item);
                this.content.addChild(item);
            }
        }

        // [未开赛数据] 
        let data1 = titleData[1]["com"];
        if (data1 && data1.length > 0) {
            // 添加抬头
            let itemTitle = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/DetailsItem");
            let itemCom = itemTitle.getComponent(DetailsItemCom);
            let data = { "cn": "未开赛", "titleFlag": "未开赛抬头" };
            itemCom.updatData(data, 0);
            this.content.addChild(itemTitle);
            // [0] 进行中
            for (let i = 0; i < 10; i++) {
                let item = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/DetailsItem");
                let itemCom = item.getComponent(DetailsItemCom);
                item["type"] = "未开赛";
                data1[i].titleFlag = "未开赛";
                itemCom.updatData(data1[i], i + 1);
                this.content.addChild(item);
            }
        }

    }

    updateTitle(titleType: string, hideOrShow) {
        let eles = this.content.children;
        if (titleType == "已开赛抬头") {
            let yikaisai = eles.filter(item => item["type"] == "已开赛")
            yikaisai.forEach(element => {
                element.getComponent(DetailsItemCom).showMorn(hideOrShow);
            });
        } else {
            let weikasai = eles.filter(item => item["type"] == "未开赛")
            weikasai.forEach(element => {
                element.getComponent(DetailsItemCom).showMorn(hideOrShow);
            });
        }
    }

    updatePage(pageIndex, betIndex) {
        this.yikaisiItems[betIndex].getComponent(DetailsItemCom).updateBetInfoPage(pageIndex);
    }
}


