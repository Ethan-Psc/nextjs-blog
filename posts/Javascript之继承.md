### 思维导图

![img](https://static.vue-js.com/0df74700-731c-11eb-ab90-d9ae814b240d.png)

### 分类

分别给出实现以及实现时出现的问题



- 原型链继承

  

  ```
  function Parent(){
  	this.name = 'parent'
  	this.play = [1,2,3]
  }
  function Child(){
  	this.name = 'child'
  }
  Child.prototype = new Parent();
  var c1 = new Child();
  c1.play.push(4);
  var c2 = new Child();
  console.log(c2.play)
  ```

  改变c1的play属性，c2的play属性也会跟着变化，这是因为两个实例的原型对象是一样的，内存空间是共享的

  

- 构造函数继承（借助 call）

  

  ```
  function Parent(){
  	this.name = 'parent'
  	this.play = [1,2,3]
  }
  function Child(){
  	Parent.call(this);
  	this.name = 'child'
  }
  Parent.prototype.getName=function(){
  	return this.name;
  }
  var c1 = new Child();
  c1.play.push(4);
  var c2 = new Child();
  console.log(c1.play,c2.play);
  -->[1,2,3,4]、[1,2,3]
  c1.getName();-->undefined
  ```

  优化了第一种继承方式的弊端，父类的引用类型不会被共享。但是**父类的原型属性不能被继承**！

  

- 组合继承

  

  结合了第一第二种继承方式的优点

  ```
  function Parent(){
  	this.name = 'parent'
  	this.play = [1,2,3]
  }
  function Child(){
  	Parent.call(this);
  	this.name = 'child'
  }
  Parent.prototype.getName=function(){
  	return this.name;
  }
  Child.prototype = new Parent();
  Child.prototype.constructor=Child;
  var c1 = new Child();
  c1.play.push(4);
  var c2 = new Child();
  console.log(c1.play,c2.play);
  -->[1,2,3,4]、[1,2,3]
  c1.getName();
  -->child
  ```

  缺点是需要**调用两次Parent构造函数，会造成多构造一次的性能开销**。在寄生组合式继承种解决了这个问题。

  

- 原型式继承

  不适用严格意义的构造函数去实现继承，而是使用Object.create()

  出发点是不涉及严格意义上的构造函数去实现继承，实现对象之间的信息共享。

  ```
  function object(obj){
  	function f(){};
  	f.prototype = obj;
  	return new f();
  }
  let person = {
  	name:'mike',
  	play:[1,2,3]
  }
  let anotherPerson1 = object(person)
  anotherPerson1.play.push(4);
  let anotherPerson2 = object(person)
  console.log(anotherPerson1.play,anotherPerson2.play)
  -->[1,2,3,4],[1,2,3,4]
  ```

  在ES5后通过Object.create去规范化了上述的object函数

  ```
  let person = {
  	name:'mike',
  	play:[1,2,3]
  }
  let anotherPerson1 = Object.create(person)
  //与上述例子的效果相同，我们不需要创建一个object函数去实现继承了
  ```

  缺点：和原型链继承的缺点相同，原型对象的引用类型的值会被共享

  

- 寄生式继承

  

  和原型式继承的思想类似，利用原型式继承与工厂模式的思想，创建一个实现继承的函数，并且以某种方式增强对象。

  ```
  function object(obj){
  	function f(){};
  	f.prototype = obj;
  	return new f();
  }
  //创建一个实现继承的函数createAnother
  let createAnother = function(obj){
  	let clone = object(obj);
  	// 工厂模式的体现，创建一个原型为obj的对象
  	clone.getName(){
  		console.log(this.name);
  	}
  	// 增强对象的体现
  	return clone;
  }
  let obj = {
  	name:'tyj'
  }
  let obj2 = createAnother(obj)
  obj2.getName()//-->tyj
  ```

  

- 寄生组合式继承

  

  基本思路是不通过调用父类构造函数给子类原型赋值，而取得父类原型的一个副本。总的来说就是使用寄生式继承来继承父类原型，把返回的新对象赋值给子类原型。

```
function object(obj){
	function f(){};
	f.prototype = obj;
	return new f();
}
function inheritPrototype(Child,Parent){
	let prototype = object(Parent.prototype)//使用寄生式继承来继承父类原型
	prototype.constructor = Child//增强对象
	Child.prototype = prototype//对象赋值给子类对象
	//相比组合继承的方式，这种方式少调用了一次父类的构造函数
}
function Child(){
	Parent.call(this)
	this.name = 'child'
}
function Parent(){
	this.name = 'parent',
	this.play = [1,2,3]
	}
Parent.prototype.getName = function(){
	console.log(this.name)
}
inheritPrototype(Child,Parent)

```

只调用了一次Parent构造函数,减少了性能开销。是继承父类引用类型的最好的模式。是ES6继承语法糖背后的原理。