import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import ItemInfoCom from "../component/ItemInfoCom";


/**
 * 体育控制器
 */
export default class TiYuGameCommand extends SimpleCommand implements ICommand {


    register() {
        AppFacade.getInstance().registerCommand("运行场景", TiYuGameCommand);

        AppFacade.getInstance().registerCommand("详情item被点击", TiYuGameCommand);
        AppFacade.getInstance().registerCommand("品类item被点击", TiYuGameCommand);

        AppFacade.getInstance().registerCommand("打开详情界面", TiYuGameCommand);

        this.facade().sendNotification("运行场景");
    }

    execute(notification: INotification): void {

        /**
         * 用户指令, 
         * 1 第一次点击
         * 2 第二次点击
         * 3 开始连线游戏
         */

        let body = notification.getBody();
        switch (notification.getName()) {
            case "运行场景":
                cc.director.loadScene("tiyuGame");
                break;
            case "详情item被点击":
                let data = [];
                this.facade().sendNotification("打开详情界面", data);
                break;
            case "品类item被点击":
                cc.director.loadScene("tiyuGame");
                break;

            case "打开详情界面":
                UIManager.getInstance().showUI("tiyuGame/prefabs/Details")
                break;
        }
    }
}