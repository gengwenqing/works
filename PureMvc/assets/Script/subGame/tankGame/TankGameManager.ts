import AppFacade from "../../game/AppFacade";
import { TankGameMediator } from "./mediator/TankGameMediator";

/**
 * tank游戏
 * 场景控制类
 * 组件
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TankGameManager extends cc.Component {


    @property(cc.Node)
    addLayer: cc.Node = null;

    onLoad() {

    }

    start() {
        AppFacade.getInstance().registerMediator(new TankGameMediator(TankGameMediator.NAME, this));

        AppFacade.getInstance().sendNotification("开始游戏", this.addLayer);
    }

    onDestroy() {

    }
}