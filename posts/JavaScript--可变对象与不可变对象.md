众所周知，JavaScript拥有7中基本数据类型，boolean，number,object,null,undefined,string,以及ES6新增的symbol(作用是作为对象的属性的唯一标识符)

怎么样使得可变对象变得不可变呢？

JavaScript通过控制对象的增删改来实现不可变对象化，由弱到强的程度为Object.preventExtensions,Object.seal,Object.freeze



1.不可扩展

```
var obj=Object.preventExtensions({});

//直接定义新的属性会报错

Object.defineProperty(obj,'content',{

value:'hello'

});

//非严格模式下通过符号添加不会报错，但是会静默失败

obj.content='hello';

obj.content;//-->undefined
```

对应的，Object.isExtensible()可以判断一个对象是否可以扩展

```js
var obj = new Object();
Object.isExtensible(obj); // true
Object.preventExtensions(obj);
Object.isExtensible(obj); // false
```



2.密封

```
var obj={content:'hello'};

Object.getOwnPropertyDescriptor(obj,'content');
//F12查看obj的属性
Object {
value: "hello",
writable: true,
enumerable: true,
configurable: true}
```

`Object.seal()` 可以使一个对象无法添加新属性的同时，也无法删除旧属性。参数是目标对象，返回修改后的对象。

**其本质是通过修改属性的 `configurable` 为 `false` 来实现的。**



3.冻结

`Object.freeze()` 可以使对象一个对象不能再添加新属性，也不可以删除旧属性，且不能修改属性的值

需要注意的是，这些都是浅层控制的，**只能控制对象本身属性的增删改，但是不能控制对象属性的增删改！也不能控制对象原型属性的增删改！**这就是浅层控制！

