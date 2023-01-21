### Generator函数

#### 定义

执行Generator函数会返回一个遍历器对象，可以依次执行Generator函数内部的每一个状态

形式上，Generator和普通函数有两个不同：

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```

1.function关键字和函数名之间有*

2.使用yield定义不同的内部状态



#### 使用

Generator函数会返回一个遍历器对象，即具有Symbol.iterator属性，并且返回给自己。

> Symbol.iterator：给每一个对象定义了默认的迭代器。该迭代器可以被for...of循环使用

> ```
> let arr=[1,2,3,4,5];
> 
> for(let i of arr[Symbol.iterator]()){
> 
> console.log(i);
> 
> }
> 
> // 1 2 3 4 5
> ```

通过yield关键字可以暂停generator函数返回的遍历器的对象的状态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
```

上述存在三个状态分别是hello，world，ending

- 遇到next方法才能遍历到下一个内部状态
- 遇到yield表达式，就会暂停执行后面的操作，并且把紧跟在yield后面表达式的值，作为返回对象的value值
- 下一次调用next值，往下继续执行
- 直到没有yield，遇到了return值，return 后面表达式的值同样作为返回对象的value值
- 如果没有return值，那么返回对象的value值为undefined
- 返回对象的done值表示是否还有下一个状态

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
//next()的参数被当成是上一次yield表达式的返回值
```



通过返回的遍历器对象，我们就可以使用let...of进行遍历



### 使用场景

#### 异步解决方案

以文件读取为例，比较四种异步解决方案

- 回调函数

- Promise 对象

- generator 函数

- async/await

  场景要求是先读取'/etc/fstab'的文件，在读取'/etc/shells'的文件，读取文件API为readFile

  读取文件模块为const fs=require('fs');



**回调函数**

```
fs.readFile('/etc/fstab',function(err,data){
	if(err)throw err;
	console.log(data);
	fs.readFile('/etc/shells',function(err,data){
		if(err)throw err;
		console.log(data);
	})
})


```

**Promise对象**

```
function readfile = function(filePath){
	return new Promise((resolve,reject)=>{
		fs.readFile(filePath,function(err,data){
			if(err)return reject(err);
			resolve(data);
		})
	});
}
readFile('/etc/fstab').then((data)=>{
	console.log(data);
	return readfile('./etc/shells');
}).then((data)=>{
console.log(data);
})
```

**generator函数**

```
function * gen(){
	const f1=yield fs.readFile('/etc/fstab');
	const f2=yield fs.readFile('/etc/shells');
	console.log(f1.toString());
	console.log(f2.toString());
}
```

**async/await**

```
const asyncFunc = async function get(){
	const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}
```

**区别：**

通过上述代码进行分析，将`promise`、`Generator`、`async/await`进行比较：

- `promise`和`async/await`是专门用于处理异步操作的
- `Generator`并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署`Interator`接口...）
- `promise`编写代码相比`Generator`、`async`更为复杂化，且可读性也稍差
- `Generator`、`async`需要与`promise`对象搭配处理异步情况
- `async`实质是`Generator`的语法糖，相当于会自动执行`Generator`函数
- `async`使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

#### 封装遍历接口

原生Object对象没有默认迭代器接口，使用Generator添加

```
function iterator(obj){
	let props = Reflect.ownKeys(obj);
	for(let prop of props){
		yield([prop,obj[prop]]);
	}
}
let j = {'one':1,'two':2};
for(let [key,value] of iterator(j)){
console.log(`${key},${value}`)
}
```

