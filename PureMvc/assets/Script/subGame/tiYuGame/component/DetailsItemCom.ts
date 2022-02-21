/**
 * 详情组件
 */

import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import TiYuGameProxy from "../model/TiYuGameProxy";
import { TiYuGameVo } from "../model/vo/TiYuGameVo";
import BetInfoItemCom from "./BetInfoItemCom";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DetailsItemCom extends cc.Component {

    @property(cc.Node)
    btnMorn: cc.Node = null;
    // 投注详情的添加层
    @property(cc.Node)
    betInfoLayer: cc.Node = null;

    @property(cc.RichText)
    title: cc.RichText = null;

    @property(cc.Node)
    star: cc.Node = null;

    @property(cc.Node)
    line: cc.Node = null;

    @property(cc.SpriteFrame)
    macths: cc.SpriteFrame[] = [];

    //是否展开的变量值
    public isMorn: boolean = true;
    //序列号
    private _index: number;
    // 该列的列数据
    public data: object;
    // 是否是抬头
    private titleFlag: string = "jinxingzhong";

    onLoad() {

    }

    start() {
    }

    onMorn() {
        console.log("item变化前的高度" + this.node.height);
        this.isMorn = !this.isMorn;

        if (this.titleFlag == "已开赛抬头" || this.titleFlag == "未开赛抬头") {
            let obj = { "type": this.titleFlag, "hideOrShow": this.isMorn };
            AppFacade.getInstance().sendNotification("抬头缩放展开", obj);
        } else {
            this._updateMorn();
        }
    }

    public updatData(data, index) {
        //{pid: 21, pn: "世界", pon: 1, cid: 785, cn: "俱乐部友谊赛", cpmon: 470, crbon: 600, scn: "julebuyouyisai",…}
        this.data = data;
        this.title.string = data.cn;
        this._index = index;
        this.titleFlag = data.titleFlag;
        // this.isMorn = isMorn;
        // this._updateMorn();


        let proxy: TiYuGameProxy = AppFacade.getInstance().retrieveProxy(TiYuGameProxy.NAME) as TiYuGameProxy;
        let bData = proxy.getBetInfoByCid(data.cid);
        this.initBetInfo(bData,index);
    }

    update() {

        if (this.node.height != this.node.height) {
            console.log(".............." + this.node.height);
        }
    }

    _updateMorn() {
        this.btnMorn.rotation = this.isMorn ? 270 : 180;
        this.betInfoLayer.active = this.isMorn;
        this.node.height = this.isMorn ? this.betInfoLayer.childrenCount * 260 + 55 : 55;
        this.betInfoLayer.getComponent(cc.Layout).updateLayout();
        console.log("item变化后的高度:" + this.node.height);
    }

    onDestroy() {
        console.log("item被删除", this._index);
        this._index = -1;
        this.isMorn = false;
    }

    showMorn(isMorn) {
        this.isMorn = isMorn;
        this._updateMorn();
    }

    //初始化投注信息
    async initBetInfo(data,index) {
        if (data.length > 0 && data) {
            for (let i = 0; i < data.length; i++) {
                let betInfo = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/BetInfoItem");
                let com = betInfo.getComponent(BetInfoItemCom);
                com.setInfo(data[i],index);
                com.setTitleVisible(i == 0);
                this.betInfoLayer.addChild(betInfo);
            }
        } else {
            this.isMorn = false;
        }
        if (this.titleFlag == "已开赛抬头" || this.titleFlag == "未开赛抬头") {
            this.star.active = true;

            this.isMorn = true;
            if (this.titleFlag == "已开赛抬头") {
                this.star.getComponent(cc.Sprite).spriteFrame = this.macths[0];

            } else if (this.titleFlag == "未开赛抬头") {
                this.line.color = new cc.Color(255, 181, 174);
                this.star.getComponent(cc.Sprite).spriteFrame = this.macths[1];
            }
        } else {
            this.star.active = false;
            let widget = this.title.getComponent(cc.Widget);
            widget.left = 10;
            widget.updateAlignment();
        }
        this._updateMorn();
       
    }





}
