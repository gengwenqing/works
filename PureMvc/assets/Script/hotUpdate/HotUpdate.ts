import AppFacade from "../game/AppFacade";
import NotifDefEntry from "../game/notifiDef/NotifDefEntry";

/**
 * 热更新
 * @author dk
 * 2021/07/06
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class HotUpdate extends cc.Component {

    @property(cc.Asset)
    manifestUrl: cc.Asset = null!;

    /**热更管理器 */
    private am: jsb.AssetsManager;
    /**缓存地址 */
    private storagePath: string;
    /**重启标记 */
    private needRestart: boolean;
    /**是否正在更新中标记 */
    private isUpdating: boolean = false;
    /**是否正在更新中标记 */
    private needUpdate: boolean = false;

    onLoa() {
        this.init();
    }

    /**
     * 初始化函数,
     * 创建 热更管理器 
     */
    init() {
        this.storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'hotUpdate-remote-asset');
        this.am = new jsb.AssetsManager('', this.storagePath, this.versionCompareHandler);
        this.am.setVerifyCallback(this.verifyFun);
    }

    private verifyFun(path, asset) {
        // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        let compressed = asset.compressed;
        // Retrieve the correct md5 value.
        let expectedMD5 = asset.md5;
        // asset.path is relative path and path is absolute.
        let relativePath = asset.path;
        // The size of asset file, but this value could be absent.
        let size = asset.size;
        if (compressed) {
            return true;
        } else {
            return true;
        }
    }

    private versionCompareHandler(versionA, versionB) {
        cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        for (let i = 0; i < vA.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * 检测更新回调函数
     */
    public checkCb(event: jsb.EventAssetsManager): void {

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("没有本地maifest文件");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                console.log("下载本地maninfest文件出错");
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("解析错误");
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("已经是最新版本");
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log("新版本被发现");
                this.needUpdate = true;
                break;
        }

        this.am.setEventCallback(null);
        this.isUpdating = false;
        if(this.needUpdate){
            this.hotUpdate();
        }
    }

    /**
     * 检测更新回调函数
     * @param evnet 
     */
    private updateCb(event: jsb.EventAssetsManager): void {
        let failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("没有本地manifest文件");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                AppFacade.getInstance().sendNotification(NotifDefEntry.UPDATE_PROGRESS, event.getDownloadedBytes() + '/' + event.getTotalBytes());
                console.log("更新进度....");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("解析和下载错误");
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("已经是最新版本了");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log("更新完毕");
                this.needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log("更新失败");
                this.isUpdating = false;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log("更新错误");
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log("解压错误")
                break;
            default:
                break;
        }

        if (failed) {
            this.am.setEventCallback(null);
            this.isUpdating = false;
        }

        if (this.needRestart) {
            this.am.setEventCallback(null);
            let searchPaths = jsb.fileUtils.getSearchPaths();
            let newPaths = this.am.getLocalManifest().getSearchPaths();
            console.log("获取本地的 manifest 搜索路径:" + newPaths);
            // 更新完成后, 会把远端的 mainfest覆盖 到localManifest,所以获取到, 是远程服务器最新的搜索路径

            // 前置搜索路径,这部很关键, 搜索的触发点决定
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // 把搜索路径写入缓存中,
            cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
            // 设置搜索路径
            jsb.fileUtils.setSearchPaths(searchPaths);
            // 声音停止
            cc.audioEngine.stopAll();
            // 重启游戏
            setTimeout(() => {
                cc.game.restart();
            }, 1000)

        }
    }

    /**
     * 检测更新
     */
    checkUpdate() {
        if (this.isUpdating) {
            console.log("游戏正在更新中")
            return;
        }
        if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
            this.am.loadLocalManifest(this.manifestUrl.nativeUrl)
        }
        // 如果获取不到, 或者 本地mainfest已经加载过
        if (!this.am.getLocalManifest() || !this.am.getLocalManifest().isLoaded()) return;

        this.am.setEventCallback(this.checkCb.bind(this));
        this.am.checkUpdate();
        this.isUpdating = true;
    }


    private failCount = 0;
    /**
     * 更新
     */
    hotUpdate() {
        if (this.am && !this.isUpdating) {
            this.am.setEventCallback(this.updateCb.bind(this));

            if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
                this.am.loadLocalManifest(this.manifestUrl.nativeUrl);
            }

            this.failCount = 0;
            this.am.update();
            this.isUpdating = true;
        }
    }

    onDestroy() {
        this.am.setEventCallback(null);
    }
}