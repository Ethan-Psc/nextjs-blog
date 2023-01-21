**什么是循环引用？**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feade304111949c381399eb35e86b699~tplv-k3u1fbpfcp-watermark.awebp)



```
function circularReference() 
{  let obj1 = {};  
let obj2 = {    b: obj1  };  
obj1.a = obj2; }
```

**循环引用与垃圾回收机制的关系**

某一个引用类型的值的引用计数为0时，垃圾收集器会将其回收。

`var obj1 = new Array();`

obj1是数组的引用，若obj1指向另外的引用类型的值，那么数组就会被垃圾收集器回收。

循环引用会导致对象在没有作用的情况下引用计数不能为0，也就意味着传统垃圾回收机制无法处理循环引用的变量，造成内存泄漏。

在现在广泛采用的标记清除回收策略中就不会出现上面的问题，标记清除回收策略的大致流程是这样的：

1.将所有的变量加上标记，

2.当执行 cycularReference 函数的时候会将函数内部的变量这些标记清除

3.在函数执行完后再加上标记。

循环引用的变量在走完上述流程后被标记，标记后并在关心引用的次数，因此能正常回收。



**循环引用的对象使用 JSON.stringify 为什么会报错**

把循环引用对象打印到控制台会发现一个无限相互引用的情形：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb46383e2e2421f98c302d1da1056b4~tplv-k3u1fbpfcp-watermark.awebp)

MDN表示JSON.stringfy()对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出出错误



Solution

下载一个JSON的扩展包https://github.com/douglascrockford/JSON-js，使用其中decycle.js 这个文件

```
function circularReference() {
  let obj1 = {};
  let obj2 = {
    b: obj1
  };
  obj1.a = obj2;
  let c = JSON.decycle(obj1);
  console.log(JSON.stringify(c));
}
circularReference();
```

