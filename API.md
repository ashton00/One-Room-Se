
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
POST /api/login
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
