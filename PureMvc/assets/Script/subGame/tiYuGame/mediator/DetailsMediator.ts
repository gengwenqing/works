/**
 * 品类详情组件
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import UIManager from "../../../game/utils/UIManager";
import Http from "../../../net/Http";
import DetailsCom from "../component/DetailsCom";

export class DetailsMediator extends Mediator {

    static NAME = "DetailsMediator";

    viewComponent: DetailsCom;

    public listNotificationInterests(): string[] {
        return [
            "关闭自己",
            "展开收缩投注详情",
            "初始化list视图",
        ];
    }

    /**处理事件监听 */
    public async handleNotification(notification: INotification) {
        let body = notification.getBody();
        switch (notification.getName()) {
            case "关闭自己":
                {
                    UIManager.getInstance().closeUI(DetailsMediator.NAME);
                }
                break;
            case "展开收缩投注详情":
                {
                    this.viewComponent.list.updateItem(body);
                }
                break;

            case "初始化list视图":
                this.initListView();
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        console.log(DetailsMediator.NAME + "中介类被注册");
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log(DetailsMediator.NAME + "中介类被删除");
    }

    private initListView() {
        // 发消息
        Http.getIns().Post("https://loginim.get1origins.com/mobilesitev2/api/Event/GetCompetitionList",
            {
                CompetitionIds: null,
                CompetitionRequestGroups: [{ EventGroupTypeIds: [], Market: 3, SportId: 1 }, { EventGroupTypeIds: [], Market: 2, SportId: 1 }],
                DateFrom: null,
                DateTo: null,
                IsCombo: false,
                ProgrammeIds: null

            }, (data) => {
                console.log(data);

                this.viewComponent.list.numItems = data["cbml"][0]["com"].length;
                DetailsCom.data =  data["cbml"][0]["com"];

                // this.list.numItems = 10;
            })
    }
}