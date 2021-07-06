/**
 * http 封装
 * @author dk
 * 利用 Promise的形式封装Http请求
 *    发送get请求
      发送post请求
 * 20201-06-26
 */

export default class Http {

     private xhr: XMLHttpRequest;
     /**
      * 构造器
      */
     constructor() {
          this.xhr = new XMLHttpRequest();
          this.xhr.ontimeout = this.onTimeOut;
          this.xhr.onerror = this.onTimeOut;
     }

     /**
      * 发送get请求
      * get请求带参数data
      */
     public async SendGetRequest(url: string, data: any): Promise<any> {
          return new Promise((resolve, reject) => {
               this.send(url, SENT_TYPE.GET, data, resolve, reject);
          })
     }

     /**
      * 发送post请求
      * data
      */
     public async SendPostRequest(url: string, data: any) {
          return new Promise((resolve, reject) => {
               this.send(url, SENT_TYPE.POST, data, resolve, reject);
          })
     }

     /**
      * 发送请求
      * @param url 地址 
      * @param type  get post 
      * @param data  数据
      * @param resolve  promise relsoe 返回
      * @param reject  
      */
     private send(url: any, type: number, data: any, resolve, reject): void {
          if (type == SENT_TYPE.GET) {
               this.xhr.open("GET", url, true);
               this.xhr.withCredentials = true;
               this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
               this.xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
               this.xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
               this.xhr.setRequestHeader("Content-Type", "application/json");
               this.xhr.setRequestHeader('Authorization', '');
               this.xhr.timeout = 8000;
          } else {
               this.xhr.open("POST", url);
          }
          this.xhr.onreadystatechange = this.onReadyStateChange.bind(this, resolve, reject, url, type);
     }

     /**
      * 超时处理
      */
     private onTimeOut() {
          // 打印错误
          // 处理重连
     }

     /**
      * 数据变化回调函数
      * @param data 
      */
     private onReadyStateChange(resolve, reject, url, type) {
          if (this.xhr.readyState == 4 && this.xhr.status == 200) {
               let jsData = JSON.stringify(this.xhr.responseText);
               resolve(jsData);
          } else {
               reject(this.xhr.status);
          }
     }
}

enum SENT_TYPE {
     GET,
     POST
}