import { dateFormat } from "vux"
export default {
    dateFormat,
    moneyFormat(val){
        let d = val.split(".");
        let s = null;
        let m = d[0].length % 3
        if(d[0] == 0){
            s =  d[0].match(/\d{0,3}/g);
            s.pop();
        }else {
            for (let i = 0 ; i < 3 - m ; i++){
                d[0] = "-"+d[0]
            }
            s = d[0].match(/(\d|-){0,3}/g);
            s.pop();
        }
        return s.join(",").replace(/-/g,"").replace(/^,/,"") + "." + d[1];
    },
    showStatus(status){
        let statusStr = '';
        try {
            switch(status.toString()){
                case '1':
                    statusStr="等待审核";
                    break;
                case '2':
                    statusStr="通过审核";
                    break;
                case '3':
                    statusStr="审核驳回";
                    break;
                case '4':
                    statusStr="等待发送";
                    break;
                case '5':
                    statusStr="发送中";
                    break;
                case '6':
                    statusStr="发送完毕";
                    break;
                case '7':
                    statusStr="已取消";
                    break;
                default:
                    break;
            }
        }catch (e){}
        return statusStr;
    },
    receiveStatus(status){
        let statusStr = '';
        try {
            switch(status.toString()){
                case '10':
                    statusStr="发送成功";
                    break;
                case '20':
                    statusStr="发送失败";
                    break;
                default:
                    break;
            }
        }catch (e){}
        return statusStr;
    }
}