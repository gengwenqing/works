/**
 * 连线游戏 主控制
 */

import AppFacade from "../../game/AppFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LineGameMsg extends cc.Component {

    start() {
        AppFacade.getInstance().sendNotification("开始连线游戏", this.node);
    }

}
