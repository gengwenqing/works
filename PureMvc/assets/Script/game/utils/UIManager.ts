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
    private static UINodeList: any = [];

    private static Prefix: string = "tiyuGame/prefabs/";
    private static UIKVList = {
        "HotUpdateMediator": "Prefabs/HotUpdate",
        "LobbyMediator": "Prefabs/Lobby",
        "SnowGame": "Prefabs/SnowGame",
        "DetailsMediator": "Details",
    };

    public static UIPopLayer: cc.Node = null;

    /**
     * 显示UI
     * @param key 
     */
    public async showUI(key: string, uiLayer = null): Promise<any> {
        return new Promise((resole, reject) => {
            this.loadUI(key, resole, reject);
        });
    }

    async loadUI(key: string, resole, reject, uiLayer = null) {
        let url = UIManager.UIKVList[key] ? UIManager.Prefix + UIManager.UIKVList[key] : key;
        cc.resources.load(url, cc.Prefab, (error, asserts) => {
            if (error) {
                reject(error);
            } else {
                let node: any = cc.instantiate(asserts);
                UIManager.UIPopLayer.addChild(node);
                UIManager.UINodeList[url] = node;
                resole(node);
            }
        })
    }

    /**
     * 关闭UI
     * @param key 
     */
    public closeUI(key: string) {
        let url = UIManager.UIKVList[key] ? UIManager.Prefix + UIManager.UIKVList[key] : key;
        let node: cc.Node = UIManager.UINodeList[url];
        if (node.parent) {
            node.removeFromParent(true);
            let com: cc.Component = node.getComponent(UIManager.UIKVList[key] + "Com");
            if (com) {
                com.destroy();
            } else {
                console.log("未获取 组件脚本...." + key);
            }
        }
    }

    /**
     *  promise 封装创建 prefab方法
     * @param url 
     * @returns 
     */
    public createPrefab(url: string): Promise<cc.Node | undefined> {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, cc.Prefab, (error, asserts) => {
                if (error) {
                    reject(undefined);
                } else {
                    let node: any = cc.instantiate(asserts);
                    if (node) {
                        resolve(node);
                    } else {
                        resolve(undefined);
                    }

                }
            })
        })
    }


}