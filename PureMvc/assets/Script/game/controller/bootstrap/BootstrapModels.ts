
/**
 * 启动 注册 模型类
 * @author dk
 * 2021-06-20
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import LineGameProxy from "../../../subGame/lineGame/model/LineGameProxy";
import { LineGameVo } from "../../../subGame/lineGame/model/vo/LineGameVo";
import TankGameProxy from "../../../subGame/tankGame/model/TankGameProxy";
import { TankGameVo } from "../../../subGame/tankGame/model/vo/TankGameVo";
import GameProxy from "../../model/GameProxy";

export default class BootstrapModels extends SimpleCommand implements ICommand {
    public constructor() {
        super();
    }

    public execute(notification: INotification): void {

        this.facade().registerProxy(new GameProxy());

        this.facade().registerProxy(new LineGameProxy(LineGameProxy.NAME, new LineGameVo()))

        this.facade().registerProxy(new TankGameProxy(TankGameProxy.NAME, new TankGameVo()))
        // this.facade.registerProxy(new WebSocketProxy());
    }
}