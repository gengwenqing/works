/**
 * map gard
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TankGrad extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:    

    /**
     * 1 草地 减速
     * 2 钢  不能穿透
     * 3 砖  可以穿透
     * 4 水  加速
     */

    // onLoad () {}

    private row: number;
    private column: number;

    start() {

    }

    // update (dt) {}

    setData(type: GRADTYPE, r: number, c: number) {
        this.row = r;
        this.column = c;
        switch (type) {
            case GRADTYPE.BRICK: // 砖头
                this.node.color = cc.color(205, 98, 39);
                break;
            case GRADTYPE.WATER: // 水
                this.node.color = cc.color(147, 213, 220);
                break;
            case GRADTYPE.STEEL: // 钢
                this.node.color = cc.color(255, 255, 255);
                break;
            case GRADTYPE.GRASS: // 草
                this.node.color = cc.color(105, 167, 148);
                break;
            case GRADTYPE.NONE: // 空 (路)
                this.node.color = cc.color(0, 0, 0);
                break;
        }
    }
}

export enum GRADTYPE {
    NONE,
    BRICK,
    WATER,
    STEEL,
    GRASS,
}
