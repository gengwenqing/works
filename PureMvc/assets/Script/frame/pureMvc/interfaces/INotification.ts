/**
 * PureMvc 复写
 * 将源码直接引入项目中
 * 
 * 接口 INotification
 * 通知接口
 * @author DK
 * 2021-06-19
 */

export default interface INotification {

    /**获取名字 */
    getName(): string;

    /**设置body */
    setBody(body: any): void;

    /**获取body */
    getBody(): any;

    /**设置类型 */
    setType(type: string): void;

    /**获取类型 */
    getType(): string;

    /**toString 方法 */
    toString(): string;
}