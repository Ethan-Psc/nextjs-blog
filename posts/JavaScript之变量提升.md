无论哪一种形式的声明都会存在变量提升的现象。



**区别**

`var`,`function`的声明会在提升时进行初始化赋值为 `undefined`，因此访问这些变量的时候，不会报 ReferenceError 异常，而使用 `let`,`const`,`class` 声明的变量，被提升后不会被初始化，这些变量所处的状态被称为“`temporal dead zone`”，此时如果访问这些变量会抛出`ReferenceError` 异常，看上去就像没被提升一样。



**提升的含义**

js代码执行前引擎会先进行预编译，预编译期间会将变量声明（`var`）与函数声明（`function`）提升至其对应作用域的最顶端

