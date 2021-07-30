
/**
 * 消息定义
 * @author dk
 * 2021-06-20
 */
export default class NotifDefEntry {
    /**设置姓名 */
    public static SET_NICKNAME: string = "set_nickname";

    /**点击按钮 */
    public static CLICK_BTN: string = "click_btn";

    /**热更新进度 */
    public static UPDATE_PROGRESS: string = "updateProgress";

    /**热更新进度 视图通知 */
    public static UPDATE_PROGRESS_VIEW: string = "updateProgressView";

    /**检测热更 */
    public static CHECK_HOTUPDATE: string = "check_hotupdate";

    /**开始热更 */
    public static START_HOTUPDATE: string = "start_hotUpdate";

    /**打开大厅 */
    public static OPEN_LOBBY: string = "open_lobby";
}