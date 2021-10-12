/**
 * 怪物类
 * @author dk
 * 2021-09-24
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class Role extends cc.Component {
    private speed = 3;
    private isJump = false;
    private srcPos = 0;
    private isReturn = false;
    private dir = "";

    @property(cc.Node)
    lines: cc.Node[] = [];
    /**
     * 移动方法
     * @dir 方向
     */
    public move(dir) {
        this.dir = dir;
    }

    /**
     * 跳跃方法
     */
    public dump(bool) {
        this.isJump = bool;
        this.srcPos = this.node.y;
        setTimeout(() => {
            this.isJump = false;
        }, 500);
    }

    update() {
        if (this.dir == "left") {
            this.node.x -= this.speed;
        } else if (this.dir == "right") {
            this.node.x += this.speed;
        }
        if (this.isJump) {
            this.node.y += this.speed;
        } else {
            if (this.isReturn) {
                if (!(this.node.y <= this.srcPos)) {
                    this.node.y -= this.speed;
                }
            }
        }
    }
}