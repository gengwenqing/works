
/**
 * 热更 视图中介类
 * @author dk
 * 2021-07-27
 */
import INotification from "../../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../../frame/pureMvc/patterns/mediator/Mediator";
import NotifDefEntry from "../../../notifiDef/NotifDefEntry";
import HotUpdateCom from "../component/HotUpdateCom";

export default class HotUpdateMediator extends Mediator {
    /**名称 */
    public static NAME: string = "HotUpdateMediator";

    /**组件 */
    public viewComponent: HotUpdateCom;

    public constructor(viewComponent: HotUpdateCom) {
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
                this.viewComponent.setProgress(notification.getBody());
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        console.log("____________________ 热更中介被注册");
        console.log("____________________viewComponent" +  this.viewComponent);
        console.log("____________________btnCheckUpdate" +  this.viewComponent.btnCheckUpdate);
        console.log("____________________btnUpdate" +  this.viewComponent.btnUpdate);
        this.viewComponent.btnCheckUpdate.on("click",this.onCheckUpdate,this);
        this.viewComponent.btnUpdate.on("click",this.onUpdate,this);
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log(HotUpdateMediator.NAME + "中介类被删除");
    }

    private onCheckUpdate():void{
        this.sendNotification(NotifDefEntry.CHECK_HOTUPDATE);
    }

    private onUpdate():void{
        this.sendNotification(NotifDefEntry.START_HOTUPDATE);
    }

}