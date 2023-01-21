then(),catch(),finally()都会返回一个新的Promise实例，这也是能够进行链式调用的原因

那么返回的新的实例的状态是什么呢？

**then()与catch()的小结**

不管是`.then(onFulfilled, onRejected)`，还是`.catch(onRejected)`，它们返回的`Promise`实例的状态都取决于回调函数是否抛出异常，以及返回值是什么。

- 如果回调函数的返回值是一个状态为`rejected`的`Promise`实例，那么`.then`, `.catch`返回的`Promise`实例的状态就是`rejected`。
- 如果回调函数的返回值是一个还未决议的`Promise`实例`p2`，那么`.then`, `.catch`返回的`Promise`实例`p1`的状态取决于`p2`的决议结果。
- 如果回调函数中抛出了异常，那么`.then`, `.catch`返回的`Promise`实例的状态就是`rejected`，并且`reason`是所抛出异常的对象`e`。
- 其他情况下，`.then`, `.catch`返回的`Promise`实例的状态将是`fulfilled`。

**finally()的小结**

不管当前Promise的状态是`fulfilled`还是`rejected`，只要在`onFinally`中没有发生以下任何一条情况，`finally`方法返回的新的`Promise`实例的状态就会与当前Promise的状态保持一致！这也意味着即使在`onFinally`中返回一个状态为`fulfilled`的`Promise`也不能阻止新的`Promise`实例采纳当前`Promise`的状态或值！

- 返回一个状态为或将为`rejected`的Promise
- 抛出错误

总的来说，在`finally`情况下，`rejected`优先！

