**MDN** 对闭包的定义为：

> 闭包是指那些能够访问自由变量的函数。

那什么是自由变量呢？

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

由此，我们可以看出闭包共有两部分组成：

> 闭包 = 函数 + 函数能够访问的自由变量



**ECMAScript**中，闭包指的是：

1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：
   1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
   2. 在代码中引用了自由变量



**一道必刷题**

```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

```
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```

跟没改之前一模一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：

```
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```

匿名函数执行上下文的AO为：

```
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

data[1] 和 data[2] 是一样的道理。





**闭包的使用场景**

延迟变量生命周期

> 一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用。即便创建时所在的执行上下文被销毁，但创建时的词法环境仍存在。这就是延迟变量的生命周期

创建私有变量

```
var Counter = function(){
	var privateNum = 0;
	function changeBy(i){
		privateNum+=i;
	}
	return {
		incresement:function(){
			changeBy(1);
		},
		decresement:function(){
			changeBy(-1);
		},
		value:function(){
			return privateNum;
		},
	}
}
//Counter类中的privateNum成为私有变量，无法访问。通过闭包访问私有变量，这种方式叫模块方式
```



在对象中定义方法最好不要使用闭包，也就是不要在对象中直接定义，因为闭包对处理速度和内存的消耗是很大的

避免在对象中使用`this.value`的方式定义方法，每一次创建对象都要创建一个新的方法，没有必要。

应该使用`obj.prototype.value`在对象的原型上定义方法。