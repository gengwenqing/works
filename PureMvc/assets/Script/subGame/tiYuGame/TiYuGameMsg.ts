import AppFacade from "../../game/AppFacade";
import UIManager from "../../game/utils/UIManager";
import TiYuMediator from "./mediator/TiYuMediator";

/**
 * 体育demo
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class TiYuGameMsg extends cc.Component {

    @property(cc.Node)
    popLayer: cc.Node = null;
    
    onLoad () {
        AppFacade.getInstance().registerMediator(new TiYuMediator(TiYuMediator.NAME, this));
    }

    start () { 
        AppFacade.getInstance().sendNotification("添加大厅", this.node);

        UIManager.UIPopLayer = this.popLayer;

    }

    // update (dt) {}
}
