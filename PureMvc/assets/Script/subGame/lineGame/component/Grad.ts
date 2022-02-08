/**
 *  格子prefab
 */

import AppFacade from "../../../game/AppFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Grad extends cc.Component {

    @property(cc.Label)
    typeStr: cc.Label = null;

    @property(cc.Node)
    texiao: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property([cc.SpriteFrame])
    mapSf: cc.SpriteFrame[] = [];

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


    onLoad() {
        this.texiao.active = false;
    }
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
                // this.bg.color = new cc.Color(139, 134, 78);
                // this.typeStr.string = "A";
                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[0];
                break;
            case 1:
                // this.bg.color = new cc.Color(139, 105, 105);
                // this.typeStr.string = "B";

                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[1];
                break;
            case 2:
                // this.bg.color = new cc.Color(139, 126, 102);
                // this.typeStr.string = "C";

                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[2];
                break;
            case 3:
                // this.bg.color = new cc.Color(139, 0, 0);
                // this.typeStr.string = "D";

                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[3];
                break;
            case 4:
                // this.bg.color = new cc.Color(0, 0, 205);
                // this.typeStr.string = "E";

                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[4];
                break;
            case 5:
                // this.bg.color = new cc.Color(139, 115, 85);
                // this.typeStr.string = "F";

                this.bg.getComponent(cc.Sprite).spriteFrame = this.mapSf[5];
                break;
            case -1:
                this.bg.color = new cc.Color(0, 0, 0);
                this.typeStr.string = "";
                // this.bg.active = false;
                // this.bg.getComponent(cc.Sprite).spriteFrame = null;
                // this.node.opacity = 0;
                break;
            case -2:
                this.bg.color = new cc.Color(195, 215, 175);
                this.typeStr.string = "";
                this.typeStr.node.color = new cc.Color(255, 255, 255);
                // this.node.active = false;
                this.node.opacity = 0;
                break;
            case -10:
            case -11:
            case -12:
            case -13:
            case -14:
            case -15:
            case -16:
            case -17:
            case -18:
            case -19:
            case -20:
                // let num = Math.abs(type + 10);
                this.bg.color = new cc.Color(195, 215, 175);
                this.typeStr.string = "";
                this.typeStr.node.color = new cc.Color(194, 124, 136);
                // this.node.a = false;
                this.node.opacity = 0;
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

    comparison(grad: Grad) {
        if (this.row == grad.row && this.column == grad.column) {
            return true;
        } else {
            return false;
        }
    }

    blink() {
        this.texiao.active = true;
        setTimeout(() => {
            this.texiao.active = false;
        }, 300);
    }

    // update (dt) {}
}
