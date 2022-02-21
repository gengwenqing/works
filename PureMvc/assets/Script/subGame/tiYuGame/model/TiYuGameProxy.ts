
import IProxy from "../../../frame/pureMvc/interfaces/IProxy";
import Proxy from "../../../frame/pureMvc/patterns/proxy/Proxy";
import { TiYuGameVo } from "./vo/TiYuGameVo";

export default class TiYuGameProxy extends Proxy implements IProxy {
    static NAME = "TiYuGameProxy";
    /**
     * 被注册调用
     */
    public onRegister() {
        console.log("TiYuGameProxy");
    }

    /**
     * 被删除调用
     */
    public onRemove() {
        console.log("TiYuGameProxy");
    }

    public getBetInfoByCid(cid): any[] {
        // {    "mls": [
        //         {
        //             "bti": 1,
        //             "btn": "上半场 让球",
        //             "mi": 834799450,
        //             "ml": 1,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -0.25,
        //                     "o": 0.7,
        //                     "si": 1,
        //                     "wsi": 2969704742,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -0.25,
        //                     "o": 1.25,
        //                     "si": 2,
        //                     "wsi": 2969704744,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "上半场 让球",
        //             "mi": 834799451,
        //             "ml": 2,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 0,
        //                     "o": 1.51,
        //                     "si": 1,
        //                     "wsi": 2974176443,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 0,
        //                     "o": 0.56,
        //                     "si": 2,
        //                     "wsi": 2974176444,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "上半场 让球",
        //             "mi": 834799452,
        //             "ml": 3,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -0.5,
        //                     "o": 0.44,
        //                     "si": 1,
        //                     "wsi": 2974176445,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -0.5,
        //                     "o": 1.85,
        //                     "si": 2,
        //                     "wsi": 2974176446,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "让球",
        //             "mi": 834799434,
        //             "ml": 1,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -0.25,
        //                     "o": 1.11,
        //                     "si": 1,
        //                     "wsi": 2969704638,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -0.25,
        //                     "o": 0.83,
        //                     "si": 2,
        //                     "wsi": 2969704640,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "让球",
        //             "mi": 834799435,
        //             "ml": 2,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -0.5,
        //                     "o": 0.82,
        //                     "si": 1,
        //                     "wsi": 3012690665,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -0.5,
        //                     "o": 1.12,
        //                     "si": 2,
        //                     "wsi": 3012690666,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "让球",
        //             "mi": 834799436,
        //             "ml": 3,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -0.75,
        //                     "o": 0.6,
        //                     "si": 1,
        //                     "wsi": 2974176431,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -0.75,
        //                     "o": 1.49,
        //                     "si": 2,
        //                     "wsi": 2974176432,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "让球",
        //             "mi": 834799437,
        //             "ml": 4,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 0,
        //                     "o": 1.63,
        //                     "si": 1,
        //                     "wsi": 2974176433,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 0,
        //                     "o": 0.54,
        //                     "si": 2,
        //                     "wsi": 2974176434,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "上半场 大/小",
        //             "mi": 834799453,
        //             "ml": 1,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 0.75,
        //                     "o": 0.82,
        //                     "si": 3,
        //                     "wsi": 2969704746,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 0.75,
        //                     "o": 1.08,
        //                     "si": 4,
        //                     "wsi": 2969704748,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 1,
        //             "btn": "让球",
        //             "mi": 834799438,
        //             "ml": 5,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": -1,
        //                     "o": 0.37,
        //                     "si": 1,
        //                     "wsi": 2974176435,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": -1,
        //                     "o": 2.27,
        //                     "si": 2,
        //                     "wsi": 2974176436,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "上半场 大/小",
        //             "mi": 834799454,
        //             "ml": 2,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 1,
        //                     "o": 1.36,
        //                     "si": 3,
        //                     "wsi": 3003411954,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 1,
        //                     "o": 0.63,
        //                     "si": 4,
        //                     "wsi": 3003411955,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "上半场 大/小",
        //             "mi": 834799455,
        //             "ml": 3,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 0.5,
        //                     "o": 0.56,
        //                     "si": 3,
        //                     "wsi": 3003411952,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 0.5,
        //                     "o": 1.51,
        //                     "si": 4,
        //                     "wsi": 3003411953,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "大/小",
        //             "mi": 834799439,
        //             "ml": 1,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 2.25,
        //                     "o": 1.09,
        //                     "si": 3,
        //                     "wsi": 2969704642,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 2.25,
        //                     "o": 0.81,
        //                     "si": 4,
        //                     "wsi": 2969704643,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "大/小",
        //             "mi": 834799440,
        //             "ml": 2,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 2,
        //                     "o": 0.78,
        //                     "si": 3,
        //                     "wsi": 3010962792,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 2,
        //                     "o": 1.13,
        //                     "si": 4,
        //                     "wsi": 3010962793,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "大/小",
        //             "mi": 834799441,
        //             "ml": 3,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 2.5,
        //                     "o": 1.38,
        //                     "si": 3,
        //                     "wsi": 3010962794,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 2.5,
        //                     "o": 0.62,
        //                     "si": 4,
        //                     "wsi": 3010962795,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "大/小",
        //             "mi": 834799442,
        //             "ml": 4,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 1.75,
        //                     "o": 0.57,
        //                     "si": 3,
        //                     "wsi": 3010096818,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 1.75,
        //                     "o": 1.49,
        //                     "si": 4,
        //                     "wsi": 3010096819,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 3,
        //             "btn": "上半场  1 X 2",
        //             "mi": 834799456,
        //             "ml": 1,
        //             "pi": 2,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "o": 4.53,
        //                     "si": 5,
        //                     "wsi": 2969704750,
        //                     "ics": false
        //                 },
        //                 {
        //                     "o": 2.9,
        //                     "si": 6,
        //                     "wsi": 2969704752,
        //                     "ics": false
        //                 },
        //                 {
        //                     "o": 1.94,
        //                     "si": 7,
        //                     "wsi": 2969704754,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 2,
        //             "btn": "大/小",
        //             "mi": 834799443,
        //             "ml": 5,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "hdp": 1.5,
        //                     "o": 0.45,
        //                     "si": 3,
        //                     "wsi": 3012689478,
        //                     "ics": false
        //                 },
        //                 {
        //                     "hdp": 1.5,
        //                     "o": 1.81,
        //                     "si": 4,
        //                     "wsi": 3012689479,
        //                     "ics": false
        //                 }
        //             ]
        //         },
        //         {
        //             "bti": 3,
        //             "btn": "1x2",
        //             "mi": 834799444,
        //             "ml": 1,
        //             "pi": 1,
        //             "il": false,
        //             "ws": [
        //                 {
        //                     "o": 3.66,
        //                     "si": 5,
        //                     "wsi": 2969704645,
        //                     "ics": false
        //                 },
        //                 {
        //                     "o": 2.12,
        //                     "si": 6,
        //                     "wsi": 2969704647,
        //                     "ics": false
        //                 },
        //                 {
        //                     "o": 3.29,
        //                     "si": 7,
        //                     "wsi": 2969704649,
        //                     "ics": false
        //                 }
        //             ]
        //         }
        //     ],
        //     "on": 9996,
        //     "shtn": "kadisi",
        //     "eid": 43606617,
        //     "st": 1,
        //     "egid": 1637386,
        //     "gtid": 1,
        //     "egtid": 1,
        //     "rbtSts": 0,
        //     "hv": true,
        //     "is": false,
        //     "il": true,
        //     "isFav": false,
        //     "htid": 1011,
        //     "htn": "卡迪斯",
        //     "atid": 540,
        //     "atn": "塞尔塔",
        //     "iop": true,
        //     "isrbt": false,
        //     "isll": false,
        //     "mlc": 170,
        //     "hlsu": false,
        //     "mdy": 0,
        //     "ssnid": 0,
        //     "edt": "2022-02-12T09:00:00-04:00",
        //     "esid": 1,
        //     "ei": {
        //         "hcnr": true
        //     },
        //     "pid": 4,
        //     "pn": "西班牙",
        //     "pon": 0,
        //     "cid": 130,
        //     "cn": "*西班牙甲级联赛",
        //     "cpmon": 210,
        //     "crbon": 50,
        //     "scn": "*xibanyajiajiliansai",
        //     "m": 2,
        //     "io": true
        // }

        let datas = [];
        let betInfoData = (this.getData() as TiYuGameVo).BetInfoData;

        betInfoData.forEach(element => {
            if (element.cid == cid) {
                datas.push(element);
            }
        });

        return datas;
    }

    public getCompetitionIds(): any[] {
        let coms = [];
        let titleData = (this.getData() as TiYuGameVo).TitleData;
        let data0: any[] = titleData[0]["com"];
        data0.forEach(element => {
            coms.push(element.cid);
        });
        return coms;
    }

    /**
     * 获取比赛中的数量
     * @returns 
     */
    public getMatchingNums() {
        let num = 0;
        let coms = this.getCompetitionIds();
        for (let i = 0; i < coms.length; i++) {
            let datas = this.getBetInfoByCid(coms[i]);
            num += datas.length;
        }
        return num;
    }

    public getMenuData(): any[] {
        let returnData = [];
        let data = (this.getData() as TiYuGameVo).SportMenuData;
        let menuForm = (this.getData() as TiYuGameVo).MenuForm;
        for (let i = 0; i < data.length; i++) {
            let ele = data[i];
            for (let j = 0; j < menuForm.length; j++) {
                if (ele.s == menuForm[j].s) {
                    returnData.push({ "sfs": menuForm[j].sfs, "name": menuForm[j].name, "count": ele.c })
                }
            }
        }
        return returnData;
    }
}