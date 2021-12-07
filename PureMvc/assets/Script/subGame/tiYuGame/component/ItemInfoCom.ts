import AppFacade from "../../../game/AppFacade";

/**
 * 分类详情组件
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemInfoCom extends cc.Component {

    
    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    sign: cc.Node = null;

    @property(cc.Node)
    star: cc.Node = null;
    // 唯一ID
    id: number;

    // 样式
    type: number;
    /**
     * 0
     * 1
     * 2
     * @returns 
     */
    public getType(): number {
        return 3;
    }

    public getId(): number {
        return this.id;
    }

    private onClick() {
        AppFacade.getInstance().sendNotification("详情item被点击", this);
    }

    onLoad() {
        this.node.on('click', this.onClick, this);
    }

    start() {

    }
    // update (dt) {}
}
