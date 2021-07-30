
/**
 * 热更 视图中介类
 * @author dk
 * 2021-07-27
 */

import INotification from "../../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../../frame/pureMvc/patterns/mediator/Mediator";
import NotifDefEntry from "../../../notifiDef/NotifDefEntry";
import LobbyCom from "../component/LobbyCom";


export default class LobbyMediator extends Mediator {
    /**名称 */
    public static NAME: string = "LobbyMediator";

    /**组件 */
    public viewComponent: LobbyCom;

    public constructor(viewComponent: LobbyCom) {
        super(LobbyMediator.NAME, viewComponent);
    }

    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
        ];
    }

    /**处理事件监听 */
    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotifDefEntry.UPDATE_PROGRESS_VIEW:
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        console.log(LobbyMediator.NAME + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log(LobbyMediator.NAME + "中介类被删除");
    }

}