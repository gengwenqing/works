/**
 * 连线游戏  mediator 层
 * 管理, 皮肤和
 * 中阶层, 皮肤 和  逻辑 数据的中间层
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import BGCom from "../component/BGCom";
import Grad from "../component/Grad";
import LineGameCommand from "../controller/LineGameCommand";
import LineGameProxy from "../model/LineGameProxy";
import { LineGameVo } from "../model/vo/LineGameVo";

export class BGMediator extends Mediator {

    public static NAME = "BGMediator";

    viewComponent: BGCom;
    gradArr = [];
    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
            "创建格子",
            "消除方块",
            "画线特效",
        ];
    }

    /**处理事件监听 */
    public handleNotification(notification: INotification): void {
        let data = notification.getBody();
        switch (notification.getName()) {
            case "创建格子":
                this.createGrad();
                break;
            case "消除方块":
                this.clearGrad(data["tryGrads"], data["curGrad"], data["lastGrad"]);
                break;

        }
    }

    private async createGrad() {
        let proxy: LineGameProxy = this.facade().retrieveProxy(LineGameProxy.NAME) as LineGameProxy;
        let map = (proxy.getData() as LineGameVo).mapArr;

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 6; j++) {
                let ele = map[i][j];
                let gard = await UIManager.getInstance().createPrefab("Prefabs/lineGamePrefabs/Grad");
                let gardCom = gard.getComponent(Grad);
                gardCom.setType(ele);
                gardCom.setCowAndCloumn(i, j);
                this.viewComponent.node.addChild(gard);
                this.gradArr.push(gard);
            }
        }
    }
    /**注册的时候被调用 */
    public onRegister() {
        console.log(BGMediator.NAME + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        // console.log(LobbyMediator.NAME + "中介类被删除");
    }

    private clearGrad(tryGrads: Grad[], curGard: Grad, lastGrad: Grad): void {

        this.drawLine(tryGrads);

        let proxy: LineGameProxy = this.facade().retrieveProxy(LineGameProxy.NAME) as LineGameProxy;
        let map = (proxy.getData() as LineGameVo).mapArr;

        let type = map[curGard.row][curGard.column];
        for (let i = 0; i < this.gradArr.length; i++) {
            let node = this.gradArr[i] as cc.Node;
            let com = node.getComponent(Grad);
            if (com.row == curGard.row && com.column == curGard.column) {
                com.setType(type);
            }
        }
        type = map[lastGrad.row][lastGrad.column];
        for (let i = 0; i < this.gradArr.length; i++) {
            let node = this.gradArr[i] as cc.Node;
            let com = node.getComponent(Grad);
            if (com.row == lastGrad.row && com.column == lastGrad.column) {
                com.setType(type);
            }
        }

        // LineGameVo.lastGrad = null;
    }

    private drawLine(data: Grad[]) {
        for (let i = 0; i < data.length; i++) {
            for(let j =0; j < this.gradArr.length; j ++){
                let gardCom:Grad = this.gradArr[j].getComponent(Grad);
                if(gardCom.comparison(data[i])){
                    gardCom.blink();
                }
            }
        }
    }
}