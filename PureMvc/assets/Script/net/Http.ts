/**
 * http 封装
 * @author dk
 * 利用 Promise的形式封装Http请求
 *    发送get请求
      发送post请求
 * 20201-06-26
 */

export default class Http {

     private _http: XMLHttpRequest;
     /**
      * 构造器
      */
     constructor() {
          this._http = new XMLHttpRequest();
     }

     /**
      * 发送get请求
      * get请求带参数data
      */
     public async SendGetRequest(data: any): Promise<any> {
          return new Promise((resolve, reject) => {
               
          })
     }

     /**
      * 发送post请求
      * data
      */
     public async SendPostRequest(data: any) {

     }

     /**
      * get请求
      * 从url带参数过去
      * @param data 
      */
     private getRequst(data){
          
     }

}