
/**
 * 热更 视图中介类
 * @author dk
 * 2021-07-27
 */
import INotification from "../../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../../frame/pureMvc/patterns/mediator/Mediator";
import NotifDefEntry from "../../../notifiDef/NotifDefEntry";
import HotUpdate from "../component/HotUpdate";

export default class HotUpdateMediator extends Mediator {
    /**名称 */
    public static NAME: string = "HotUpdateMediator";

    /**组件 */
    public viewComponent: HotUpdate;

    public constructor(viewComponent: HotUpdate) {
        super(HotUpdateMediator.NAME, viewComponent);
    }

    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
            NotifDefEntry.UPDATE_PROGRESS_VIEW
        ];
    }

    /**处理事件监听 */
    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotifDefEntry.UPDATE_PROGRESS_VIEW:
                // this.viewComponent.setNickName(notification.getBody());
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        console.log("############### MVC" + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log("############### MVC" + "中介类被删除");
    }

}