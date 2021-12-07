/**
 * 连线游戏 
 * 逻辑控制
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import Grad from "../component/Grad";
import LineGameProxy from "../model/LineGameProxy";
import { LineGameVo } from "../model/vo/LineGameVo";

export default class LineGameCommand extends SimpleCommand implements ICommand {


    public static lastGrad: Grad = null;
    public static mapArr = [];

    register() {
        AppFacade.getInstance().registerCommand("开始连线游戏", LineGameCommand);
        AppFacade.getInstance().registerCommand("运行场景", LineGameCommand);
        AppFacade.getInstance().registerCommand("被点击了", LineGameCommand);

        this.facade().sendNotification("运行场景");
    }
    /**
     * 命令执行
     * @param notification 
     */
    execute(notification: INotification): void {

        /**
         * 用户指令, 
         * 1 第一次点击
         * 2 第二次点击
         * 3 开始连线游戏
         */
        switch (notification.getName()) {
            case "运行场景":
                cc.director.loadScene("lineGame");
                break;
            case "开始连线游戏":
                this.gameStart(notification.getBody());
                break;
            case "被点击了":
                this.gradClicked(notification.getBody());
                break;
        }
    }
    /**
     * 游戏开始
     * 1 创建背景
     * 2 创建格子,
     * 
     * 创建背景, 直接创建bg prefab 到 主canvas上.
     * 
     */
    private async gameStart(addLay: cc.Node) {
        // 创建数据
        let proxy: LineGameProxy = this.facade().retrieveProxy(LineGameProxy.NAME) as LineGameProxy;
        proxy.createMapData();
        LineGameCommand.mapArr = (proxy.getData() as LineGameVo).mapArr;

        // 创建背景
        let bg = await UIManager.getInstance().createPrefab("Prefabs/lineGamePrefabs/Bg");
        addLay.addChild(bg);
    }

    /**
     * 格子被点击了
     */
    private gradClicked(grad: Grad): void {
        console.log("进入判定..........")
        // 判断有没有前置选择
        if (LineGameCommand.lastGrad == null) {
            console.log("更新lastGrad");
            LineGameCommand.lastGrad = grad;
        } else {
            if (this.seach(grad, LineGameCommand.lastGrad)) { // 如果能消除

                console.log("消除方块");
                LineGameCommand.mapArr[grad.row][grad.column] = -1;
                LineGameCommand.mapArr[LineGameCommand.lastGrad.row][LineGameCommand.lastGrad.column] = -1;

                let proxy = this.facade().retrieveProxy(LineGameProxy.NAME) as LineGameProxy;
                (proxy.getData() as LineGameVo).mapArr = LineGameCommand.mapArr;

                // 执行消除逻辑
                this.sendNotification("消除方块", { curGrad: grad, lastGrad: LineGameCommand.lastGrad });

            } else {
                console.log("更新lastGrad");
                LineGameCommand.lastGrad = grad; // 当前选择更新为上一次选择
            }
        }
    }

    /**
     * 寻找当前格子 与 上一次格子之间是否可以有空位连线
     * 
     * @param curGard 
     * @param lastGrad 
     * @returns 
     */
    private seach(curGrad: Grad, lastGrad: Grad): boolean {

        //停止条件
        //1) 上下左右都没有检测完毕,不能通过
        //2) 到了边界了.
        //3) 
        return false;
    }


}
