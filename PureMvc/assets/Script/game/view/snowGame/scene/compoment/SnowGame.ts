// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ResolveOptions } from "dns";
import Role from "./Role";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SnowGame extends cc.Component {

    @property(cc.Node)
    line0: cc.Node = null;

    @property(cc.Node)
    line1: cc.Node = null;

    @property(cc.Node)
    line2: cc.Node = null;

    @property(cc.Node)
    line3: cc.Node = null;

    @property(cc.Node)
    Role: cc.Node = null;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    /**
     * 游戏场景的每帧检测
     */
    update(dt) {

    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    /**按键按下 */
    private onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.Role.getComponent(Role).move("left");
                break;
            case cc.macro.KEY.d:
                this.Role.getComponent(Role).move("right");
                break;
            case cc.macro.KEY.space:
                // this.Role.getComponent(Role).dump(true);
                break;
        }
    }

    /**按键抬起 */
    private onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.Role.getComponent(Role).move("");
                break;
            case cc.macro.KEY.d:
                this.Role.getComponent(Role).move("");
                break;
            case cc.macro.KEY.space:
                this.Role.getComponent(Role).dump(true);
                break;
        }
    }

    /**
     *怪物移动
     */
    monsterMove() {

    }

    /**
     * 人物移动
     */
    roleMove() {

    }

    /**
     * 是否碰撞到不可行走区域
     * 如果有碰到,返回碰到的节点,
     * 如果没有碰到, 返回false
     */

    isHitMoveArea() {
        return false;
    }



}
