import AppFacade from "../../../game/AppFacade";
import { BGMediator } from "../mediator/BGMediator";

/**
 * MainCom
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BGCom extends cc.Component {

    start() {
        // 生成方块指令
        AppFacade.getInstance().sendNotification("创建格子");
    }

    onLoad() {
        AppFacade.getInstance().registerMediator(new BGMediator(BGMediator.NAME, this));
    }

    onDestroy() {
        AppFacade.getInstance().removeMediator(BGMediator.NAME);
    }

    // update (dt) {}
}
