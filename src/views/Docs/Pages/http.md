# 短信接入

该接口为【http】接口

>接口地址：/api/sendJson

### 基本信息

<hr/>

|接口名称|接口地址|请求方法|数据类型|响应类型|
|--------|--------|--------|--------|--------|
| 接入接口 |/api/sendJson|POST|X-WWW-FORM-URLENCODED|Json|

### 请求参数

<hr/>

|参数名称|是否必填|类型|默认值|描述|
|--------|--------|--------|--------|--------|
|api_account|<span class="red">true</span>|string||账号|
|api_pwd|<span class="red">true</span>|string||密码|
|phone|<span class="red">true</span>|string||手机号|
|sms_content|<span class="red">true</span>|string||短信内容带标签|
|app_id|<span class="red">true</span>|string||应用ID|
|timestamp|<span class="red">true</span>|string||时间戳|
|sign|<span class="red">true</span>|string||签名md5加密上面的数据,<a target="_blank" href="http://ywhl106.com/#/Docs" class="blue">参考签名机制</a>|

### 响应数据

<hr/>

|参数名称|数据类型|描述|
|--------|--------|--------|
|code|number|状态码,<a target="_blank" href="http://ywhl106.com/#/Docs?doc=code" class="blue">参考状态代码</a>|
|msg|string|状态描述|
|data|string|返回的数据|

> 例子

```json
{
"code": 213701,
"msg": "参数错误！",
"data": ""
}
```

