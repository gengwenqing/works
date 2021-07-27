/**
 * 热更控制类
 * @author dk
 * 2021-07-27
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import NotifDefEntry from "../../notifiDef/NotifDefEntry";

export default class HotUpdateCommand extends SimpleCommand implements ICommand {

    /**注册 */
    public register(): void {
        this.facade().registerCommand(NotifDefEntry.UPDATE_PROGRESS, HotUpdateCommand);
    }

    public execute(notification: INotification): void {
        switch (notification.getName()) {
            case NotifDefEntry.UPDATE_PROGRESS:
                this.updateProgess(notification.getBody());
                break;
        }
    }

    private updateProgess(data:any):void{
        this.facade().sendNotification(NotifDefEntry.UPDATE_PROGRESS_VIEW, data);
    }
}