## Decorator

### 定义

用于扩展类属性和类方法的普通函数，是装饰器模式的实践。

使用装饰器，会使得代码的可读性变强，装饰器相当于一个注释；而且在不改变原代码的情况下，对原来的功能进行扩展。

### 用法

- 类的装饰

- 类属性的装饰

  **类的装饰**

  function decorator(target)

  //参数是要装饰的类

  **类属性（类方法）的装饰**

  当对类属性进行装饰的时候，能够接受三个参数：

  - 类的原型对象**target**

  - 需要装饰的属性名**name**

  - 装饰属性名的描述对象**descriptor**

    例：descriptor.writable会将name属性设置为不可写

> 注意：如果一个方法有多个装饰器，就像洋葱一样，先从外到内进入，再由内到外执行
>
> ```javascript
> function dec(id){
>     console.log('evaluated', id);
>     return (target, property, descriptor) =>console.log('executed', id);
> }
> 
> class Example {
>     @dec(1)
>     @dec(2)
>     method(){}
> }
> // evaluated 1
> // evaluated 2
> // executed 2
> // executed 1
> ```
>
> 
>
> 外层装饰器`@dec(1)`先进入，但是内层装饰器`@dec(2)`先执行

不能修饰函数，因为存在变量提升，因此会出错。



