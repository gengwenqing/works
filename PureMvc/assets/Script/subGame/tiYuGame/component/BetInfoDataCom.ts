// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BetInfoDataCom extends cc.Component {

    @property(cc.Label)
    bit_3_0: cc.Label = null;

    @property(cc.Label)
    bit_3_1: cc.Label = null;

    @property(cc.Label)
    bit_3_2: cc.Label = null;

    // 让球
    @property(cc.Label)
    bit_1_0: cc.Label = null;

    @property(cc.Label)
    bit_1_1: cc.Label = null;

    // 大小
    @property(cc.Label)
    bit_2_0: cc.Label = null;

    @property(cc.Label)
    bit_2_1: cc.Label = null;

    start() {

    }

    setWsInfo(data) {
        console.log(this);
        let self = this;
        for (let i = 0; i < data.length; i++) {
            let ele = data[i];
            for (const key in ele) {
                console.log("数据:" + ele[key]);
                console.log("属性名" + key, self[key]);
                self[key].string = ele[key];
            }
        }
    }
    // update (dt) {}
}
