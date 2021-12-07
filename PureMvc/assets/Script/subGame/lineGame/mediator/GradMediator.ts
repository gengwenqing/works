/**
 * 连线游戏  mediator 层
 * 管理, 皮肤和
 * 中阶层, 皮肤 和  逻辑 数据的中间层
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import Grad from "../component/Grad";

export class GradMediator extends Mediator {

    viewComponent: Grad;
    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "设置格子样式":
                let node = await UIManager.getInstance().createPrefab("Prefabs/lineGamePrefabs/item");
                this.viewComponent.setType(body.type);
                this.viewComponent.setCowAndCloumn(body.row, body.column);
                body.bg.addChild(node);
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        // console.log(LobbyMediator.NAME + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        // console.log(LobbyMediator.NAME + "中介类被删除");
    }
}