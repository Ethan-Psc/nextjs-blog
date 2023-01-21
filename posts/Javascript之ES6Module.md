## Module（模块）

### 是什么

module是能够单独命名并独立完成一定功能的程序语句的集合，即数据结构和程序代码的集合体。

两个基本特征：外部特征和内部特征

外部特征：模块与外部环境联系的接口以及模块本身的功能

内部特征：模块内部环境具有的特点

### 为什么

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

如果没有模块化，我们代码会怎样？

- 变量和方法不容易维护，容易污染全局作用域

- 加载资源的方式通过script标签从上到下。

- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。

- 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃

  因此需要将Javascript程序模块化的机制

  **1.CommonJs(node.js早期)**

  一套Javascript模块规范，**用于客户端**。特点是同步加载；首次运行后缓存；require返回的值是拷贝值，模块内变量与返回值没有联系。

  在服务器中，最好不要使用同步加载，要使用异步加载。

  ```
  module.exports = {};//在这里写要暴露外部的变量与函数
  const http =  require('http')；//引用核心模块不需要加上路径，引入其他自定义模块时，要写路径，.js可以省略
  ```
  
  在CommonJs模块化中的导出方式有两种
  
  ```
  // B.js
  // 定义了函数show
  function show() {
  	console.log('show方法被调用')
  }
  
  // 定义了变量count
  let count = 3
  
  /*--------------  导出方法  --------------*/
  
  // 第一种
  module.exports = {
  	show,
  	count
  }
  
  // 第二种
  exports.show = show
  exports.count = count
  
  ```
  
  > 第二种方法中，exports内部指向module.exports，所以我们执行exports.对象或者exports.函数时，就会把对象和函数导入到module.exports对象中。
  
  在CommonJs模块化的导入方式
  
  ```
  // A.js
  const bModule = require('./B.js')
  
  console.log(bModule.count)  // 3
  
  bModule.show()  // show方法被调用
  
  ```
  
  导入后我们实际上接收到一个bModule的对象。
  
  另外，比较特别的是，`require` 方法还可以接收一个表达式作为参数，代码如下
  
  ```javascript
  let fileName = 'B.js'
  const bModule = require('./' + fileName)
  ```
  
  因此，我们是可以动态的改变并决定模块的加载导入路径的。
  
  **2.AMD(require.js)**
  
  AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。这里介绍用require.js实现AMD规范的模块化：用`require.config()`指定引用路径等，用`define()`定义模块，用`require()`加载模块。
  
  首先我们需要引入require.js文件和一个入口文件main.js。main.js中配置`require.config()`并规定项目中用到的基础模块。
  
  ```
  /** 网页中引入require.js及main.js **/
  <script src="js/require.js" data-main="js/main"></script>
  
  /** main.js 入口文件/主模块 **/
  // 首先用config()指定各模块路径和引用名
  require.config({
    baseUrl: "js/lib",
    paths: {
      "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
      "underscore": "underscore.min",
    }
  });
  // 执行基本操作
  require(["jquery","underscore"],function($,_){
    // some code here
  });
  复制代码
  ```
  
  引用模块的时候，我们将模块名放在`[]`中作为`reqiure()`的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在`[]`中作为`define()`的第一参数。
  
  ```
  // 定义math.js模块
  define(function () {
      var basicNum = 0;
      var add = function (x, y) {
          return x + y;
      };
      return {
          add: add,
          basicNum :basicNum
      };
  });
  // 定义一个依赖underscore.js的模块
  define(['underscore'],function(_){
    var classify = function(list){
      _.countBy(list,function(num){
        return num > 30 ? 'old' : 'young';
      })
    };
    return {
      classify :classify
    };
  })
  
  // 引用模块，将模块放在[]内
  require(['jquery', 'math'],function($, math){
    var sum = math.add(10,20);
    $("#sum").html(sum);
  });
  ```
  
  
  
  
  **3.CMD(sea.js)**Common Module Defination
  
  4.ESM（ES6的模块规范）
  
  5.UMD Universal Model Defination
  
  CommonModuleDefination

**ES6的Module完全取代CommonJS和AMD规范，称为客户端和服务端的模块解决方案。**

**ES6的设计思想是尽量的静态化，在编译时执行前就确定模块的依赖关系，以及输入和输出的变量。**

### 怎么用

- `export`：用于规定模块的对外接口

- `import`：用于输入其他模块提供的功能或变量

  > 输入的变量都是只读的，不允许修改，但是如果是对象，允许修改属性
  >
  > 给输入的变量起别名用as

### 在哪用

Vue，React项目中日常使用



### Module和CommonJS的区别

这两者的主要区别主要有以下两点：

1. 对于模块的依赖，CommonJS是**动态的**，ES6 Module 是**静态的**

2. CommonJS导入的是值的**拷贝**（浅拷贝），ES6 Module使用非默认导入时，导入的是值的**引用**。

   > ES6 Module使用默认导入export default（当作匿名函数）时，导入的是值的拷贝
   >
   > 在CommonJS中，exports是一个对象，修改exports会导致全局的exports值发生改变。
   
   一个例题：
   
   //a.js
   
   const b = require('./b.js');
   
   console.log(exports.x);
   
   exports.x = 'x';
   
   require('./c.js');
   
   //b.js
   
   const a = require('./a.js');
   
   console.log(a);
   
   a.x='y';
   
   //c.js
   
   const a = require('./a.js');
   
   console.log(a.x);

最后可以发现当node a.js时，输出结果为{},y,x。说明CommonJS导出的值是拷贝（浅拷贝）。

#### 区别一

对于模块的依赖，何为**动态**？何为**静态**？

动态是指对于模块的依赖关系建立在代码执行阶段； 静态是指对于模块的依赖关系建立在代码编译阶段；

上文提到，CommonJS导入时，`require` 的路径参数是支持表达式的，例如

```javascript
// A.js
let fileName = 'example.js'
const bModule = require('./' + fileName)
复制代码
```

因为该路径在代码执行时是可以动态改变的，所以如果在代码编译阶段就建立各个模块的依赖关系，那么一定是不准确的，只有在代码运行了以后，才可以真正确认模块的依赖关系，因此说CommonJS是动态的。

那么现在你也应该也知道为什么 ES6 Module 是静态的了吧

#### 区别二

为了验证这一点，我准备用实例来演示一下

首先来验证CommonJS，代码如下

```javascript
// B.js
let count = 3

function change() {
    count ++    // 变量count + 1
    console.log('原count值为：', count);  // 打印B.js模块中count的值
}

module.exports = {
    count,
    change
}

// A.js
let count = require('./B.js').count 
let change = require('./B.js').change

console.log('改变前：', count);   
change()     // 调用模块B.js中的change方法，将原来的count + 1
console.log('改变后：', count); 

// 运行A.js文件的结果
改变前：3
原count值为：4
改变后：3
```

在上述代码中我们可以看到，在 `A.js` 文件中导入了 `B.js` 文件中的变量 `count` 和 函数 `change`，因为导入的 `count` 只是对原有值的一个拷贝，因此尽管我们调用了函数 `change` 改变了 `B.js` 文件中变量 `count` 的值，也不会影响到 `A.js` 文件中的变量 `count`

根据这个结果得出结论：CommonJS导入的变量是对原值的拷贝

------

接下来再来验证一下ES6 Module，代码如下

```javascript
// B.js
let count = 3

function change() {
    count ++        // 变量count + 1
    console.log(count);   // 打印B.js模块中count的值
}

export {count, change}

// A.js
import {count, change} from './B.js';

console.log('改变前：',count);

change()         // 调用模块B.js中的change方法，将原来的count + 1

console.log('改变后：', count);

// 运行A.js文件的结果
改变前：3
原count值为：4
改变后：4
```

相比较于CommonJS的结果，ES6 Module导入的变量 `count` 随着原值的改变而改变了

根据这个结果得出结论：ES6 Module导入的变量是对原值的引用

> **注意：** 若ES6 Module是通过默认导入的变量，则只是对原模块中值的拷贝，不再是引用关系





### 深入理解`CommonJS`模块原理

1.利用闭包实现各个模块全局变量的隔离，避免变量冲突

在`hello.js`的模块中，代码如下：

```
var s = 'Hello';
var name = 'world';

console.log(s + ' ' + name + '!');
```

当`Node.js`加载`hello.js`模块时，会对这个模块进行一层封装：

```
(function () {
    // 读取的hello.js代码:
    var s = 'Hello';
    var name = 'world';

    console.log(s + ' ' + name + '!');
    // hello.js代码结束
})();
```

原来的全局变量s变成了匿名函数中的局部变量，如果`Node.js`继续加载其他模块，那么其他模块的变量s与这里的s不会发生冲突。

所以`Node.js`利用`Javascript`的函数式编程的特性，轻而易举地实现了模块的隔离。



2.如何使用`module.exports`和`exports`实现模块的输出？

Node可以为每一个模块先准备一个对象module：

```
// 准备module对象:
var module = {
    id: 'hello',
    exports: {}
};
var load = function (module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }
    
    module.exports = greet;
    // hello.js代码结束
    return module.exports;
};
var exported = load(module);
// 保存module:
save(module, exported);
```

可见，`module`对象是`Node`事先准备好的一个变量，并将其传入`save`函数中保存`module`，这样一来，Node会把`module`保存在某个位置。当我们用`require()`获取module的时候，`Node`找到对应的`module`，并返回`module.exports`,这样，另一个模块就会获取到模块的输出。



在一个模块中，模块的输出变量可以通过module.exports和exports设置：

方法一：对`module.exports`赋值：

```
// hello.js

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

module.exports = {
    hello: hello,
    greet: greet
};
```

方法二：直接使用`exports`：

```
// hello.js

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

function hello() {
    console.log('Hello, world!');
}

exports.hello = hello;
exports.greet = greet;
```

实际上，之所以允许直接使用`exports`，是因为`Node`预先设置了`var exports = module.exports`，最终使用`require()`获取`module`时，都是返回`module.exports`。



明白了上述的原理，不难理解，若`exports = function(){console.log('hello!')}`，此时`module.exports`返回的对象为{}，给`exports`值直接赋值是无效的，因为直接赋值后，`exports`就不再是`module.exports`的引用了。



当你了解了`CommonJS`的模块原理后，模块输出的题目，就一点也不难理解了。
