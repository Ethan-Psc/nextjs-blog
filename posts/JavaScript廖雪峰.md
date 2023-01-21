# JavaScript廖雪峰

## 基本语法

### Map和Set

#### Map

初始化：var m=new Map();

var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);

添加新的key-value：m.set('Adam',65);

删除指定的key：m.delete('Adam')

检验是否有指定的key：m.has('Adam')-->return true

获取key对应的value：m.get('Adam')



#### Set

初始化：var s= new Set();

var s=new Set([1,2,3,'3'])

添加新的key：s.add('s')

删除指定的key：s.delete('s')



### iterable

Array，Set，Map都属于iterable类型，属于iterable类型的对象都可以使用for...of循环来遍历



#### for...in和for...of

##### for...in

for..in遍历的实际上是对象的属性名称，对于一个Array数组来说，每个对象的索引下标被视为对象的属性

```
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
```

##### for...of

for...of只遍历集合本身的元素

```
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A' ,'B','C'
}
```



#### forEach方法

iterable内置的forEach，它接受一个函数，每次迭代就自动回调该函数

Set，Map，Array的回调函数的参数不相同

**Array的回调函数**

var a=['a','b','c'];

a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});

**Map的回调函数**

```
var s = new Set(['A', 'B', 'C']);
s.forEach(function (element, sameElement, set) {
	//element，sameElement都是当前元素本身
	//set指向的是set对象本身
    console.log(element);
});
```

**Set的回调函数**

```
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
	//value,key分别对应元素的value，key
	//map指向的是map对象本身
    console.log(value);
});
```





### 函数

#### JavaScript函数特性

##### arguments

Javascript中的参数的数量任意个，不影响调用，arguments是关键字，只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数

在函数内部可以直接使用arguments[0]获得调用者传入的参数，直接使用argument.length直接获取传入参数的个数

##### rest参数

```
function foo(a, b, ...rest)
rest参数只能写在最后，使用...标识，传入的参数先绑定a，b，多余的参数以数组的形式交给rest，所以不再需要arguments就能获得所有参数
```

JavaScript引擎有一个在行末自动添加分号的机制，因此定义函数时要注意你的return语句不要出错



#### 变量的作用域与解构赋值

##### 变量提升

JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部，因此为了避免出错，在JavaScript中要把声明的变量先声明了

##### 名字空间

全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中

```
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能



##### 局部定义域

Javascript的变量作用域实际上是函数内部，因此在for循环等语句块中是无法定义具有局部作用域的变量：

for(var i=0;i<10;i++){}

i++;//在for语句块中的变量的作用域是整个函数内部，为了申明一个块级作用域的变量（只在for语句块中起作用）

使用let替代var可以申明一个块级作用域的变量



##### 解构赋值

‘use strict’:   -->说明处于严格模式

作用是减少代码量

对多个变量同时赋值：

```
var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
```

解构赋值可以忽略某些元素：

`let[,,z]=['hello','JavaScript','ES6'];`

`z;//'ES6'`

解构赋值便于快速获取对象的指定属性：

`var person={name:'小明',age:20,gender:'male'};`

`var {name,age,gender}=person;`//分别被赋值为对应属性

`var person={name:'小明',age:20,address:{city:'Beijing',street:'No.1 Road'}};`

`var {name,address:{city,street}}=person;`

解构赋值还可以使用默认值

`var{name,single=true}=person;`

对于已经声明的变量再次解构赋值要用小括号括起来：

`var x,y;`

`({x,y}={name:'小明',x:100,y:50});`

###### **使用场景：**

交换x和y值

`[x,y]=[y,x]`

快速获取当前页面的域名和路径

```
var {hostname:domain, pathname:path} = location;
```



##### 方法

**this的调用问题**

坑一：在方法内部，this是一个特殊变量，始终指向当前对象，也就是xiaoming这个变量；若单独调用函数，那么此时函数的this指向全局对象，也就是window对象

```
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN
var fn=xiaoming.age;//先拿到xiaoming的age函数
fn();//NaN，为了使得this指向xiaoming这个变量，必须用obj.xxx（）调用！在严格模式下这样调用直接报错
```



坑二：

```
'use strict';

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
    （var that=this;）
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
            (return y-that.birth;)
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
报错的原因是this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向window对象
```

在方法内部定义其他函数时，添加一个var that=this;

//捕获this，避免出错



**apply**

函数本身的apply方法（接收两个参数，第一个参数是需要绑定的this变量，第二个参数是Array）可以指定函数的this指向哪个对象

另一个与apply（）类似的方法是call（），唯一区别是

- `apply()`把参数打包成`Array`再传入；

- `call()`把参数按顺序传入。

  Math.max.apply(null,[3,5,4]);-->5

  Math.max.apply(null,3,5,4);-->5

利用apply（），我们可以动态改变函数的行为

如果我们想统计代码一共调用多少次parseInt（）：

```
'use strict';

var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
```

##### 高阶函数

一个接收另一个函数作为参数的函数叫做高阶函数

**map/reduce**

map

作为高阶函数，调用Array的map()方法：

```
'use strict';

function pow(x) {
    return x * x;
}
var arr=[1,2,3,4];
var results=arr.map(pow);//[1,4,9,16]
或者var result=arr.map(x=>x*x)
或者
var results=arr.map(String);//['1','2','3','4'];
var results=arr.map(str=>parseInt(str));
```

reduce

```
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x + y;
});// 25
arr.reduce((x,y)=>x+y);
```

**filter**

filter是一个常用的操作，它用于把`Array`的某些元素过滤掉，然后返回剩下的元素。

```
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法,trim() 方法用于删除字符串的头尾空白符
});
r; // ['A', 'B', 'C']
```

回调函数

filter()接收的回调函数的参数element，index，self

var arr=['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

var r=arr.filter(function(element,index,self){

return self.indexOf(element)==index});

**sort**

sort()方法会直接对Array进行修改，它返回的结果仍是当前Array

sort也是高阶函数，直接使用sort排序数字数组会出错

[10,20,1,2].sort()-->[1,10,2,20]

[10,20,1,2].sort(function(x,y){

if(x<y)return -1;

if(x>y)return 1;

return 0;

})-->[1,2,10,20]

**Array**

every->`every()`方法可以判断数组的所有元素是否满足测试条件

`var arr = ['Apple', 'pear', 'orange'];`
`console.log(arr.every(function (s) {`
    `return s.length > 0;`
`})); // true, 因为每个元素都满足s.length>0`

find-->`find()`方法用于查找符合条件的第一个元素

findIndex-->`findIndex()`会返回查找符合条件第一个元素的索引

forEach-->`forEach()`常用于遍历数组

arr.forEach(console.log); // 依次打印每个元素

##### 闭包

##### 箭头函数

##### generator





### 标准对象

#### Date

#### RegExp

#### JSON



### 浏览器

#### 操作表单

HTML表单的输入控件主要有以下几种：

- 文本框，对应的`<input type="text">`，用于输入文本；
- 口令框，对应的`<input type="password">`，用于输入口令；
- 单选框，对应的`<input type="radio">`，用于选择一项；
- 复选框，对应的`<input type="checkbox">`，用于选择多项；
- 下拉框，对应的`<select>`，用于选择一项；
- 隐藏文本，对应的`<input type="hidden">`，用户不可见，但表单提交时会把隐藏文本发送到服务器

##### 获取值（设置值）

如果已经获得一个input节点的引用，那么直接调用value就可以获得对应的用户输入值

但是对于单选框和复选框来说，value值指的是HTML预设的值，调用checked才能获得对应用户输入

##### HTML5控件

```
date`、`datetime`、`datetime-local`、`color
<input type="date" value="2015-07-01">
```

##### 提交表单

1.通过<form>的submit()方法去提交一个表单

```
<!-- HTML -->
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>

<script>
function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}
</script>
```

缺点是扰乱了浏览器对form的正常提交。浏览器默认`<button type="submit">`时提交表单，或者用户在最后一个输入框按回车键

2.通过相应<form>本身的onsubmit事件

```
<!-- HTML -->
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 继续下一步:
    return true;
}
</script>
```

注意要`return true`来告诉浏览器继续提交，如果`return false`，浏览器将不会继续提交form，这种情况通常对应用户输入有误，提示用户错误信息后终止提交form



在检查和修改`<input>`时，要充分利用`<input type="hidden">`来传递数据。例如在很多登录表单希望用户输入用户名和口令，但是，安全考虑，提交表单时不传输明文口令，而是口令的MD5。

```
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var pwd = document.getElementById('password');
    // 把用户输入的明文变为MD5:
    //这个做法看上去没啥问题，但用户输入了口令提交时，口令框的显示会突然从几个*变成32个*（因为MD5有32个字符）
    //只要利用好<input type="hidden">就可以实现不改变用户的输入
    pwd.value = toMD5(pwd.value);
    // 继续下一步:
    return true;
}
</script>
```

PS：没有`name`属性的`<input>`的数据不会被提交。



#### 操作文件

在HTML表单中，可以上传文件的唯一控件就是`<input type="file">`。

*注意*：当一个表单包含`<input type="file">`时，表单的`enctype`必须指定为`multipart/form-data`，`method`必须指定为`post`，浏览器才能正确编码并以`multipart/form-data`格式发送表单的数据。

出于安全考虑，浏览器只允许用户点击`<input type="file">`来选择本地文件，用JavaScript对`<input type="file">`的`value`赋值是没有任何效果的。当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径：

##### File API

HTML5的File API提供了`File`和`FileReader`两个主要对象，可以获得文件信息并读取文件。





#### Ajax

Js异步执行的四种方式

1、回调函数--把同步操作变成异步，f1不会阻塞程序运行，相当于先执行程序的主要逻辑将耗时的延迟执行
function f1(callback){
	setTimeout(function(){
		//f1的代码
		callback();
	},1000)
}
f1(f2);
2、事件监听--f1执行完成后立即触发done事件从而执行f2
f1.on("done".f2);
function f1(){
	setTimeout(function(){
		//f1的代码量
		f1.trigger("done");
	},1000)
}
3、发布订阅模式（观察者模式）--f1执行完后向信号中心jQuery发布done信号从而引发f2的执行
jQuery.subscribe("done",f2);
function f1(){
	setTimeout(function(){
		//f1的代码
		jQuery.publish("done");
	},1000)
}
4、Promises对象--每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数
f1().then(f2).then(f3);



