/**
 * 热更新皮肤
 * @author dk
 * 2021-07-27
 */

import AppFacade from "../../../AppFacade";
import LobbyMediator from "../mediator/LobbyMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LobbyCom extends cc.Component{

    @property (cc.Label)
    lPorgress:cc.Label = null;

    start() {
        AppFacade.getInstance().registerMediator(new LobbyMediator(this));
    }

    onDestroy(){
        AppFacade.getInstance().removeMediator(LobbyMediator.NAME);
    }

    /**设置进度 */
    public setProgress(data:string):void{
        this.lPorgress.string = data;
    }
} 