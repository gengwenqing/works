/**
 * 体育游戏数据模型
 */

export class TiYuGameVo {
    // 菜单数据
    public SportMenuData: any = null;
    // 抬头数据
    public TitleData: any = null;
    // 投注详情item数据组[]
    public BetInfoData: any = null;
    // 菜单对照表
    public MenuForm = [
        { "s":1,"sfs": 0, "name": "足球" },
        { "s":2,"sfs": 1, "name": "篮球" },
        { "s":3,"sfs": 10, "name": "网球" },
        { "s":25,"sfs": 11, "name": "冰球" },
        { "s":31,"sfs": 7, "name": "橄榄球" },
        { "s":34,"sfs": 3, "name": "斯诺克" },
        { "s":36,"sfs": 8, "name": "乒乓球" },
        { "s":40,"sfs": 5, "name": "排球" },
    ]
    
}