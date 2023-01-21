### 事件

与浏览器发生的一系列交互行为，使得网页具有交互性。

DOM是一个树结构，如果父节点绑定了一个监听函数，当触发事件的时候，子节点也会响应。这就涉及到一个顺序（事件流）的概念



### 事件流

事件流都会经历三个阶段：

- 事件捕获阶段(capture phase)
- 目标阶段(target phase)
- 事件冒泡阶段(bubbling phase)

事件捕获：事件从文档的根结点流向目标对象结点，途中经过各个层级的DOM结点，最后到达目标结点，完成事件捕获

目标阶段：顾名思义，事件到达目标结点后触发事件

事件冒泡：事件从目标结点，途中经过各个结点，最后向上到达文档的根节点



### 事件模型

#### 原始事件模型

\<input type='button' onclick="fn()" >

或者通过JS绑定

特点是绑定速度快，甚至快于DOM加载渲染的时间，事件无法正常执行；只支持冒泡；同一个类型的事件只能绑定一个函数

#### 标准事件模型

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

```text
addEventListener(eventType, handler, useCapture)
useCapture:
```

参数如下：

- `eventType`指定事件类型(不要加on)
- `handler`是事件处理函数
- `useCapture`是一个`boolean`用于指定是否在捕获阶段进行处理，一般设置为`false`与IE浏览器保持一致 false默认在事件冒泡阶段响应事件；true为在事件捕获阶段响应事件







### event.target和event.currentTarget的区别

`event.target`指向引起触发事件的元素，而`event.currentTarget`则是事件绑定的元素，只有被点击的那个目标元素的`event.target`才会等于`event.currentTarget`。





### stopImmediatePropagation和stopPropagation的区别

阻止事件传播:event.stopPropagation()和event.cancelBubble=true可以相互替代。无论是事件捕获还是事件冒泡本质上都是事件传播的过程，可以被这两个API函数阻止

stopImmediatePropagation是stopPropagation的加强版。

它不但能够阻止事件传播，还可以使得绑定于相同结点相同事件类型的多个事件监听器只会被触发一次。

```
const p = document.querySelector('p');
p.addEventListener('mousedown',(event)=>{
console.log("p结点的第一个mousedown触发");
})
p.addEventListener('mousedown',(event)=>{
event.stopImmediatePropagation();
console.log("p结点的第二个mousedown触发");
})
p.addEventListener('mousedown',(event)=>{
console.log("p结点的第三个mousedown触发");
})
```

在上面的代码中，控制台输出

p结点的第一个mousedown触发

p结点的第二个mousedown触发

之后就不再输出了，因为使用了event.stopImmediatePropagation()
