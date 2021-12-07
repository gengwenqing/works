import { timingSafeEqual } from "crypto";
import AppFacade from "../game/AppFacade";
import NotifDefEntry from "../game/notifiDef/NotifDefEntry";

/**
 * 热更新
 * @author dk
 * 2021/07/06
 */
export default class HotUpdateMsg {

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
    /**manifestUrl */
    private manifestNativeUrl: string = "";

    /**
     * 初始化函数,
     * 创建 热更管理器 
     */
    init() {
        cc.resources.load("hotUpdate/project", (error, assets) => {
            if (error) {
                this.showLog("加载本地manifest文件出错");
            } else {

                this.manifestNativeUrl = assets.nativeUrl;
                this.showLog("manifest文件:   " + assets.toString());
                this.showLog("manifestUrl:    " + assets.nativeUrl);

                this.storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'hotUpdate-remote-asset');

                let self = this;
                let versionCompareHandle = function (versionA: string, versionB: string) {
                    self.showLog("进入对比函数")
                    let vA = versionA.split('.');
                    let vB = versionB.split('.');
                    for (let i = 0; i < vA.length; ++i) {
                        let a = parseInt(vA[i]);
                        let b = parseInt(vB[i] || '0');
                        if (a === b) {
                            continue;
                        } else {
                            return a - b;
                        }
                    }
                    if (vB.length > vA.length) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                };

                this.am = new jsb.AssetsManager(this.manifestNativeUrl, this.storagePath, versionCompareHandle);
                this.am.setVerifyCallback(function (path: string, asset: any) {
                    return true;
                });

                this.checkUpdate();
            }
        })
    }

    showLog(msg: string) {
        cc.log('[HotUpdateModule][showLog]----' + msg);
    }

    /**
     * 检测更新回调函数
     */
    public checkCb(event: jsb.EventAssetsManager): void {

        this.showLog(event.getEventCode().toString());
        this.showLog(event.getMessage());
        
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.showLog("已经是最新版本了");
                AppFacade.getInstance().sendNotification(NotifDefEntry.OPEN_LOBBY);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.showLog("有新版本,需要更新");
                this.needUpdate = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION: {
                //有新版本
                let percent = event.getPercent();
                if (isNaN(percent)) return;
                var msg = event.getMessage();
                this.showLog("checkCallback更新进度：" + percent + ', msg: ' + msg);
                return;
            }
            default:
                this.showLog('event.getEventCode():' + event.getEventCode());
                return;
        }

        this.am.setEventCallback(null);
        this.isUpdating = false;
        if (this.needUpdate) {
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
                this.showLog("没有本地manifest文件");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                AppFacade.getInstance().sendNotification(NotifDefEntry.UPDATE_PROGRESS, event.getDownloadedBytes() + '/' + event.getTotalBytes());
                this.showLog("更新进度....");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.showLog("解析和下载错误");
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.showLog("已经是最新版本了");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.showLog("更新完毕");
                this.needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.showLog("更新失败");
                this.isUpdating = false;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.showLog("更新错误");
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.showLog("解压错误")
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
            this.showLog("获取本地的 manifest 搜索路径:" + newPaths);
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
            this.showLog("游戏正在更新中")
            return;
        }

        if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
            this.am.loadLocalManifest(this.manifestNativeUrl);
        }

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
            this.failCount = 0;
            this.am.update();
            this.isUpdating = true;
        }
    }

    onDestroy() {
        this.am.setEventCallback(null);
    }
}