/**
 * 雪人兄弟的命令类
 * @author dk
 * 2021-09-24
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import UIManager from "../../utils/UIManager";

export default class SnowGameCommand extends SimpleCommand implements ICommand {
    public constructor() {
        super();
    }

    public static NAME: string = 'SnowGameCommand';

    /**
     * 注册消息
     */
    public register(): void {
        UIManager.getInstance().showUI("SnowGame");
    }

    public execute(notification: INotification): void {
       
    }
}