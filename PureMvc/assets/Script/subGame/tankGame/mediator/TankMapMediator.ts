
/**
 * 地图中介
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import Tank from "../componnent/Tank";
import TankGrad from "../componnent/TankGrad";
import TankMap from "../componnent/TankMap";
import TankGameProxy from "../model/TankGameProxy";
import { TankGameVo } from "../model/vo/TankGameVo";

export class TankMapMediator extends Mediator {
    public static NAME = "TankMapMediator";
    viewComponent: TankMap;
    public listNotificationInterests(): string[] {
        return [
            "添加格子",
            "添加坦克"
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification): Promise<void> {
        let data = notification.getBody();
        switch (notification.getName()) {
            case "添加格子":
                console.log("添加格子");
                let proxy: TankGameProxy = this.facade().retrieveProxy(TankGameProxy.NAME) as TankGameProxy;
                proxy.createMap();
                let mapArr = (proxy.getData() as TankGameVo).mapArr;
                let count = 0;
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 13; j++) {
                        console.log("i j", i, j);
                        const ele = mapArr[i][j];
                        let node = await UIManager.getInstance().createPrefab("Prefabs/tankGamePrefabs/TankGrad");
                        this.viewComponent.gradsContainer.addChild(node);
                        node.getComponent(TankGrad).setData(ele, i, j);
                        count++;
                    }
                }
                break;
            case "添加坦克":
                let node = await UIManager.getInstance().createPrefab("Prefabs/tankGamePrefabs/Tank");
                this.viewComponent.tankLayer.addChild(node);
                node.getComponent(Tank).init(100, "Tank_Hero");
                break;

        }
    }

    onRegister() {
        console.log("添加个格子");
        this.facade().sendNotification("添加格子");
        this.facade().sendNotification("添加坦克");
    }
}