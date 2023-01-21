- `Intersection Observer`，交叉观察者。
- `Mutation Observer`，变动观察者（红宝书有详实的例子暂且不表）。
- `Resize Observer`，视图观察者。
- `Performance Observer`，性能观察者

![image-20220411175945132](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20220411175945132.png)

[现代浏览器观察者 Observer API 指南 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903976937209863)

### Intersection Observer

#### 1.出现的意义

想要计算Web页面的元素的位置偏移尺寸，视口尺寸，滚动尺寸，会依赖于DOM的显示查询，每一次访问会引起回流，且不停轮询带来大量的性能浪费。

对于这些问题，发展了以下的几种方案：

- 构建DOM和数据的自定义预加载和延迟加载。
- 实现了数据绑定的高性能滚动列表，该列表加载和呈现数据集的子集。
- 通过`scroll`等事件或通过插件的形式，计算真实元素可见性。

而它们都有几项共同特点：

1. 基本实现形式都是查询各个元素相对与某些元素（全局视口）的“被动查询”。
2. 信息可以异步传递（例如从另一个线程传递），且没有统一捕获错误的处理。
3. `web`平台支持匮乏，各有各家的处理。需要开发人员消耗大量精力兼容。



#### 2. `IntersectionObserver`的优势

`Intersection Observer API`通过为开发人员提供一种新方法来异步查询元素相对于其他元素或全局视口的位置，从而解决了上述问题:

- **异步处理**消除了昂贵的`DOM`和样式查询，连续轮询以及使用自定义插件的需求。
- 通过消除对这些方法的需求，可以使应用程序显着降低`CPU`，`GPU`和资源成本。

#### 3. `IntersectionObserver`基本使用

使用`IntersectionObserver API`主要需要三个步骤：

1. 创建观察者
2. 定义回调事件
3. 定义要观察的目标对象



##### 1）创建观察者

```
const options = {
		  root:document.querySelector('.scrollContainer'),
	rootMargin:'0px',
	threshold:[0.3,0.5,0.8,1],
}
//1.root:指定一个根元素
//2.rootMargin:指定根边距，会影响根元素的观察影响范围
//3.threshold:阈值，可以为数组，[0.3,0.5,0.8,1]意味着当目标元素占根元素可见区域的30%,50%,80%,100%会触发处理函数
```

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/22/16df3610c9bf7742~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

rootMargin的图例

##### 2）定义回调函数

当目标元素与根元素到达阈值相交时，就会触发回调函数。

```
function handler (entries, observer) { 
    entries.forEach(entry => { 
    // 每个成员都是一个IntersectionObserverEntry对象。
    // 举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
    // entry.boundingClientRect 目标元素的位置信息
    // entry.intersectionRatio 目标元素的可见比例
    // entry.intersectionRect 交叉部分的位置信息
    // entry.isIntersecting 目标元素是否可见
    // entry.rootBounds 根元素的位置
    // entry.target 
    // entry.time 时间戳
    }); 
}

```



##### 3）定义要观察的目标对象

任何目标元素都可以通过调用.observe(target)方法来观察。

```
const target = document.querySelector('.targetBox');
observer.observe(target);
//停止对某个目标的监听
observer.unobserve(target);
//终止对所有目标的监听
observer.disconnect();
```



#### 4.`IntersectionObserver`的使用场景

##### 例子1：图片懒加载

`HTML`:

```
<img src="placeholder.png" data-src="img-1.jpg">
<img src="placeholder.png" data-src="img-2.jpg">
<img src="placeholder.png" data-src="img-3.jpg">
<!-- more images -->
复制代码
```

脚本：

```
let observer = new IntersectionObserver(
(entries, observer) => { 
entries.forEach(entry => {
    /* 替换属性 */
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
  });
}, 
{rootMargin: "0px 0px -200px 0px"});

document.querySelectorAll('img').forEach(img => { observer.observe(img) });
复制代码
```

上述例子表示 仅在到达视口距离底部200px视加载图片。

PS：margin的负值是什么含义

[浅谈margin负值 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/25892372)

![preview](https://pic3.zhimg.com/v2-a7d813afe7ab2c6c4233146609d00dfa_r.jpg)

红色箭头的方向是margin为正值时的移动方向；那么margin为负值时，移动方向相反。

PS：元素背景的范围

`background-color` 属性为元素设置一种纯色。这种颜色会**填充元素的内容、内边距和边框区域，扩展到元素边框的外边界**（但不包括外边距）。如果边框有透明部分（如虚线边框），会透过这些透明部分显示出背景色。



##### 例子2：兴趣埋点

```
const boxList = [...document.querySelectorAll('.box')]

var io = new IntersectionObserver((entries) =>{
  entries.forEach(item => {
    // intersectionRatio === 1说明该元素完全暴露出来，符合业务需求
    if (item.intersectionRatio === 1) {
      // 。。。 埋点曝光代码
      io.unobserve(item.target)
    }
  })
}, {
  root: null,
  threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
})

// observe遍历监听所有box节点
boxList.forEach(box => io.observe(box))
复制代码
```

至于怎样评断用户是否感兴趣，记录方式就见仁见智了：

- 位于屏幕中间，并停留时长大于2秒，计数一次。
- 区域悬停，触发定时器记录时间。
- `PC`端记录鼠标点击次数/悬停时间，移动端记录`touch`事件



**例子3：控制动画/视频**

`HTML`:

```
<video src="OSRO-animation.mp4" controls=""></video>
复制代码
```

`js`:

```
let video = document.querySelector('video');
let isPaused = false; /* Flag for auto-paused video */
let observer = new IntersectionObserver((entries, observer) => { 
  entries.forEach(entry => {
    if(entry.intersectionRatio!=1  && !video.paused){
      video.pause(); isPaused = true;
    }
    else if(isPaused) {video.play(); isPaused=false}
  });
}, {threshold: 1});
observer.observe(video);
```

原理也比较简单，当我们目标元素占根元素可视区域100%时，视频播放play；否则，视频暂停pause。





### Resize Observer

#### 1. 出现的意义

- 开发过程当中经常遇到的一个问题就是如何监听一个 `div` 的尺寸变化。
- 但众所周知，为了监听 `div` 的尺寸变化，都将侦听器附加到 `window` 中的 `resize` 事件。
- 但这很容易导致性能问题，因为大量的触发事件，可能会导致布局出错。

`window.resize` 通常是浪费的，因为它告诉我们每个视窗大小的变化，而不仅仅是当一个元素的大小发生变化。

> `resize`事件会在一秒内触发将近60次，很容易在改变窗口大小时导致性能问题

比如说，你要调整一个元素的大小，那就需要在 `resize` 的回调函数 `callback()` 中调用 `getBoundingClientRect` 或 `getComputerStyle`。不过你要是不小心处理所有的读和写操作，就会导致布局混乱。比如下面这个小示例：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/23/16df805c03bd6059~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

#### 2. `ResizeObserver`的优势

`ResizeObserver API` 的核心优势有两点：

- 细颗粒度的`DOM`元素观察，而不是`window`
- 没有额外的性能开销，只会在绘制前或布局后触发调用

#### 3. `ResizeObserver`基本使用

使用`ResizeObserver API`同样也是三个步骤：

1. 创建观察者

   let observer = new ResizeObserver(callback);

2. 定义回调函数

   ```
   const callback = entries => {
       entries.forEach(entry => {
           
       })
   }
   复制代码
   ```

   每一个`entry`都是一个对象，包含两个属性`contentRect`和`target` ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/23/16df8340db8bb93f~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

   `contentRect`(只读的)都是一些位置信息：

   | 属性     | 作用                                        |
   | -------- | ------------------------------------------- |
   | `bottom` | `top + height`的值                          |
   | `height` | 元素本身的高度，不包含`padding`，`border`值 |
   | `left`   | `padding-left`的值                          |
   | `right`  | `left + width`的值                          |
   | `top`    | `padidng-top`的值                           |
   | `width`  | 元素本身的宽度，不包含`padding`，`border`值 |
   | `x`      | 大小与`top`相同                             |
   | `y`      | 大小与`left`相同                            |

   

3. 定义要观察的目标对象

```
observer.observe(document.body);
//取消单个观察
observer.unobserve(document.body);
//取消所有结点观察
observer.disconnect();
```

