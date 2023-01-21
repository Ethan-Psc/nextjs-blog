## 执行上下文

当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的**执行上下文**(execution context)。

对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this



### 深入变量对象

变量对象与实行上下文相关的数据作用域。执行上下文分为全局上下文和函数上下文。变量对象在两个上下文稍有不同。

#### 全局上下文

全局上下文中的变量对象就是全局对象。

#### 函数上下文

函数上下文的代码会分为两个阶段（分析，执行）进行处理，在这两个阶段中变量对象怎么被创建出来呢？

**分析阶段，这个时候进入了函数上下文。**

变量对象包括函数的所有形参，函数的声明和变量的声明（如果变量的声明与函数重名，那么函数优先）

举个例子

```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}
foo(1);
```

进入分析阶段，这时候的变量对象（活动对象）是这样的：

```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

可以发现，arguments先被初始化，形参也被初始化了。上下文会添加函数声明（reference to function c(){}），变量声明（undefined）的初始值

**执行阶段，也就是顺序执行代码，修改变量对象的值**

还是原来的例子：

```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}
foo(1);
```

执行后的对象变量（活动变量，AO）为

```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

可以发现，形参，函数声明，变量声明的值都修改



**变量对象的创建过程**

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值



### 深入作用域链

#### 什么是作用域链？

在**深入变量对象**中提到，查找**变量**的过程中，会从**当前上下文**的变量对象中去查找。如果没有就从**父级的执行上下文**的变量对象去查找。这个由执行上下文的变量对象构成的**链表**叫做**作用域链**



函数的作用域在函数定义的时候就决定了

因为函数有一个内部属性[[scope]],当函数创建的时候，就会保存在所有的父变量对象到其中。

举个例子

```
function foo() {
    function bar() {
        ...
    }
}
```

函数创建的时候，各自的[[scope]]

```
foo.[[scope]]=[
	globalContext.VO
]
bar.[[scope]]=[
	fooContext.AO,
	globalContext.VO
]
```

当函数激活（执行函数时），进入函数上下文，创建了VO/AO后，就会将活动对象（变量对象）放在作用域链的前端

```
Scope = [AO].concat([[scope]])
```



#### 变量对象与作用域链在函数执行中的流程

```
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

1.checkscope函数被创建，保存作用域到内部属性[[scope]]

```
checkscope.[[scope]]=[
	globalContext.VO
];
```

2.执行checkscope函数，创建checkscope函数执行上下文，此函数执行上下文被压入执行上下文栈

```
ECStack = [
	checkscopeContext,
	globalContext
]
```

3.**执行函数前**，进入函数上下文的**分析阶段**

4.复制函数[[scope]]属性创建作用域链

```
checkscopeContext ={
Scope: checkscope.[[scope]];
}
```

5.用auguments创建活动对象，随后初始化活动对象，加入形参，函数声明，变量声明

```
checkscopeContext ={
AO:{
arguments:{
length:0
},
scope2:undefined
}
Scope: checkscope.[[scope]];
}
```

6.将活动对象AO压入作用域链的最前端

```
checkscopeContext ={
AO:{
arguments:{
length:0
},
scope2:undefined
}
Scope: [AO,checkscope.[[scope]]];
}
```

7.**分析阶段结束**，进入执行上下文**执行阶段**

8.随着函数的执行，修改AO活动对象的属性值

```
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

9.查找到scope2，返回scope的值即可，函数执行完毕，checkscope函数上下文从执行上下文栈弹出

```
ECScope =[
globalContext
];
```





### 深入this

[JavaScript深入之从ECMAScript规范解读this · Issue #7 · mqyqingfeng/Blog (github.com)](https://github.com/mqyqingfeng/Blog/issues/7)

如果简单地把this理解为调用函数的对象，就无法解释以下例子的输出结果，下面我们就来看看this的值是怎么被确认的。

```
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
console.log((false || foo.bar)()); // 1
console.log((foo.bar=foo.bar)()); // 1
console.log((foo.bar,foo.bar)()); // 1
console.log((foo.bar)()); // 2
console.log(foo.bar()); // 2
```

#### 前置知识

**Types**

ECMAScript分为语言类型和规范类型。

语言类型就是开发者可以直接操作的，规范类型使用算法规范ECMAScript的语言类型的，是一种存在于规范的类型。



**Reference**

Reference是ECMAScript规范类型中的一种。它能更好地描述语言的底层逻辑，解释诸如delete，typeof以及赋值等操作行为。

Reference 的构成，由三个组成部分，分别是：

- base value（属性所在的对象或者EnvironmentRecord）
- referenced name（属性的名称）
- strict reference（是否严格模式）

获得Reference组成部分的方法是GetBase，IsPropertyReference

```
var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
//返回Reference对象的属性值
isPropertyReference(fooReference)//true
//是否为Reference
```

****



**什么是MemberExpression**

```
foo(); // MemberExpression 是 foo
foo()(); // MemberExpression 是 foo()
foo.bar(); // MemberExpression 是 foo.bar
```

简单来说，（）左边的部分就是



**判断ref（MemberExpression）是否为Reference类型**

参考更多的ECMAScript规范后，总结出一些规律

对于foo对象来说，

```
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
```

foo.bar是Reference类型

(foo.bar)是Reference类型的

(foo.bar = foo.bar)不是Reference类型的

(false || foo.bar)()不是Reference类型的

(foo.bar, foo.bar)()不是Reference类型的

根据前文，如何确定this的取值，(foo.bar = foo.bar)不是Reference类型，那么this为undefined，在浏览器中会隐式转换为window！



#### 如何确定this的值

函数调用时，如何确定this的取值

> 1.计算MemberExpression的结果赋值给ref

> 6.如果ref是Reference类型

> ```
>   a.If IsPropertyReference(ref) is true, then
> ```

> ```
>       i.Let thisValue be GetBase(ref).
> ```

> ```
>   b.Else, the base of ref is an Environment Record
> ```

> ```
>       i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
> ```
>
> 7.Else, Type(*ref*) is not Reference.

> ```
>   a. Let thisValue be undefined.
> ```



![image-20220302153846798](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20220302153846798.png)







```
function fn(){
	return this.length+1;
}
function fn2(){
	return length+1;
}
var length =10;
var obj = {
length:5,
test1:function(){
return fn();},
test4:function(){
	var length=5;
	return fn2();
},
};
obj.test2=fn;
obj.test1()//-->11
fn()//-->11
obj.test2()//-->6
obj.test3=fn2;
obj.test3();//-->11
obj.test4();//-->11
函数的作用域在函数定义的时候就已经确认了！！！
```

