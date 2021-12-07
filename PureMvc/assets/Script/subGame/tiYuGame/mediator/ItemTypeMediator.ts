/**
 * 品类详情组件
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";

export class ItemTypeMediator extends Mediator {

    static NAME = "ItemTypeMediator";

    public listNotificationInterests(): string[] {
        return [
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "设置格子样式":
  
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