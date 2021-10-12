/**
 * UI 管理类
 * @author dk
 * 2021-07-27
 */


export default class UIManager {

    /**单例 */
    public static instance: UIManager = null;

    /**单例方法 */
    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }
    /**UI列表 */
    private UINodeList: any = [];
    private UIKVList = {
        "HotUpdateMediator": "Prefabs/HotUpdate",
        "LobbyMediator": "Prefabs/Lobby",
        "SnowGame": "Prefabs/SnowGame",
    };

    public UIPopLayer: cc.Node = null;

    /**
     * 显示UI
     * @param key 
     */
    public async showUI(key: string): Promise<any> {
        return new Promise((resole, reject) => {
            this.loadUI(key, resole, reject);
        });
    }

    async loadUI(key: string, resole, reject) {
        if (this.UINodeList[key]) {
            resole(this.UINodeList[key]);
        }
        cc.resources.load(this.UIKVList[key], cc.Prefab, (error, asserts) => {
            if (error) {
                reject(error);
            } else {
                let node: any = cc.instantiate(asserts);
                this.UIPopLayer.addChild(node);
                this.UINodeList[key] = node;
                resole(node);
            }
        })
    }

    /**
     * 关闭UI
     * @param key 
     */
    public closeUI(key: string) {
        let node: cc.Node = this.UINodeList[key];
        if (node.parent) {
            node.removeFromParent(true);
            let com: cc.Component = node.getComponent(key);
            if (com) {
                com.destroy();
            } else {
                console.log("未获取 组件脚本...." + key);
            }
        }
    }


}