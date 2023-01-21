### 正则表达式与模式匹配

#### 定义

#### 模式匹配的字符串方法

#### RegExp类





### 正则表达式的应用

**利用正则实现千分位**

```
'123456'.replace(/(\d)(?=(\d{3})+$)/g,'$1,');
```

**利用正则实现获取URL中的参数值**

正则表达式(不理解)

```jsx
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
 }
```

split拆分（已理解，必会）

```jsx
function getQueryVariable(variable){
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
```

`window.location`的一些属性

若网址的URL为`http://www.baidu.com:8080/a/b?id=123&pwd=123456#name`

| 属性     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| hash     | 从井号 (#) 开始的 URL（锚）-->#name                          |
| host     | 主机名和当前 URL 的端口号   --> www.baidu.com:8080           |
| hostname | 当前 URL 的主机名  -->www.baidu.com                          |
| href     | 完整的 URL -->http://www.baidu.com:8080/a/b?id=123&pwd=123456#name |
| pathname | 当前 URL 的路径部分 -->/a/b                                  |
| port     | 当前 URL 的端口号 -->8080                                    |
| protocol | 当前 URL 的协议  -->http                                     |
| search   | 从问号 (?) 开始的 URL（查询部分） -->?id=123&pwd=123456      |

**全文首字母大写**

```
function ReplaceFirstUper(str)  
{     
    str = str.toLowerCase();     
    return str.replace(/\b(\w)|\s(\w)/g, function(m){  
        return m.toUpperCase();  
    });    
}

console.log(ReplaceFirstUper('i have a pen, i have an apple!'));
```

**驼峰命名法转为横划线命名法**（互转）

```
var str = 'ct-button'
   var res = str.replace(/-([a-z])/, function (all, i) {
​    return i.toUpperCase()
   })
   console.log(res)
```

**验证QQ合法性（5~15位、全是数字、不以0开头）：**

```js
const reg = /^[1-9][0-9]{4,14}$/
const isvalid = patrn.exec(s)
```

**校验用户账号合法性（只能输入5-20个以字母开头、可带数字、“_”、“.”的字串）：**

```js
var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
const isvalid = patrn.exec(s)
```

**将`url`参数解析为对象**

```js
const protocol = '(?<protocol>https?:)';
const host = '(?<host>(?<hostname>[^/#?:]+)(?::(?<port>\\d+))?)';
const path = '(?<pathname>(?:\\/[^/#?]+)*\\/?)';
const search = '(?<search>(?:\\?[^#]*)?)';
const hash = '(?<hash>(?:#.*)?)';
const reg = new RegExp(`^${protocol}\/\/${host}${path}${search}${hash}$`);
function execURL(url){
    const result = reg.exec(url);
    if(result){
        result.groups.port = result.groups.port || '';
        return result.groups;
    }
    return {
        protocol:'',host:'',hostname:'',port:'',
        pathname:'',search:'',hash:'',
    };
}

console.log(execURL('https://localhost:8080/?a=b#xxxx'));
protocol: "https:"
host: "localhost:8080"
hostname: "localhost"
port: "8080"
pathname: "/"
search: "?a=b"
hash: "#xxxx"
```

再将上面的`search`和`hash`进行解析

```js
function execUrlParams(str){
    str = str.replace(/^[#?&]/,'');
    const result = {};
    if(!str){ //如果正则可能配到空字符串，极有可能造成死循环，判断很重要
        return result; 
    }
    const reg = /(?:^|&)([^&=]*)=?([^&]*?)(?=&|$)/y
    let exec = reg.exec(str);
    while(exec){
        result[exec[1]] = exec[2];
        exec = reg.exec(str);
    }
    return result;
}
console.log(execUrlParams('#'));// {}
console.log(execUrlParams('##'));//{'#':''}
console.log(execUrlParams('?q=3606&src=srp')); //{q: "3606", src: "srp"}
console.log(execUrlParams('test=a=b=c&&==&a='));//{test: "a=b=c", "": "=", a: ""}
```

[正则表达式不要背 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903845227659271#heading-15)
