/**
 * 测试类
 * @author
 * 2021-06-26
 */

export default class Test {

    public async name() {
        return "你好";
    }

    public async tarce1(){
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                console.log("方法1.................");
                reslove("方法1");
            },2000)
        })
    }

    public async tarce2(){
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                console.log("方法2.................");
                reslove("方法2");
            },2000)
        })
    }

    public async tarce3(){
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                console.log("方法3.................");
                reslove("方法3");
            },2000)
        })
    }
    
    public async tarce4(){
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                console.log("方法4.................");
                reslove("方法4");
            },2000)
        })
    }

    public static removeRepeated(array: any[]): any[] {
        let newArray = [...new Set(array)];
        return newArray;
    }
}