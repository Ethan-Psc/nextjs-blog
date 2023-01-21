众所周知，数据分为基本数据类型（`String` `Number` `Boolean` `Null` `Undefined` `Symbol`）和对象数据类型

基本数据类型的特点：直接声明的变量会存储在栈中，如果基本类型是全局，会放在堆上

对象数据类型的特点：存储的是该对象在栈中的引用，真实的数据存放在堆内存中；存储的对象是一个地址，地址指向堆内存中的某个对象



**浅拷贝**

定义：按位拷贝对象，创建一个新对象，这个对象有着原始对象属性的一份拷贝。

对于**基本数据类型**来说，**浅拷贝**后创建一个新的对象属性，修改新的对象属性**不影响**原始对象的属性。

对于**引用数据类型**来说，**浅拷贝**后创建一个新的对象属性，修改新的对象属性**影响**原始对象的属性。



**五种浅拷贝的方式**

**1.Object.assign([target],source)**

```
Object.assign(obj,source);
const obj=Object.assign(source);
```

**注意点：**

- 它不会拷贝对象的继承属性；
- 它不会拷贝对象的不可枚举的属性；
- 可以拷贝 Symbol 类型的属性。

**2.扩展运算符**

```
const obj={...source};
//和Object.assign功能相同，注意点也相同
```

**3.Array.prototype.concat**

```
const arr=[1,2,{name:'mike'}];
const newArr=arr.concat();
newArr[2].name='tom'
//浅拷贝，当数组中含有引用类型数据时，修改原数组中的元素的属性会影响拷贝后连接的数组
```

**4.Array.prototype.slice**

```
const arr = [1, 2, {name: 'nordon'}]; 
const newArr = arr.slice(); 
newArr[2].name = 'wy';
//同上
```

**5.使用第三方库&手动实现**

> Object.prototype.hasOwnProperty()
>
> 判断某个对象是否含有指定的自身属性（不包含继承的属性！）
>
> Object.prototype.isPrototypeOf(obj)
>
> 测试一个对象是否在另一个对象的原型链上（测试一个对象是否是另一个的原型）

```
const clone = (source) =>{
	if(typeof source === 'object' && source !== null){
		const cloneTarget = Array.isArray(source) ? []:{};
		//for in可以遍历对象的所有属性包括继承的
		for(let prop in source){
			if(source.hasOwnProperty(prop)){
				cloneTarget[prop]=source[prop];
			}
		}
	}
	else return source;
}
```



**深拷贝**

如果深拷贝，那么拷贝的对象和原始对象就再也没有关系了，除了它们的属性值相同。

**实现方式**

**1.`JSON.parse(JSON.stringify(obj))`通过JSON的2次转换深拷贝obj，不过无法拷贝undefined与symbol属性，无法拷贝循环引用对象**

> 简单来说，循环引用就是你引用我，我引用你

**2.使用第三方工具库库**

**3.自己实现一个深拷贝函数**



**递归调用浅拷贝函数**

**简单版**

```
const deepClone = (source,map = new Map()) =>{
	//基本数据类型直接返回值
	if(typeof source !== 'object'|| source === null )return source;
	//若已经clone，返回clone的对象
	if(s=map.get(source))return s;
	//生成clone对象
	const clone = Array.isArray(source)?[]:{};
	for(let prop in source){
clone[prop]=deepClone(source[prop],map);
	}
	map.set(source,clone);
	return clone;
}
```

**进阶版**

```
const isObject = (target) =>
        (typeof target === "object" || typeof target === "function") &&
        target !== null;
        //考虑到正则类/日期类等特殊对象
function deepclone_pro(target, map = new Map()) {
        if (map.get(target)) return target;
        if (!target || (typeof target !== "object")) return target;
        let constructor = target.constructor;
        // 检测当前对象target是否与 正则、日期、函数格式对象匹配
        if (/^(RegExp|Date)$/i.test(constructor.name)) {
          return new constructor(target); // 创建一个新的特殊对象(正则类/日期类)的实例
        }

        if (isObject(target)) {
          map.set(target, true); // 为循环引用的对象做标记
          let newObj = Array.isArray(target) ? [] : {};
          for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
              newObj[prop] = deepclone_pro(target[prop], map); //map为循环引用的对象做标记，防止无限递归
            }
          }
        }
        return newObj}
        sayhi()
        function sayhi(){console.log("sayhi")}
```

