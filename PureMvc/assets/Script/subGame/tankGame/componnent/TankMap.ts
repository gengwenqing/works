import AppFacade from "../../../game/AppFacade";
import Grad from "../../lineGame/component/Grad";
import { TankMapMediator } from "../mediator/TankMapMediator";
import Tank, { MOVEDIR } from "./Tank";
import TankGrad from "./TankGrad";

/**
 * map 地图
 * 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TankMap extends cc.Component {

    @property(cc.Node)
    gradsContainer: cc.Node = null; // grad容器；

    @property(cc.Node)
    tankLayer: cc.Node = null; // tank添加层

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        AppFacade.getInstance().registerMediator(new TankMapMediator(TankMapMediator.NAME, this));
    }

    onDestroy() {

    }

    private onKeyDown(_event) {
        let tank_hero = this.tankLayer.getChildByName("Tank");
        let tanCom = tank_hero.getComponent(Tank);

        switch (_event.keyCode) {
            case cc.macro.KEY.left:
                tanCom.setSpeed(100);
                tanCom.setDir(MOVEDIR.LEFT);
                break;
            case cc.macro.KEY.right:
                tanCom.setSpeed(100);
                tanCom.setDir(MOVEDIR.RIGHT);
                break;
            case cc.macro.KEY.up:
                tanCom.setSpeed(100);
                tanCom.setDir(MOVEDIR.UP);
                break;
            case cc.macro.KEY.down:
                tanCom.setSpeed(100);
                tanCom.setDir(MOVEDIR.DOWN);
                break;
            case cc.macro.KEY.space:
                tanCom.setSpeed(100);
                tanCom.setDir(MOVEDIR.DOWN);
                break;
        }
    }

    private onKeyUp() {
        let tank_hero = this.tankLayer.getChildByName("Tank");
        tank_hero.getComponent(Tank).setSpeed(-1);
    }
}