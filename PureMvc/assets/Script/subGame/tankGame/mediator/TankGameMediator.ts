
/**
 * 地圖map的视图中介
 */
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import TankMap from "../componnent/TankMap";
import TankGameManager from "../TankGameManager";


export class TankGameMediator extends Mediator {
    public static NAME = "TankGameMediator";

    viewComponent: TankGameManager;

    public listNotificationInterests(): string[] {
        return [
            "添加地图",
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification): Promise<void> {
        let data = notification.getBody();
        switch (notification.getName()) {
            case "添加地图":
                console.log("添加地图")
                let node = await UIManager.getInstance().createPrefab("Prefabs/tankGamePrefabs/TankMap");
                UIManager.UIPopLayer.addChild(node);
                break;

        }
    }

    onRegister(){
        console.log("场景管理被注册");
    }
}