/**
 * 体育视图中介
 */
import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import TyLobbyCom from "../component/TyLobbyCom";

export default class TyLobbyMediator extends Mediator {

    viewComponent: TyLobbyCom;

    static NAME = "TyLobbyMediator"
    /**事件监听 */
    public listNotificationInterests(): string[] {
        return [
            "添加左列表",
            "添加右列表",
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "添加左列表":
                for (let i = 0; i < 6; i++) {
                    let left = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/ItemType");
                    (body as cc.Node).addChild(left);
                    // UIManager.UIPopLayer.addChild(left);
                }
                break;
            case "添加右列表":
                for (let i = 0; i < 3; i++) {
                    let right = await UIManager.getInstance().createPrefab("tiyuGame/prefabs/ItemInfo");
                    (body as cc.Node).addChild(right);
                    // UIManager.UIPopLayer.addChild(right); 
                }

                break;
        }

    }

        /**注册的时候被调用 */
        public onRegister() {
            console.log(TyLobbyMediator.NAME + "中介类被注册");
        }
    
        /**删除的时候被调用 */
        public onRemove() {
            // console.log(LobbyMediator.NAME + "中介类被删除");
        }
}
