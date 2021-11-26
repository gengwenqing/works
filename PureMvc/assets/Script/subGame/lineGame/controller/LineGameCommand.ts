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



    private lastGrad: Grad = null;
    private mapArr = [];
    register() {
        AppFacade.getInstance().registerCommand("开始连线游戏", LineGameCommand);
        AppFacade.getInstance().registerCommand("第一次点击", LineGameCommand);
        AppFacade.getInstance().registerCommand("第二次点击", LineGameCommand);
        AppFacade.getInstance().registerCommand("运行场景", LineGameCommand);

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
        this.mapArr = (proxy.getData() as LineGameVo).mapArr;

        // 创建背景
        let bg = await UIManager.getInstance().createPrefab("Prefabs/lineGamePrefabs/Bg");
        addLay.addChild(bg);
    }

    /**
     * 格子被点击了
     */
    private gradClicked(grad: Grad): void {
        // 判断有没有前置选择
        if (this.lastGrad == null) {
            this.lastGrad = grad;
        } else {
            if (this.isCanLine(grad, this.lastGrad)) { // 如果能消除
                // 执行消除逻辑
                this.sendNotification("消除方块", { curPos: grad, lastPos: this.lastGrad });
            } else {
                this.lastGrad = grad; // 当前选择更新为上一次选择
            }
        }
    }

    /**
     * 是否能连线判断
     */
    private isCanLine(curGard: Grad, lastGrad: Grad): boolean {

        // 判断当前位置的值,是否和上一次相同,

        // 循环遍历 数组值, 目标值 与上一次值, 之间的坐标对比, 

        //1 确定方向,  上下左右, 下标 对比,
        //2 搜索优先, 以列优先搜索. 
        //3 判断是否 搜索index 是否能到, 目标值, 循环结束,或者中途如果相同(那么能连线, 否则不能连线.), 如果循环结束未相等,那么不能连线


        let rowDir = false; //行方向
        let columnDir = false; //, 列方向
        let stepCount = 0; // 
        while (true) {

            // 算方向
            rowDir = (curGard.row - lastGrad.row) > 0;
            columnDir = (curGard.column - lastGrad.column) > 0;

            // 算步骤
            stepCount = Math.abs(curGard.row - lastGrad.row);

            // 移动步伐
            // 优先列
            let curColumn = curGard.column;
            if (columnDir) { // 当前往右,
                curColumn++;
                if (this.mapArr[curGard.row][curColumn] > 0) { // 有障碍
                    // 停止 列移动
                } else {
                    curColumn++;
                }
            } else {
                curColumn--;
            }

            // 移动的 停止,  
            //              1 到达目标值,  相同
            //              2 在中途死路  
        }


        return false;
    }

    private move(curGard: Grad, lastGrad: Grad): boolean {

        // 下标 指定A
        // 值是空, 则赋值 curGard 为 下一个下标,

        // 以当前A为当前值,开始 寻找, 

        // 下标指定F 判定 是否能右移 是否能上移,
        // 因为下标为F的右移动的的结果 ,不是0
        // 那么 开始行移动, 因为 curGard的行, 于目标Gard的差距为负数, 那么向上,  向上也是0 则重置当前B 开始 try左右,try上下

        // 先以B为目标,try左右,因为B的坐标在做, 所以向右try, 发现 D和当前值相等, 停止移动, 返回结果.
        // 以B为目标 ......................                发现 C与当前值, 并且是点击的格子. 说明,可以连线, 但是因为值不同, 
        // A为F发现,try左右, 不行, 并且try上下也不行, 那么认为 死路了. 


        // 1 tye左右
        //   如果可以, 则赋值当前节点为为最新节点
        //   如果不可以,  那么try上下,
        //               如果可以,  则赋值try节点,为当前节点.  继续move
        // 如果 try左右, 和 try上下都不行,  那么死路了. 得出结果 不可以连线.
        // 如果,try的节点 和 目标节点相同了,  得出结果,  是否可以连线. 

        //

        // try左右 如果相同, 那么什么也不做,  继续try 上下
        let tryColumn = curGard.column;
        if (curGard.column - lastGrad.column > 0) {
            // ++
            tryColumn++;
        } else if (curGard.column - lastGrad.column > 0) {
            // --
            tryColumn--;
        }else{ // 行相同
            if()
        }

        let tryRow = curGard.row;

        if (this.mapArr[curGard.row][tryColumn] > 0) { // 格子有值, 

            if (this.mapArr[lastGrad.column][lastGrad.column] == this.mapArr[curGard.row][tryColumn]) { // 相同了
                return true;
            } else {
                // try上下
                if (curGard.row - lastGrad.row > 0) {
                    // ++
                    tryRow--;
                } else if (curGard.row - lastGrad.row > 0) {
                    // --
                    tryColumn--;
                }
            }
        } else { // 格子没值,  把try的更新为cur, 继续 下一次试
            curGard.row =
                this.move()
        }
    }


}
