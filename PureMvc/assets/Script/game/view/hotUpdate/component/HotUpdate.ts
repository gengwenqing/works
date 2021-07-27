/**
 * 热更新皮肤
 * @author dk
 * 2021-07-27
 */

import AppFacade from "../../../AppFacade";
import HotUpdateMediator from "../mediators/HotUpdateMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdate extends cc.Component{

    @property (cc.Label)
    lPorgress:cc.Label = null;

    start() {
        AppFacade.getInstance().registerMediator(new HotUpdateMediator(this));
    }

    onDestroy(){
        AppFacade.getInstance().removeMediator(HotUpdateMediator.NAME);
    }

    /**设置进度 */
    public setProgress(data:string):void{
        this.lPorgress.string = data;
    }
} 