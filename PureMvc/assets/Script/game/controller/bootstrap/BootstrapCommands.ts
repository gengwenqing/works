/**
 * 命令处理类
 * @author dk
 * 2021-06-20
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import LineGameCommand from "../../../subGame/lineGame/controller/LineGameCommand";
import TankGameCommand from "../../../subGame/tankGame/controller/TankGameCommand";
import TiYuGameCommand from "../../../subGame/tiyuGame/controller/TiyuCommand";
import AppFacade from "../../AppFacade";

export default class BootstrapCommands extends SimpleCommand implements ICommand {

    public constructor() {
        super();
    }

    public execute(notification: INotification): void {
        // this.addComd(new EntryCommand());
        // this.addComd(new HotUpdateCommand()); 
        // this.addComd(new LobbyCommand());
        // this.addComd(new SnowGameCommand());

        // this.addComd(new LineGameCommand());

        this.addComd(new TiYuGameCommand());
        // this.addComd(new TankGameCommand());
    }

    private addComd(command: SimpleCommand) {
        command.initializeNotifier(AppFacade.MVC_KEY);
        command.register();
    }
}