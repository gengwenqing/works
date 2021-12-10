/**
 * 连线游戏 
 * 逻辑控制
 */

import { dir } from "console";
import { Dir } from "fs";
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


    private clickGrad: Grad;
    /**
     * 格子被点击了
     */
    private async gradClicked(grad: Grad) {
        // 判断有没有前置选择
        if (LineGameCommand.lastGrad == null || grad.comparison(LineGameCommand.lastGrad)) {
            console.log("没有选择, 或者 选择和上次一样 更新lastGrad");
            LineGameCommand.lastGrad = grad;
        } else {
            this.clickGrad = grad;
            this.tryGrads = [];
            this.tryGrads.push(this.clickGrad)
            let bool = this.searchFrist(grad, LineGameCommand.lastGrad, -1);
            console.log("寻找结果:" + bool);
            if (bool) { // 如果能消除

                this.tryGrads.splice(0, 0, this.clickGrad);
                this.tryGrads.push(LineGameCommand.lastGrad);
                console.log("消除方块");
                LineGameCommand.mapArr[grad.row][grad.column] = -1;
                LineGameCommand.mapArr[LineGameCommand.lastGrad.row][LineGameCommand.lastGrad.column] = -1;

                let proxy = this.facade().retrieveProxy(LineGameProxy.NAME) as LineGameProxy;
                (proxy.getData() as LineGameVo).mapArr = LineGameCommand.mapArr;

                // 执行消除逻辑
                this.sendNotification("消除方块", { tryGrads: this.tryGrads, curGrad: grad, lastGrad: LineGameCommand.lastGrad });

                LineGameCommand.lastGrad = null;

            } else {
                console.log("不能消除 ..........更新lastGrad");
                LineGameCommand.lastGrad = null; // 当前选择更新为上一次选择
            }
        }
    }



    private tryDir(curGrad: Grad, lastGrad, fromDir: DIR): boolean {
        // 尝试优先级方向的查找
        let tryGrad: Grad = new Grad;
        switch (fromDir) {
            case DIR.UP:
                tryGrad.column = curGrad.column;
                tryGrad.row = curGrad.row - 1;
                break;
            case DIR.DOWN:
                tryGrad.column = curGrad.column;
                tryGrad.row = curGrad.row + 1;
                break;
            case DIR.LEFT:
                tryGrad.column = curGrad.column - 1;
                tryGrad.row = curGrad.row;
                break;
            case DIR.RIGHT:
                tryGrad.column = curGrad.column + 1;
                tryGrad.row = curGrad.row;
                break;
        }

        console.log("tryGrad + row __________ ", tryGrad.row);
        console.log("tryGrad + column __________ ", tryGrad.column);
        if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
            console.log("出界了");
        } else {
            this.tryGrads.push(tryGrad);
            let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];
            if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                console.log("查询到了原点,  所有的空格都尝试了. ")
                return false;
            }
            if (tryValue >= 0) {
                if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                    console.log("到达目标值了:(*^▽^*)")
                    let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                    if (clickValue == lastValue) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return this.searchFrist(tryGrad, lastGrad, fromDir);
            }
        }
    }
    private tryGrads: Grad[] = [];

    private searchFrist(curGrad: Grad, lastGrad: Grad, lastDir: DIR): boolean {

        console.log("进入寻找函数:");
        console.log("curGrad + row __________ ", curGrad.row);
        console.log("curGrad + column __________ ", curGrad.column);

        // 当前的列和上次选定的 列 差 小于 <0; 证明 当前点击的按钮在 ,上一次的左边, ,
        // 所以优先方向是,向右尝试
        // 否则,  向左尝试
        // 如果列相同,(则优先 上下. 优先上下规则, 看 row的差值)
        let fristDir = -1;
        if (curGrad.column - lastGrad.column < 0 && lastDir != DIR.LEFT) {
            fristDir = DIR.RIGHT;
        }
        if (curGrad.column - lastGrad.column > 0 && lastDir != DIR.RIGHT) {
            fristDir = DIR.LEFT
        }
        if (curGrad.row - lastGrad.row < 0 && lastDir != DIR.UP) {
            fristDir = DIR.DOWN;
        }
        if (curGrad.row - lastGrad.row > 0 && lastDir != DIR.DOWN) {
            fristDir = DIR.UP;
        }
        // 优先搜索方向, 不能是来的方向.

        if (fristDir < 0) {
            return true;
            // 没有优先方向的话, 证明 点的格子和当前格子一样.
        }

        // 尝试优先级 ------------------------------------------------
        let tryGrad: Grad = new Grad;
        switch (fristDir) {
            case DIR.UP:
                tryGrad.column = curGrad.column;
                tryGrad.row = curGrad.row - 1;
                console.log("优先查找方向:_____________" + "        上");
                break;
            case DIR.DOWN:
                tryGrad.column = curGrad.column;
                tryGrad.row = curGrad.row + 1;
                console.log("优先查找方向:_____________" + "        下");
                break;
            case DIR.LEFT:
                tryGrad.column = curGrad.column - 1;
                tryGrad.row = curGrad.row;
                console.log("优先查找方向:_____________" + "        左");
                break;
            case DIR.RIGHT:
                tryGrad.column = curGrad.column + 1;
                console.log("优先查找方向:_____________" + "        右");
                tryGrad.row = curGrad.row;
                break;
        }


        console.log("tryGrad + row __________ ", tryGrad.row);
        console.log("tryGrad + column __________ ", tryGrad.column);
        if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
            console.log("出界了");
        } else {
            this.tryGrads.push(tryGrad);
            let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
            let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];
            if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                console.log("查询到了原点,  所有的空格都尝试了. ")
                return false;
            }
            if (tryValue >= 0) {
                if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                    console.log("到达目标值了:(*^▽^*)")
                    let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                    if (clickValue == lastValue) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return this.searchFrist(tryGrad, lastGrad, fristDir);
            }
        }
        // 尝试优先级 ------------------------------------------------

        // 尝试上
        let tryDir = 0;
        if (lastDir != DIR.DOWN && fristDir != DIR.UP) {
            console.log("尝试上/////////////////////");
            switch (tryDir) {
                case DIR.UP:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row - 1;
                    break;
                case DIR.DOWN:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row + 1;
                    break;
                case DIR.LEFT:
                    tryGrad.column = curGrad.column - 1;
                    tryGrad.row = curGrad.row;
                    break;
                case DIR.RIGHT:
                    tryGrad.column = curGrad.column + 1;
                    tryGrad.row = curGrad.row;
                    break;
            }
            if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
                console.log("出界了");
            } else {
                this.tryGrads.push(tryGrad);

                let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
                let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];

                if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                    console.log("查询到了原点,  所有的空格都尝试了. ")
                    return false;
                }
                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        console.log("到达目标值了:(*^▽^*)")
                        let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                        if (clickValue == lastValue) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return this.searchFrist(tryGrad, lastGrad, tryDir);
                }
            }
        }

        // 尝试下
        tryDir = 1;
        if (lastDir != DIR.UP && fristDir != DIR.DOWN) {
            console.log("尝试下/////////////////////");
            switch (tryDir) {
                case DIR.UP:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row - 1;
                    break;
                case DIR.DOWN:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row + 1;
                    break;
                case DIR.LEFT:
                    tryGrad.column = curGrad.column - 1;
                    tryGrad.row = curGrad.row;
                    break;
                case DIR.RIGHT:
                    tryGrad.column = curGrad.column + 1;
                    tryGrad.row = curGrad.row;
                    break;
            }
            if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
                console.log("出界了");
            } else {
                this.tryGrads.push(tryGrad);
                let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
                let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];

                if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                    console.log("查询到了原点,  所有的空格都尝试了. ")
                    return false;
                }

                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        console.log("到达目标值了:(*^▽^*)")
                        let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                        if (clickValue == lastValue) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return this.searchFrist(tryGrad, lastGrad, tryDir);
                }
            }
        }

        tryDir = 2;
        // 尝试左
        if (lastDir != DIR.RIGHT && fristDir != DIR.LEFT) {

            console.log("尝试左/////////////////////");
            switch (tryDir) {
                case DIR.UP:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row - 1;
                    break;
                case DIR.DOWN:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row + 1;
                    break;
                case DIR.LEFT:
                    tryGrad.column = curGrad.column - 1;
                    tryGrad.row = curGrad.row;
                    break;
                case DIR.RIGHT:
                    tryGrad.column = curGrad.column + 1;
                    tryGrad.row = curGrad.row;
                    break;
            }
            if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
                console.log("出界了");
            } else {
                this.tryGrads.push(tryGrad);
                let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
                let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];

                if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                    console.log("查询到了原点,  所有的空格都尝试了. ")
                    return false;
                }

                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        console.log("到达目标值了:(*^▽^*)")
                        let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                        if (clickValue == lastValue) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return this.searchFrist(tryGrad, lastGrad, tryDir);
                }
            }
        }
    
        // 尝试右
        tryDir = 3;
        if (lastDir != DIR.LEFT || fristDir != DIR.RIGHT) {
            console.log("尝试右/////////////////////");
            switch (tryDir) {
                case DIR.UP:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row - 1;
                    break;
                case DIR.DOWN:
                    tryGrad.column = curGrad.column;
                    tryGrad.row = curGrad.row + 1;
                    break;
                case DIR.LEFT:
                    tryGrad.column = curGrad.column - 1;
                    tryGrad.row = curGrad.row;
                    break;
                case DIR.RIGHT:
                    tryGrad.column = curGrad.column + 1;
                    tryGrad.row = curGrad.row;
                    break;
            }
            if (tryGrad.row > 10 || tryGrad.row < 0 || tryGrad.column < 0 || tryGrad.column > 5) {
                console.log("出界了");
            } else {
                this.tryGrads.push(tryGrad);
                let tryValue = LineGameCommand.mapArr[tryGrad.row][tryGrad.column];
                let lastValue = LineGameCommand.mapArr[lastGrad.row][lastGrad.column];

                if (tryGrad.row == this.clickGrad.row && tryGrad.column == this.clickGrad.column) {
                    console.log("查询到了原点,  所有的空格都尝试了. ")
                    return false;
                }

                if (tryValue >= 0) {
                    if (tryGrad.row == lastGrad.row && tryGrad.column == lastGrad.column) {
                        console.log("到达目标值了:(*^▽^*)")
                        let clickValue = LineGameCommand.mapArr[this.clickGrad.row][this.clickGrad.column];
                        if (clickValue == lastValue) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return this.searchFrist(tryGrad, lastGrad, tryDir);
                }
            }
        }
        return false;
    }

}



enum DIR {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
