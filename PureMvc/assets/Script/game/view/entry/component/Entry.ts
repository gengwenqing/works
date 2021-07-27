/**
 * 视图控制类
 * @author dk
 * 2020-06-20
 */

import AppFacade from "../../../AppFacade";
import NotifDefEntry from "../../../notifiDef/NotifDefEntry";
import EntryMediator from "../mediators/EntryMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Entry extends cc.Component {

    @property(cc.Node)
    btn: cc.Node = null;

    @property(cc.Label)
    nickname: cc.Label = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.EditBox)
    eMoney: cc.EditBox = null;

    onLoad() {
        this.btn.on("click", () => {
            AppFacade.getInstance().sendNotification(NotifDefEntry.CLICK_BTN, "test");
        }, this)
    }

    start() {
        AppFacade.getInstance().registerMediator(new EntryMediator(this));
        this.eMoney.node.on("text-changed", this.textChanged.bind(this))
    }

    onDestroy() {
        AppFacade.getInstance().removeMediator(EntryMediator.NAME);
    }

    public setNickName(data) {
        this.nickname.string = data;
    }

    private textChanged(e: cc.EditBox): void {
        if(e.string.length == 6){
            console.log(".....................")
            e.maxLength = 8;
        }
    }

    onClose() {
        this.node.parent.removeChild(this.node);
        this.node.destroy();
    }

}
