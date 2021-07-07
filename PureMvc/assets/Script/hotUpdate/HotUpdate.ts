/**
 * 热更新
 * @author dk
 * 2021/07/06
 */
export default class HotUpdate{
    private am:cc.AssetManager;

    /**
     * 初始化函数,
     * 1) 创建localMainfest文件;
     */
    init(){
        this.am = new cc.AssetManager();
    }
}