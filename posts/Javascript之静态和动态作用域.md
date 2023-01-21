 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

这两句话大家都听过了，但是依然很难理解清楚，举一个例子：

```
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
// 结果是 ???
```

对于词法作用域来说

执行foo函数。先在foo函数内部找是否有value，没有value值的话，就查找定义foo函数的上面的代码，找到var value = 1。因此结果打印1。

对于动态作用域来说

执行foo函数。依旧先从foo函数内部是否有value，没有value值得话，就在调用函数的作用域也就是bar函数内部找，找到var value = 2。因此结果打印2。

