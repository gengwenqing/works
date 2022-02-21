/**
 * 品类详情组件
 */

import INotification from "../../../frame/pureMvc/interfaces/INotification";
import Mediator from "../../../frame/pureMvc/patterns/mediator/Mediator";
import AppFacade from "../../../game/AppFacade";
import UIManager from "../../../game/utils/UIManager";
import Http from "../../../net/Http";
import DetailsCom from "../component/DetailsCom";
import TiYuGameProxy from "../model/TiYuGameProxy";
import { TiYuGameVo } from "../model/vo/TiYuGameVo";

export class DetailsMediator extends Mediator {

    static NAME = "DetailsMediator";

    viewComponent: DetailsCom;

    public listNotificationInterests(): string[] {
        return [
            "关闭自己",
            "抬头缩放展开",
            "初始化list视图",
            "获取页面数据",
            "初始体育菜单",
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
            case "抬头缩放展开":
                {
                    // this.viewComponent.list.updateItem(body);
                    this.viewComponent.updateTitle(body.type, body.hideOrShow);
                }
                break;

            case "初始化list视图":
                this.initListView();
                break;
            case "初始体育菜单":
                this.initMenu();
                break;
            case "获取页面数据":
                this.getViewData();
                break;
        }
    }

    /**注册的时候被调用 */
    public onRegister() {
        // console.log(DetailsMediator.NAME + "中介类被注册");
        this.facade().sendNotification("获取页面数据");
    }

    /**删除的时候被调用 */
    public onRemove() {
        console.log(DetailsMediator.NAME + "中介类被删除");
    }

    private getViewData() {

        let proxy: TiYuGameProxy = this.facade().retrieveProxy(TiYuGameProxy.NAME) as TiYuGameProxy;
        let vo: TiYuGameVo = proxy.getData();

        Http.getIns().Post("https://loginim.get1origins.com/mobilesitev2/api/Home/GetSportMenuByPage",
            {
                "pageType": 0,
                "startDate": null,
                "endDate": null,
                "programmeId": null,
                "competitionId": null

            }, (data) => {
                vo.SportMenuData = data["secl"];
                this.facade().sendNotification("初始体育菜单");
            }, "YTY4ZDJlNmM0YjZkZGY1ZjllNDVjMzRiYTk2NTQzODcmJmZoX25hbWVnd3FnMCYmJiYxNjQ1NDE5MDQ0")

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
                console.log("获取列表抬头数据:", data);

                vo.TitleData = data["cbml"];

                // this.list.numItems = 10;

                Http.getIns().Post("https://loginim.get1origins.com/api/Event/GetSportEvents",
                    {
                        "SportId": 1,
                        "Market": 3,
                        "BetTypeIds": [
                            1,
                            2,
                            3
                        ],
                        "PeriodIds": [
                            1,
                            2
                        ],
                        "IsCombo": false,
                        "OddsType": 2,
                        "DateFrom": null,
                        "DateTo": null,
                        "CompetitionIds": proxy.getCompetitionIds,
                        "Season": 0,
                        "MatchDay": 0,
                        "SortType": 2,
                        "ProgrammeIds": []
                    }, (data) => {
                        console.log("比赛对阵详情:", data);

                        vo.BetInfoData = data.sel;
                        // this.viewComponent.list.numItems = DetailsCom.data.length; // 触发render
                        // 渲染item
                        this.facade().sendNotification("初始化list视图");


                    }, "YTY4ZDJlNmM0YjZkZGY1ZjllNDVjMzRiYTk2NTQzODcmJmZoX25hbWVnd3FnMCYmJiYxNjQ1NDE5MDQ0")
            })




    }

    initListView() {
        let proxy: TiYuGameProxy = this.facade().retrieveProxy(TiYuGameProxy.NAME) as TiYuGameProxy;
        let vo: TiYuGameVo = proxy.getData();
        let matchingNum = proxy.getMatchingNums();
        this.viewComponent.initItems(vo.TitleData, vo.BetInfoData, matchingNum);
    }

    initMenu() {
        let proxy: TiYuGameProxy = this.facade().retrieveProxy(TiYuGameProxy.NAME) as TiYuGameProxy;
        let vo: TiYuGameVo = proxy.getData();
        let menuData = proxy.getMenuData();
        this.viewComponent.initMenu(menuData);
    }

}