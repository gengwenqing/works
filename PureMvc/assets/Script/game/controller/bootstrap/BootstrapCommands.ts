/**
 * 命令处理类
 * @author dk
 * 2021-06-20
 */

import ICommand from "../../../frame/pureMvc/interfaces/ICommand";
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import SimpleCommand from "../../../frame/pureMvc/patterns/command/SimpleCommand";
import LineGameCommand from "../../../subGame/lineGame/controller/LineGameCommand";
import TiYuGameCommand from "../../../subGame/tiYuGame/controller/TiyuCommand";
import AppFacade from "../../AppFacade";
import EntryCommand from "../commands/EntryCommand";
import HotUpdateCommand from "../commands/HotUpdateCommand";
import LobbyCommand from "../commands/LobbyCommand";
import SnowGameCommand from "../commands/SnowGameCommand";

export default class BootstrapCommands extends SimpleCommand implements ICommand {

    public constructor() {
        super();
    }

    public execute(notification: INotification): void {
        // this.addComd(new EntryCommand());
        // this.addComd(new HotUpdateCommand()); 
        // this.addComd(new LobbyCommand());
        // this.addComd(new SnowGameCommand());

        this.addComd(new LineGameCommand());

        // this.addComd(new TiYuGameCommand());
    }

    private addComd(command: SimpleCommand) {
        command.initializeNotifier(AppFacade.MVC_KEY);
        command.register();
    }
}