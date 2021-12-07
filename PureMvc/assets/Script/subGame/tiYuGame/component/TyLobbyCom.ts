/**
 * 
 */

import AppFacade from "../../../game/AppFacade";
import TyLobbyMediator from "../mediator/TyLobbyMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TyLobbyCom extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    leftContent: cc.Node = null;

    @property(cc.Node)
    rightContent: cc.Node = null;

    onLoad() {
        AppFacade.getInstance().registerMediator(new TyLobbyMediator(TyLobbyMediator.NAME, this));
    }

    start() {
        AppFacade.getInstance().sendNotification("添加左列表", this.leftContent);
        AppFacade.getInstance().sendNotification("添加右列表", this.rightContent);
    }

    // update (dt) {}
}
