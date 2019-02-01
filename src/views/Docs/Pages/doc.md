# 通讯方式

> 使用HTTP(S)作为通讯方式。

> 网址：http(s)://www.ywhl106.com



# 系统对接前准备

获取应用ID

获取渠道账号

获取渠道密码

获取系统接入URL

# 请求数据

**示例：** http://www.ywhl106.com/api/sendJson

>参数说明

|参数名称 |参数说明        |是否必选                     |备注                            |
|-------- |----------------|-----------------------------|--------------------------------|
|api_account|平台账号      |<span class="red">必选</span>|平台的账号|
|api_pwd  |平台秘钥         |<span class="red">必选</span>|平台的秘钥|
|timestamp  |UNIX时间戳         |<span class="red">必选</span>|请求时间与标准时间的误差不能超过10分钟|
|app_id   |应用id|<span class="red">必选</span>|应用的id|
|api_url     |应用地址            |<span>可选</span>|应用的接口地址|
|version     |应用版本            |<span>可选</span>|应用版本号|
|service     |服务类型            |<span>可选</span>|服务类型，例如：http、cmpp2、...|
|phone  |手机号  |<span class="red">必选</span>| 发送短信的手机号，可多个|
|sms_content   |短信内容        |<span class="red">必选</span>            |发送的短信内容，包含标签与模板|
|sign   |签名        |<span class="red">必选</span>            |<span class="blue">参考签名机制</span>|

<hr class="d"/>

### 返回数据


返回数据采用JSON格式，例如：

```json
{
    "code": 20000,
    "msg": "发送成功！",
    "data": ""
}
```

>参数说明

| 参数名称 | 参数说明 | 备注|
|----------|----------|-----|
|code|状态|返回的状态码,<a target="_blank" href="http://ywhl106.com/#/Docs?doc=code" class="blue">参考状态代码</a>|
|msg|描述|对状态的描述|
|data|数据|返回携带的数据|

# 签名机制

每一个对接的应用都会从平台获取一对签名密钥，通过这对密钥完成与平台交互时的签名和验证的过程。<br>
签名算法：MD5。<br>
服务请求的签名内容<br>
api_account,api_pwd,timestamp,app_id,service,sms_content 参数值的字符拼接：<br>
例如：app_id+timestamp+version+service+params<br>
注意：必须在生成签名后再对各参数进行URL编码。<br>
服务响应的签名内容<br>
code状态<br>
msg描述<br>
data数据<br>
