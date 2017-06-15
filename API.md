
## API

## 一、用户操作

### 注册

```
POST /api/users
```

|字段|类型|
|--|--|
|phone|Number|
|password|String|

成功返回

```
{
  "time": "2017-06-08T09:16:19.705Z",
  "data": {},
  "msg": "注册成功"
}
```

失败返回

```
{
  "time": "2017-06-08T09:29:33.448Z",
  "msg": "当前用户已经存在"
}
```

### 登录

```
POST /api/users/login
```


|字段|类型|
|--|--|
|phone|Number|
|password|String|

成功返回

```
{
  "time": "2017-06-08T09:25:54.183Z",
  "data": [
    {
      "UserId": "00000000000000000013",
      "Realname": null,
      "Nickname": null,
      "Gender": null,
      "Email": null,
      "Level": null,
      "Points": null,
      "CeateAt": null,
      "IDCard": null,
      "isDelete": 0,
      "isValid": 0
    }
  ],
  "msg": "登录成功"
}
```

失败返回

账号密码错误

```
{
  "time": "2017-06-08T09:27:31.153Z",
  "msg": "登录失败，密码错误"
}
```

```
{
  "time": "2017-06-08T09:28:05.965Z",
  "msg": "登录失败，用户未注册"
}
```

### 忘记密码

> 暂时还没有介入手机短信服务，所以暂时不需要Code字段，但请预留该字段

```
POST /api/users/forgetpsw
```

|字段|类型|
|--|--|
|phone|Number|
|password|String|
|Code|Number|

成功返回

```
{
  "time": "2017-06-12T02:09:16.777Z",
  "data": null,
  "msg": "修改密码成功"
}
```

## 二、商户

### 注册

```
POST /api/merchants
```

|字段|类型|
|--|--|
|phone|Number|
|password|String|
|realname|String|
|email|String|
|QQorWechat|String|
|jobTitle|String|
|company|String|
|address|String|
|zipCode|Number|
|description|Text|

成功返回

```
{
    "time": "2017-06-15T08:48:28.708Z",
    "data": null,
    "msg": "注册成功"
}
```



失败返回

```
{
    "time": "2017-06-15T08:51:58.663Z",
    "msg": "当前商户已经存在"
}
```

### 登录

```
POST /api/merchants/login
```

|字段|类型|
|--|--|
|phone|Number|
|password|String|

成功返回

```
{
    "time": "2017-06-15T08:52:58.268Z",
    "data": [
        {
            "MerchantId": 1,
            "Account": null,
            "Phone": 18819253689,
            "Email": "test@qq.com",
            "Level": null,
            "Points": null,
            "CreateAt": "2017-06-15T08:48:28.000Z",
            "QQorWechat": "123",
            "Company": "no money company",
            "Address": "sysu",
            "Description": "test",
            "JobTitle": "test",
            "Realname": "GS",
            "ZipCode": "510000"
        }
    ],
    "msg": "登录成功"
}
```

失败返回


```
{
    "time": "2017-06-15T08:53:47.913Z",
    "msg": "登录失败，商户未注册"
}
```


```
{
    "time": "2017-06-15T08:54:08.220Z",
    "msg": "登录失败，密码错误"
}
```

### 修改密码

|字段|类型|
|--|--|
|phone|Number|
|password|String|

> password是新密码

```
POST /api/merchants/forgetpsw
```

成功返回

```
{
    "time": "2017-06-15T08:55:06.878Z",
    "data": null,
    "msg": "修改密码成功"
}
```


## 三、提交建议

### 创建一个建议

```
POST /api/suggestions
```

|字段|类型|
|--|--|
|phone|Number|
|name|String|
|description|text|


成功返回

```
{
    "time": "2017-06-15T15:38:02.196Z",
    "data": null,
    "msg": "提交建议成功"
}
```


### 获取用户的建议

```
GET /api/suggestions?phone=12345678
```

成功返回

```
{
    "time": "2017-06-15T15:40:19.435Z",
    "data": [
        {
            "SuggestionId": 1,
            "Phone": 18819253689,
            "name": "GS",
            "Description": null,
            "isReply": 0,
            "isSolve": 0,
            "Solution": null,
            "Reply": null
        },
        {
            "SuggestionId": 2,
            "Phone": 18819253689,
            "name": "GS",
            "Description": null,
            "isReply": 0,
            "isSolve": 0,
            "Solution": null,
            "Reply": null
        }
    ],
    "msg": "获取用户建议信息成功"
}
```

### 获取单条建议

```
GET /api/suggestions/:id
```

成功返回

```
{
    "time": "2017-06-15T15:42:42.139Z",
    "data": {
        "SuggestionId": 1,
        "Phone": 18819253689,
        "name": "GS",
        "Description": null,
        "isReply": 0,
        "isSolve": 0,
        "Solution": null,
        "Reply": null
    },
    "msg": "获取建议信息成功"
}
```
