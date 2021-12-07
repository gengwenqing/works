/**
 *  格子prefab
 */

import AppFacade from "../../../game/AppFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Grad extends cc.Component {

    @property(cc.Label)
    typeStr: cc.Label = null;
    // 随机六种颜色,六种方块
    // A  139 134 78
    // B  139 105 105
    // C  139 126 102
    // D  139 0 0
    // E  0 0 205 
    // F  139 115 85
    color: cc.Color = null;
    row: number;
    column: number;
    type: number;

    start() {
        this.node.on('click', this.onClick, this);
    }

    private onClick() {
        console.log(this.typeStr.string, this.row, "行", this.column, "列");
        AppFacade.getInstance().sendNotification("被点击了", this);
    }

    setType(type: number) {
        this.type = type;
        switch (type) {
            case 0:
                this.node.color = new cc.Color(139, 134, 78);
                this.typeStr.string = "A";
                break;
            case 1:
                this.node.color = new cc.Color(139, 105, 105);
                this.typeStr.string = "B";
                break;
            case 2:
                this.node.color = new cc.Color(139, 126, 102);
                this.typeStr.string = "C";
                break;
            case 3:
                this.node.color = new cc.Color(139, 0, 0);
                this.typeStr.string = "D";
                break;
            case 4:
                this.node.color = new cc.Color(0, 0, 205);
                this.typeStr.string = "E";
                break;
            case 5:
                this.node.color = new cc.Color(139, 115, 85);
                this.typeStr.string = "F";
                break;
            case -1:
                this.node.color = new cc.Color(255, 255, 255);
                this.typeStr.string = "";
                break;
            case -2:
                this.node.color = new cc.Color(0, 0, 0);
                this.typeStr.string = "边界";
                break;
        }
    }

    /**
     * 设置行和列
     * @param row 
     * @param column 
     */
    setCowAndCloumn(row, column) {
        this.row = row;
        this.column = column;
    }

    // update (dt) {}
}
