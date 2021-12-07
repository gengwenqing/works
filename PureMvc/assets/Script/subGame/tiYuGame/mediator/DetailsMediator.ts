/**
 * 品类详情组件
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";

export class DetailsMediator extends Mediator {

    static NAME = "DetailsMediator";

    public listNotificationInterests(): string[] {
        return [
            "关闭自己"
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "关闭自己":
                {
                    UIManager.getInstance().closeUI(DetailsMediator.NAME);
                }
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        console.log(DetailsMediator.NAME + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log(DetailsMediator.NAME + "中介类被删除");
    }
}