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
        if (LineGameCommand.lastGrad == null || grad.comparison(LineGameCommand.lastGrad)) {
            console.log("没有选择, 或者 选择和上次一样 更新lastGrad");
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

                LineGameCommand.lastGrad = null;

            } else {
                console.log("不能消除 ..........更新lastGrad");
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


        // 上一次点击的格子不变,  当前格子变化
        // 从上一次的 格子开始搜索.
        // 上下左右.  

        // 如果是边界,什么也不干.继续下一个下一个方向搜索
        // 如果有值
        //   是目标值,
        //     与目标值相等   return true
        //     与目标值不相等  return  false   
        // 如果没有值,递归查找

        // 如果碰到边界, 什么也不干.

        let curValue = LineGameCommand.mapArr[curGrad.row][curGrad.column];

        let tryGrad: Grad = new Grad;
        let tryValue = null;
        if (curGrad.column == 5) {

        } else {
            // tryLeft
            tryGrad.column = curGrad.column - 1;
            tryGrad.row = curGrad.row;
            tryValue =  LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            if (tryGrad.column < 0) {
                console.log("出左边界了")
            } else {
                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        return tryValue == curValue;
                    }
                } else {
                    this.seach(tryGrad, lastGrad);
                }
            }
        }

        // 试右边
        if (curGrad.column == 0) {

        } else {
            tryGrad.column = curGrad.column + 1;
            tryGrad.row = curGrad.row;
            tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            if (tryGrad.column > 5) {
                console.log("出右边界了")
            } else {
                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        return tryValue == curValue;
                    }
                } else {
                    this.seach(tryGrad, lastGrad);
                }
            }
        }

        // 试上, 列不变, 行 -1
        if (curGrad.row == 10) {
            // 下边界, 不在做向上尝试, 这样不会造成反复循环
        } else {
            tryGrad.column = curGrad.column;
            tryGrad.row = curGrad.row - 1;
            tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            if (tryGrad.column < 0) {
                console.log("出上边界了");
            } else {
                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        return tryValue == curValue;
                    }
                } else {
                    this.seach(tryGrad, lastGrad);
                }
            }
        }

        if (curGrad.row == 0) {
            // 上边界了, 不做向下尝试,  之所以能到上边界, 都是尝试的结果.
        } else {
            // 试下, 列不变, 行+1
            tryGrad.column = curGrad.column;
            tryGrad.row = curGrad.row + 1;
            tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            if (tryGrad.column > 10) {
                console.log("出下边界了");
            } else {
                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        return tryValue == curValue;
                    }
                } else {
                    this.seach(tryGrad, lastGrad);
                }
            }
        }

    }

    /**
     * 
     * @param curGard 
     * @param lastGrad 
     * @returns 
     */
    private serch1(curGard: Grad, lastGrad: Grad): boolean {

        // 当前格子的上 下 左 右 值
        let UpValue, DownValue, LeftValue, RightValue;
        // left
        UpValue = curGard.column == 0 ? -1 : LineGameCommand.mapArr[curGard.row][curGard.column - 1];
        DownValue = curGard.column == 11 ? -1 : LineGameCommand.mapArr[curGard.row][curGard.column + 1];
        LeftValue = curGard.row == 0 ? -1 : LineGameCommand.mapArr[curGard.row - 1][curGard.column];
        RightValue = curGard.row == 5 ? -1 : LineGameCommand.mapArr[curGard.row + 1][curGard.column];

        let isFind = false;
        if (UpValue >= 0) {
            if (curGard.column == lastGrad.column && curGard.row == lastGrad.row) {
                isFind = true;
            }
        }

        if (DownValue >= 0) {
            if (curGard.column == lastGrad.column && curGard.row == lastGrad.row) {
                isFind = true;
            }
        }

        if (LeftValue >= 0) {
            if (curGard.column == lastGrad.column && curGard.row == lastGrad.row) {
                isFind = true;
            }
        }

        if (RightValue >= 0) {
            if (curGard.column == lastGrad.column && curGard.row == lastGrad.row) {
                isFind = true;
            }
        }

        if (isFind) {
            return true;
        } else {
            this.serch1()
        }
    }


}
