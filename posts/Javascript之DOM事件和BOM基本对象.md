# Javascript

## 事件高级

### 1.注册事件（绑定事件）

​	1.1注册事件方式分为传统方式和方法监听注册方式

传统方式的特点：唯一性，同一个元素同一个事件只能注册一个处理函数

方法监听注册方式的特点：同一个元素同一个事件可以注册多个监听器，按注册顺序执行

1. 2 addEventListener 事件监听方式 

   eventTarget.addEventListener(type, listener, [useCapture])

   type:事件类型字符串，如click，mouseover（无on）

   listener：事件处理函数，事件发生时，调用监听函数

   useCapture：默认为false

**1.3 attachEvent 事件监听方式 

​	eventTarget.attachEvent(eventNameWithOn, callback) 

​	eventNameWithOn：事件类型字符串，如onclick，onmouseover

​	callback：事件处理函数，当事件被触发调用回调函数







### 2.删除事件（解绑事件）

2.1删除事件

传统方式：target.onclick=null;

方法监听注册方式：

分别对应注册事件

①eventTarget.removeEventListener(type, listener, [useCapture]);

②eventTarget.detachEvent(eventNameWithOn, callback);





### 3.DOM事件流

定义：事件流描述的是从页面中接收事件的顺序。

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流。

DOM事件流分为三个阶段：捕获阶段，当前目标阶段，冒泡阶段

比如我们给一个div 注册了点击事件，那么由于onclick是冒泡事件，那么div对应的body，html，document元素都相当于执行了onclick

![image-20210907014642860](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907014642860.png)



**注意**

1.JS 代码中只能执行捕获或者冒泡其中的一个阶段。

2.onclick 和 attachEvent 只能得到冒泡阶段。

3.addEventListener(type, listener[, useCapture])第三个参数如果是 true，表示在事件捕获阶段调用事件处理程序；如果是 false（不写默认就是false），表示在事件冒泡阶段调用事件处理程序。

4.实际开发中我们很少使用事件捕获，我们更关注事件冒泡。

5.有些事件是没有冒泡的，比如 onblur、onfocus、onmouseenter、onmouseleave

6.事件冒泡有时候会带来麻烦，有时候又会帮助很巧妙的做某些事件，我们后面讲解。



### 4.事件对象

4.1定义：event 对象代表事件的状态，比如键盘按键的状态、鼠标的位置、鼠标按钮的状态，事件对象有很多的属性和方法

 

4.2eventTarget.onclick = function(event) {} 

 eventTarget.addEventListener('click', function(event) {}）

 // 这个 event 就是事件对象，我们还喜欢的写成 e 或者 evt 

event是形参，不需要设定实参传递过去，当注册事件时，event对象会被系统自动创建，并依次传递给事件监听器（事件处理函数）



4.3事件对象的兼容性问题，w=w|window.event(在 IE6~8 中，浏览器不会给方法传递参数,需要window.event获取传递)



4.4事件对象的属性和方法

![image-20210907091158865](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907091158865.png)



### 5.阻止事件冒泡

5.1事件冒泡：开始由指定的元素接收，然后逐层向上传播到DOM最顶层界节点

两种组织事件冒泡的方式：1.标准方式e.stopPropagation()方法 2.IE6-8中利用事件对象window.event.cancelBubble=true

### 6.事件委托（代理、委派）

事件委托的原理：给父节点添加侦听器（事件处理函数），利用事件冒泡影响每一个子节点

### 7.常用的鼠标事件

7.1常见的鼠标事件

![image-20210907093813189](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907093813189.png)

1.禁止鼠标右键菜单

contextmenu主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单

document.addEventListener('contextmenu', function(e) {

e.preventDefault();

})

2.禁止鼠标选中（selectstart 开始选中）

document.addEventListener('selectstart',function(e){

e.preventDefault();

})



7.2鼠标事件对象

event对象代表事件的状态，跟事件相关的一系列信息的集合。现阶段我们主要是用鼠标事件对象 MouseEvent 和键盘事件对象 KeyboardEvent。

![image-20210907094102447](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907094102447.png)

### 8.常用的键盘事件

![image-20210907094338897](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907094338897.png)

键盘事件触发的顺序：onkeydown->onkeypress->onkeyup,一般使用onkeyup和onkeydown居多

![image-20210907094432538](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907094432538.png)

e.keyCode即可返回某个被按下键盘的ASCII值









## BOM浏览器对象模型

### 1.BOM 概述

1.1定义

BOM（Browser Object Model）即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。

1.2构成

![image-20210907095201196](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907095201196.png)

**window** 对象是浏览器的顶级对象，它具有双重角色。

1.它是 JS 访问浏览器窗口的一个接口。

2.它是一个全局对象。定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法。

在调用的时候可以省略 window，前面学习的对话框都属于 window 对象方法，如 alert()、prompt() 等。

**注意：**window下的一个特殊属性 window.name



### 2.window 对象的常见事件

2.1窗口加载事件

window.onload = function(){}

或者 

window.addEventListener("load",function(){});

PS:onload是等页面内容全部加载完毕后，再去处理执行函数的



document.addEventListener('DOMContentLoaded',function(){})

PS：DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash等等（IE9以上适合）

当页面内容中的图片过多，onload需要较长的时间时，交互效果不能实现影响用户体验，此时使用DOMContentLoaded



2.2调整窗口大小事件

 window.onresize = function(){}

 window.addEventListener("resize",function(){});

当窗口的大小被改变时，该事件被触发

window.innerWidth返回当前屏幕的宽度



### 3.定时器

3.1window 对象给我们提供了 2 个非常好用的方法-定时器。

1.setTimeout() 

2.setInterval() 



3.2setTimeout()

window.setTimeout(调用函数, [延迟的毫秒数]);（调用函数可以用“onclick”）

setTimeout() 方法用于设置一个定时器，该定时器在定时器到期后执行调用函数。



3.3clearTimeout()，停止setTimeout（）定时器

 window.clearTimeout(timeoutID)(timeountID是定时器的标识符，window可省略)



3.4setInterval()定时器

window.setInterval(回调函数, [间隔的毫秒数]);

setInterval() 方法重复调用一个函数，每隔这个时间，就去调用一次回调函数。



3.5 停止 setInterval()定时器

window.clearInterval(IntervalD)



### 4.JS 执行机制

4.1JS单线程的特性

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。这是因为 Javascript 这门脚本语言诞生的使命所致——JavaScript 是为处理页面中用户的交互，以及操作 DOM 而诞生的



4.2同步与异步

由于多核计算机的兴起，为了解决JS单线程特性的问题提高CPU利用率，HTML5允许Javascript脚本创建多个线程，出现同步与异步

所谓同步的本质就是程序的执行顺序与任务的排列顺序是一致的、同步的

异步的本质就是程序的执行顺序与任务的排序顺序不一致，异步



4.3同步与异步

同步

同步任务都在主线程上执行，形成一个执行栈。

异步

JS 的异步是通过回调函数实现的。

一般而言，异步任务有以下三种类型:

1、普通事件，如 click、resize 等

2、资源加载，如 load、error 等

3、定时器，包括 setInterval、setTimeout 等

异步任务相关回调函数添加到**任务队列**中（任务队列也称为消息队列）。



4.4JS的执行机制

1. 先执行执行栈中的同步任务。

2. 异步任务（回调函数）放入任务队列中。

3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。

   ![image-20210907163407247](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907163407247.png)

由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环（ event loop）。



4.5this的指向问题

一般情况下this的最终指向是那个调用它的对象

1.全局作用域或者普通函数中的this指向全局对象window

2.方法调用中谁调用this指向谁

3.构造函数中this指向构造函数的实例



### 5.location 对象

5.1location对象定义

window 对象给我们提供了一个 location 属性用于获取或设置窗体的 URL，并且可以用于解析 URL 。 因为这个属性返回的是一个对象，所以我们将这个属性也称为 location 对象。

5.2URL

URL的一般语法格式：

protocol://host[:port]/path/[?query]#fragment

http://www.itcast.cn/index.html?name=andy&age=18#link

![image-20210907171532361](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907171532361.png)



5.3location对象的属性

![image-20210907171556330](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907171556330.png)



5.4location对象的方法

![image-20210907171717753](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907171717753.png)

### 6.navigator 对象

navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

下面前端代码可以判断用户哪个终端打开页面，实现跳转if((**navigator.userAgent**.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

  window.location.href = "";   //手机

 } else {

  window.location.href = "";   //电脑

 }

### 7.history 对象

window给我们提供history对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的 URL。

![image-20210907171910138](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20210907171910138.png)
