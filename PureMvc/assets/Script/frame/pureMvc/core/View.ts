/**
 * PureMvc 复写
 * 将源码直接引入项目中
 * @author DK
 * View类
 * 2021-06-19
 */

import IMediator from "../interfaces/IMediator";
import INotification from "../interfaces/INotification";
import IObserver from "../interfaces/IObserver";
import IView from "../interfaces/IView";
import Observer from "../patterns/observer/Observer";

export default class View implements IView {

    /**中介map */
    protected mediatorMap: Object = null;

    /**观察者map */
    protected observerMap: object = null;

    /**单例 key */
    multitonKey: string = null;

    constructor(key: string) {
        if (View.instanceMap[key])
            throw Error(View.MULTITON_MSG);

        View.instanceMap[key] = this;

        this.multitonKey = key;
        this.mediatorMap = {};
        this.observerMap = {};
        this.initializeView();
    }

    /** 子类继承 并初始化函数*/
    initializeView(): void {

    }

    /**
     * 注册观察者
     * @param notificationName 通知名称
     * @param observer 通知的观察者
     */
    registerObserver(notificationName: string, observer: IObserver): void {
        let observers: IObserver[] = this.observerMap[notificationName];
        if (observers)
            observers.push(observer);
        else
            this.observerMap[notificationName] = [observer];
    }

    /**
     * 删除观察者
     * @param notificationName  通知名称
     * @param notifyContext  观察者 执行域
     */
    removeObserver(notificationName: string, notifyContext: any): void {
        let observers: IObserver[] = this.observerMap[notificationName];
        let i: number = observers.length;
        while (i--) {
            let observer: IObserver = observers[i];
            if (observer.compareNotifyContext(notifyContext)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0)
            delete this.observerMap[notificationName];
    }

    /**
     * 响应观察者
     * @param notification 
     */
    notifyObservers(notification: INotification): void {
        let notificationName: string = notification.getName();
        let observersRef = this.observerMap[notificationName];
        if (observersRef) {
            // 复制数组
            let observers = observersRef.slice(0);
            let len = observers.length;
            for (let i = 0; i < len; i++) {
                let observer: IObserver = observers[i];
                observer.notifyObserver(notification);
            }
        }
    }

    /**
     * 注册 中介
     * @param mediator 
     * @returns 
     */
    registerMediator(mediator: IMediator): void {
        let name: string = mediator.getMediatorName();

        if (this.mediatorMap[name])
            return;

        mediator.initializeNotifier(this.multitonKey);

        // 映射map
        this.mediatorMap[name] = mediator;

        // 获取中介中的 监听事件字符串
        let interests: string[] = mediator.listNotificationInterests();
        let len: Number = interests.length;
        if (len > 0) {
            // 创建一个监听者
            let observer: IObserver = new Observer(mediator.handleNotification, mediator);

            // 注册监听者
            for (let i: number = 0; i < len; i++)
                this.registerObserver(interests[i], observer);
        }

        // 调用 onRegister方法
        mediator.onRegister();
    }

    /**
     * 通过名称返回中介
     * @param mediatorName 
     * @returns 
     */
    retrieveMediator(mediatorName: string): IMediator {
        return this.mediatorMap[mediatorName] || null;
    }

    /**
     * 删除中介
     * @param mediatorName 
     * @returns 
     */
    removeMediator(mediatorName: string): IMediator {
        let mediator: IMediator = this.mediatorMap[mediatorName];
        if (!mediator)
            return null;

        let interests: string[] = mediator.listNotificationInterests();

        let i: number = interests.length;
        while (i--)
            this.removeObserver(interests[i], mediator);

        delete this.mediatorMap[mediatorName];

        mediator.onRemove();

        return mediator;
    }

    hasMediator(mediatorName: string): boolean {
        return this.mediatorMap[mediatorName] != null;
    }


    /**多核心被构造错误提示 */
    static MULTITON_MSG: string = "View instanc 已经被构造";

    /**单例 map */
    static instanceMap: Object = {};

    /**
     * 获取单例
     * @param key 
     * @returns 
     */
    static getInstance(key: string): IView {
        if (!View.instanceMap[key])
            View.instanceMap[key] = new View(key);

        return View.instanceMap[key];
    }

    /**
     * 删除单例
     */
    static removeView(key: string): void {
        delete View.instanceMap[key];
    }
}