## 事件循环

### 是什么

`Javascript`是一门单线程的语言，意味着同一时间只能做一件事情。**能够实现单线程非阻塞的方法叫做事件循环**。

在`Javascript`中，所有的任务分为同步任务和异步任务。而任务执行的顺序为，同步任务进入主线程按顺序完成，异步任务进入事件队列等待同步任务完成后再执行。

同步任务执行完后再执行异步任务，异步任务的执行顺序是具有优先级的，优先执行微任务。

整体事件循环的流程就是执行`scirpt`脚本中的同步任务，接着把同步任务中产生的宏任务和微任务分别放入对于的事件队列中，先进先出。等待同步任务执行完成后，执行微任务，如果微任务中继续产生新的微任务，那么就继续执行新产生的微任务；等待微任务执行完毕，执行宏任务队列中队首的宏任务。循环往复，就是事件循环。

![GitHub](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/27/170847d202084604~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

### 宏任务与微任务

#### 微任务

一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

常见的微任务有：

- `Promise.then`
- `MutaionObserver`
- `Object.observe`（已废弃；Proxy 对象替代）
- `process.nextTick（Node.js）`

#### 宏任务

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

常见的宏任务有：

- `script` (可以理解为外层同步代码)
- `setTimeout/setInterval`
- `UI rendering/UI`事件
- `postMessage`、`MessageChannel`
- `setImmediate`、`I/O（Node.js）`

PS：如何理解`script`整个代码块是一个宏任务？

实际上如果存在两个`script`代码块，那么会在执行完第一个`script`代码块的所有同步代码后，再执行由此创建了为任务队列里的微任务。直到微任务队列处理完了，再去开启第二个代码块的执行。

### async与await

`async`是异步，`await`可以理解为async wait，即等待异步事件执行。

async函数会返回一个Promise对象

await后面跟着的代码都会被阻塞，如果后面跟的不是Promise值，那么就直接返回对象的值

**Javascript在遇到await时，会记录函数在哪里暂停执行。等到await右边的值可用的时候，Javascript运行时会向消息队列推送一个任务，这个任务会恢复异步函数的执行**

**在新版浏览器中，await 8相当于await Promise.resolve(8)，是一个异步任务**

```js
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)
//await fn2()
执行fn2，阻塞后面的console.log(2)
```

### 案例

**await后面跟着async2是同步函数**

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

最后的结果是：`script start`、`async1 start`、`async2`、`promise1`、`script end`、`async1 end`、`promise2`、`settimeout`



**await后面跟着async是异步函数**

```
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
    return new Promise(resolve,reject).then(()=>{console.log(async2 end)})
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

最后的结果是：`script start`、`async1 start`、`async2`、`promise1`、`script end`、`async2 end`、`promise2`、`async1 end`、`settimeout`





### 另一种事件循环的流程图

![image-20200322201434386](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0387c06eb2904b649f29bad1a12f9f4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

> 1. 一个Event Loop可以有一个或多个事件队列，但是只有一个微任务队列。
> 2. 微任务队列全部执行完会重新渲染一次
> 3. 每个宏任务执行完都会重新渲染一次
> 4. requestAnimationFrame处于渲染阶段，不在微任务队列，也不在宏任务队列

