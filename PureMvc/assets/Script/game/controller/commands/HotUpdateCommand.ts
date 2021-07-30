/**
 * 热更控制类
 * @author dk
 * 2021-07-27
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import HotUpdateMsg from "../../../hotUpdate/HotUpdateMsg";
import NotifDefEntry from "../../notifiDef/NotifDefEntry";
import UIManager from "../../utils/UIManager";
import HotUpdateMediator from "../../view/hotUpdate/mediator/HotUpdateMediator";

export default class HotUpdateCommand extends SimpleCommand implements ICommand {


    private hotUpdateMsg: HotUpdateMsg; // 热更新管理器
    /**注册 */
    public register(): void {
        this.facade().registerCommand(NotifDefEntry.UPDATE_PROGRESS, HotUpdateCommand);
        this.facade().registerCommand(NotifDefEntry.CHECK_HOTUPDATE, HotUpdateCommand); //检测热更命令
        UIManager.getInstance().showUI(HotUpdateMediator.NAME);
    }

    public execute(notification: INotification): void {
        switch (notification.getName()) {
            case NotifDefEntry.UPDATE_PROGRESS:
                this.updateProgess(notification.getBody());
                break;
            case NotifDefEntry.CHECK_HOTUPDATE:
                this.checkUpdate();
                break;
            case NotifDefEntry.START_HOTUPDATE:
                this.startUpdate();
                break;
        }
    }

    /**更新进度 */
    private updateProgess(data: any): void {
        this.facade().sendNotification(NotifDefEntry.UPDATE_PROGRESS_VIEW, data);
    }

    /**检测热更方法 */
    private checkUpdate(): void {
        if (!this.hotUpdateMsg) {
            this.hotUpdateMsg = new HotUpdateMsg();
        }
        this.hotUpdateMsg.init();
    }

    /**开始热更 */
    private startUpdate(): void {
        this.hotUpdateMsg.hotUpdate();
    }
}