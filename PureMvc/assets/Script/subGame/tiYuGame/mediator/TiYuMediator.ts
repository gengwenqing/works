/**
 * 体育视图中介
 */
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import TiYuGameMsg from "../TiYuGameMsg";

export default class TiYuMediator extends Mediator {

    viewComponent: TiYuGameMsg;

    static NAME = "TiYuMediator"
    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
            "添加大厅",
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "添加大厅":
                let lobby = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/Lobby");
                // (body as cc.Node).addChild(lobby);

                UIManager.UIPopLayer.addChild(lobby);
                break;
        }
    }
}
