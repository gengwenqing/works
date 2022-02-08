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

     private static ins: Http;

     public static getIns(): Http {
          if (Http.ins == null) {
               Http.ins = new Http()
          }
          return Http.ins;
     }
     /**
      * 构造器
      */
     constructor() {
          this.xhr = new XMLHttpRequest();
          this.xhr.ontimeout = this.onTimeOut;
          this.xhr.onerror = this.onTimeOut;
     }


     Get(url, callback) {
          let xhr = cc.loader.getXMLHttpRequest();
          xhr.onreadystatechange = function () {
              // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
              if (xhr.readyState === 4 && xhr.status == 200) {
                  let respone = xhr.responseText;
                  let rsp = JSON.parse(respone);
                  callback(rsp);
              } else if (xhr.readyState === 4 && xhr.status == 401) {
                  callback({status:401});
              } else {
                  //callback(-1);
              }
  
  
          };
          xhr.withCredentials = true;
          xhr.open('GET', url, true);
  
          // if (cc.sys.isNative) {
          xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
          xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader('Authorization', '' );
          // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
          // }
  
          // note: In Internet Explorer, the timeout property may be set only after calling the open()
          // method and before calling the send() method.
          xhr.timeout = 8000;// 8 seconds for timeout
  
          xhr.send();
      }
  
      /**
       * post请求
       * @param {string} url 
       * @param {object} params 
       * @param {function} callback 
       */
      Post(url, params, callback) {
          let xhr = cc.loader.getXMLHttpRequest();
          xhr.onreadystatechange = function () {
              // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
              if (xhr.readyState === 4 && xhr.status == 200) {
                  let respone = xhr.responseText;
                  let rsp = JSON.parse(respone);
                  callback(rsp);
              } else {
               //    callback(-1);
              }
          }; 
          xhr.open('POST', url, true);
          // if (cc.sys.isNative) {
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
          xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader('Authorization', '');
          // }
  
          // note: In Internet Explorer, the timeout property may be set only after calling the open()
          // method and before calling the send() method.
          xhr.timeout = 8000;// 8 seconds for timeout
  
          xhr.send(JSON.stringify(params));
      }
}

enum SENT_TYPE {
     GET,
     POST
}