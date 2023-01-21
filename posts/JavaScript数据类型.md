### **BigInt类型**

创建方法：

1.在整数末尾添加 n

> const x = 2n ** 2n;

> 4n

2.使用构造方法

最大可以表示2**53-1的数；

将BigInt转换为Boolean时它的行为类似于一个数字。

严格来说，BigInt并不等于一个数字。

> 因此，BigInt不能与数字互换，会抛出TypeError

**0x十六进制，0/0o八进制，0b/0B二进制**



### **字符串**

字符串是一串UTF-16编码单元的序列，每个编码单元由1个16位二进制数表示。每一个Unicode字符由一个或者两个编码单元实现。

> 字符串时不可更改的，所有基于对字符串的操作都是创造了新的字符串

字符串的方法：

```
"hello".charAt(0); // 'h'

'a'.charCodeAt(); //97

"hello mike".replace("mike","world") //"hello world"

"hello".substr(1,2,) //"el"

"hello".concat("mike") //"hello mike"
```



### **布尔类型**

JavaScript 可按照如下规则将变量转换成布尔类型：

1. `false`、`0`、空字符串（`""`）、`NaN`、`null` 和 `undefined` 被转换为 `false`
2. 所有其他值被转换为 `true`





### **Undefined类型**

一个没有被赋值的变量的默认值是undefined，undefined是一个不可配置不可重写的属性值



如果你不确定一个值有没有声明过使用以下代码判断：

```
if(typeof y === 'undefined')
--> true
```

而不要使用

```
if(y === 'undefined')

-->ReferenceError: y is not defined
```



### **null**

Null 类型只有一个值： `null。`它是 JavaScript [基本类型](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FPrimitive) 之一

值 `null` 是一个字面量，特指对象的值未设置。把 `null` 作为尚未创建的对象，也许更好理解。

> 注意：`typeof null == "object"`





### **Symbol**

Symbol()函数返回symbol类型的值，该类型的值具有静态属性和静态方法

symbol值能作为对象属性的标识符，这是该数据类型的仅有的目的

```
const symbol1 = new Symbol()
-->TypeError
const symbol2 = Symbol()
const symbol3 = Symbol("foo");
typeof symbol2 	-->symbol
symbol3.toString() -->Symbol("foo")
```



Symbol的参数是可选项，作为symbol值得描述，用于调试而不是访问symbol本身



应用：Symbol类型唯一合理的用法就是用变量存储symbol的值，然后用存储的值创建对象属性

```
var  myPrivateMethod  = Symbol(); this[myPrivateMethod] = function() {...};
```

当一个 symbol 类型的值在属性赋值语句中被用作标识符，

- 该属性是匿名的；并且是不可枚举的。因为这个属性是不可枚举的，
- 它不会在循环结构 “`for( ... in ...)`” 中作为成员出现，也因为这个属性是匿名的，它同样不会出现在 “`Object.getOwnPropertyNames()`” 的返回数组里。
- 这个属性可以通过创建时的原始 symbol 值访问到，或者通过遍历 “`Object.getOwnPropertySymbols()`” 返回的数组。
- 通过保存在变量 `myPrivateMethod`的值可以访问到对象属性。
- 当使用 JSON.stringify() 时，以 symbol 值作为键的属性会被完全忽略：





**Symbol.for([[key,symbol]])**

和 `Symbol()` 不同的是，用 `Symbol.for()` 方法创建的的 symbol 会被放入一个全局 symbol 注册表中。



```
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol


Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol


var sym = Symbol.for("mario");
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
```





### **对象**

对象的属性访问有两种链式的表示方法

obj.key.key或者obj\['key']['key']

当key未知或者需要传参时，推荐使用obj \[ 'key']['key'],其他情况使用第一种写法（因为key是关键字时，第一种写法会报错）



判断数组

- `Array.isArray()`
- `[] instanceof Array`判断是否在Array的原型链上
- `[].constructor === Array`通过其构造函数判断
- `Object.prototype.toString.call([])`判断值是否为'[object Array]'

```
const arr = [1, 2, 3];

Array.isArray(arr); // true
arr instanceof Array; // true
arr.constructor === Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
复制代码
```

判断对象

- `{} instanceof Object`判断是否在Object的原型链上
- `{}.constructor === Object`通过其构造函数判断
- `Object.prototype.toString.call({})， 值为`'[object Object]'

```
const obj = {};

obj instanceof Object; // true
obj.constructor === Object; // true
Object.prototype.toString.call(obj); // "[object Object]"
复制代码
```

判断函数

- `func typeof function`
- `func instanceof Function`判断是否在`Function`的原型链上
- `func.constructor === Function`通过构造函数判断
- `Object.prototype.toString.call(func)`值为 "[object Function]"

```
function func() {}

typeof(func); // function
func instanceof Function; // true
func.constructor === Function; // true
Object.prototype.toString.call(func); // "[object Function]"
```





### **WeakMap类型**

**使用场景**

DOM元素操纵元数据

```
const el = document.querySeletor('#app');
const wm  = new WeakMap();
wm.set(el,{display:none});
//假设上面的代码能让el消失的话，由于对键的弱引用，el会被垃圾回收机制销毁
```

设置私有属性

```
利用闭包+WeakMap设置私有属性
const User = (()=>{
	var wm = new WeakMap();
	class User{
		constructor(id){
			this.idProperty = Symbol('id');
			this.setId(id);
		}
		setPrivate(prop,value){
			var privateMembers = wm.get(this)||{};
			privateMembers[prop] = value;
			wm.set(this,privateMembers);
		}	
		getPrivate(prop){
			return vm.get(this)[prop];
		}
		setId(id){
			this.setPrivate(this.idProperty,id);
		}
		getId(){
			return getPrivate(this.idProperty);
		}
	}
	return User;
})()
```

数据缓存

利用WeakMap缓存对象的属性的数量，与Map的使用类似，好处就是可以不需要手动释放内存

