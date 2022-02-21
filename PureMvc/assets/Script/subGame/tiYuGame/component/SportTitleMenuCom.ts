/**
 * 投注信息详情 组件
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class SportTitleMenuCom extends cc.Component {

    @property(cc.Node)
    addLayer: cc.Node = null;

    @property(cc.Node)
    titleItem: cc.Node = null;

    @property(cc.SpriteFrame)
    sfs0: cc.SpriteFrame[] = [];
    @property(cc.SpriteFrame)
    sfs1: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    macths: cc.SpriteFrame[] = [];

    menuItems = [];

    onLoad() {

    }

    update(dt) { }

    private onClick(target: any): void {
        this.updateSelect(target.node);
    }

    updateSelect(node) {
        for (let i = 0; i < this.menuItems.length; i++) {
            let ele = this.menuItems[i];
            if (node == ele) {
                ele.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.sfs1[ele["data"].sfs]
            } else {
                ele.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.sfs0[ele["data"].sfs]
            }
        }
    }

    init(data){
        for (let i = 0; i < data.length; i++) {
            const ele = data[i];
            let node = cc.instantiate(this.titleItem);
            node["data"] = ele;
            node.x = 0;
            node.y = 0;
            node.active = true;
            node["index"] = i;
            console.log(ele.name);
            node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.sfs0[ele.sfs];
            node.getChildByName("label").getComponent(cc.Label).string = ele.name;
            node.getChildByName("count").getComponent(cc.Label).string = ele.count;
            node.on("click", this.onClick, this);
            this.addLayer.addChild(node);
            this.menuItems.push(node);
        }
        this.updateSelect(this.menuItems[0]);
    }

}
