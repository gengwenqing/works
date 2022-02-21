import AppFacade from "../../../game/AppFacade";
import { BGMediator } from "../mediator/BGMediator";

/**
 * MainCom
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class PassCom extends cc.Component {
    @property(cc.Label)
    text: cc.Label = null;
    @property(cc.Node)
    bg: cc.Node = null;

    async start() {
        // 生成方块指令
        // AppFacade.getInstance().sendNotification("创建格子");

        let str = "有一首歌这样唱 " +
            "\n" +
            "\n 父亲曾经形容草原的清香" +
            "\n" +
            "\n" + "让他在天涯海角也从不能相忘" +
            "\n" +
            "\n" + "母亲总爱描摹那大河浩荡" +
            "\n" +
            "\n" + "奔流在蒙古高原我遥远的家乡" +
            "\n" +
            "\n" + "如果把父亲比喻成草原" +
            "\n" +
            "\n" + "那么母亲就是草原上的河" +
            "\n" +
            "\n" + "给与后代力量和安全感" +
            "\n" +
            "\n" + "我总爱描述曲折而有历史的龙尾坡" +
            "\n" +
            "\n" + "你是否常见箭峪水库......" +
            "\n" +
            "\n" + "我把你看成了母亲的箭峪水库" +
            "\n" +
            "\n" + "而我想成为那个父亲的龙尾坡......"
            "\n" +
            "\n" + "最喜欢吃的雪糕:提子..."
            "\n" +
            "\n" + "最想去的地方:西藏...."
            "\n" +
            "\n" + "最喜欢看的电视剧:浪漫满屋"
            "\n" +
            "\n" + "最爱的动漫:犬夜叉"
            "\n" +
            "\n" + "喜欢的男星:金城武"
            "\n" +
            "\n" + "喜欢的女星:郝本"


        let j = 0;
        this.text.string = "";
        this.schedule(function () {
            this.text.string += str[j];
            j++;
            if (j == str.length - 1) {
                setTimeout(() => {
                    this.text.node.active = false;
                    setTimeout(() => {
                        this.text.node.active = true;
                        this.text.string = "这是龙尾坡大兄弟";
                        this.bg.active = true;
                        this.bg.opacity = 0;
                        cc.tween(this.bg)
                            .to(1, { opacity: 255 })
                            .start();
                    }, 1000);
                }, 1000);

            }
        }, 0.3, str.length - 1, 0.3);

    }

    onLoad() {
        // AppFacade.getInstance().registerMediator(new BGMediator(BGMediator.NAME, this));
    }

    onDestroy() {
        // AppFacade.getInstance().removeMediator(BGMediator.NAME);
    }

    // update (dt) {}
}
