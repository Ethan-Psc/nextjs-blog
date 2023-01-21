### 对象的两类属性

对象的属性只有两种类型：字符串和Symbol。若以对象作为对象的属性，那么对象会被隐式调用Object.prototype.toString.call(),返回[object Object]

```
var sybProp = Symbol()
var strProp = 'str'
var objProp = {}

var obj = {
  [sybProp]: 'This is a String property',
  [strProp]: 'This is a Symbol property',
  [objProp]: 'This is also a String property'
}

obj
// {
//   str: "This is a String property",
//   [object Object]: "This is also a String property",
//   Symbol(): "This is a Symbol property"
// }


```

### 获取属性的方法

Object.definePorperty(obj,prop,descriptor)

> obj: 要在其上定义属性的对象。 
>
> prop:  要定义或修改的属性的名称。 
>
> descriptor: 将被定义或修改的属性的描述符。

其中的descriptor中的enumerable值为false，则说明对象的对应属性为不可枚举的类型

![image-20220303141456480](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20220303141456480.png)

PS：补充一下属性的枚举顺序

`for...in`，`Object.keys()`的属性的枚举顺序不定，取决于Javascript引擎，可能因为浏览器而异

`Object.getOwnPropertyNames()`,`Object.getOwnPropertySymbols()`和`Object.assign()`的枚举顺序是有确定性的。先以升序枚举数值键，再按照插入顺序遍历字符串键和符号键。对于对象字面量来说按照逗号分隔的顺序





**`Object.getOwnPropertyDescriptor()`** 方法返回指定对象上一个自有属性对应的属性描述符

`Object.defineProperty`中描述的对象的属性的`descriptor`分为存取描述符和属性描述符

`Object.prototype.isPropertyOf(obj)`--->obj.\__proto__===Object.prototype?

`Object.setPrototypeOf(obj,target)`-->obj.\__proto__===target

`obj.hasOwnProperty(target)`-->obj有target这个实例属性吗
