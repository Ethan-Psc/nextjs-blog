### 前置知识

大多数情况下，函数的运行方式决定了它的this值（运行时绑定）

this对象函数运行时内部产生的对象，只能在函数内部使用，总是指向调用函数的对象



### 绑定规则

默认绑定

```
function func(){
console.log(this.name);
}
var name = "tyj"
func()
//this默认指向undefined，严格模式会报错，非严格模式会隐式指向window

例题
function outerFunc() {
  console.log(this) // { x: 1 }

  function func() {
    console.log(this) // Window
  }

  func()
}

outerFunc.bind({ x: 1 })()

```

显式绑定（apply，call，bind）

```
function print(){
	console.log(this.name)
}
var obj = {name:'tyj'}
var name = 'kkk'
print.call(null)
print.call(obj)

易错点
多次bind只认第一次bind的值
function func() {
  console.log(this)
}

func.bind(1).bind(2)() // 1
```

隐式绑定（obj.func）

```

var obj = {
name:'tyj',
print:function(){
	console.log(this.name)
}}
obj.print()
```

new绑定

```
this指向new出来的新对象
function func(){
console.log(this,this.__proto === func.prototype)
}
func.apply(1)()// -->Number {1} false
new func() // -->func {} true
```

箭头函数绑定

```
func = () => {
  // 这里 this 指向取决于外层 this，箭头函数的this值「不在函数里」
  console.log(this)
}

func.bind(1)() // Window，箭头函数优先级最高

```



### 优先级

箭头函数>new绑定>显式绑定>隐式绑定>默认绑定

