/**
 * tank游戏 命令类
 */

import { TcpNetConnectOpts } from "net";
import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import TankGameProxy from "../model/TankGameProxy";
import { TankGameVo } from "../model/vo/TankGameVo";

export default class TankGameCommand extends SimpleCommand implements ICommand {

    register() {
        AppFacade.getInstance().registerCommand("运行场景", TankGameCommand);
        AppFacade.getInstance().registerCommand("开始游戏", TankGameCommand);
        this.facade().sendNotification("运行场景");
    }
    /**
     * 命令执行
     * @param notification  
     */
    async execute(notification: INotification): Promise<void> {
        switch (notification.getName()) {
            case "运行场景":
                cc.director.loadScene("tankGame");
                break;
            case "开始游戏":
                this.gameStart(notification.getBody());
                break;
        }
    }

    private gameStart(data) {
        UIManager.UIPopLayer = data;
        // 添加地图
        this.sendNotification("添加地图");
        // 初始化敌人
        // this.sendNotification("初始化敌人");
        // // 初始化自己
        // this.sendNotification("初始化自己");
    }

}