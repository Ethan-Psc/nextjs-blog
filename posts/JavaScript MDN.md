**字面量**

字面量是由语法表达式定义的常量，按字面意思给出的固定的值，不是变量。

**对象自变量**

对象字面量是封闭在花括号对（{}）的一个对象的零个或多个属性名-值对的元素列表

**正则表达式**

正则表达式中的特殊字符

^	匹配输入的开始，如果多行标志设置为true，那么也匹配换行符前的位置

$	匹配输入的结束

\*  	匹配前一个表达式0次或多次，等价于{0,}

\+ 	匹配前一个表达式1次或多次

?	匹配0次或一次，等价于{0,1}

//如果**紧跟在任何量词 \*、 +、? 或 {} 的后面**，将会使量词变为**非贪婪**（匹配尽量少的字符），和缺省使用的**贪婪模式**（匹配尽可能多的字符）正好相反。例如，对 "123abc" 使用 `/\d+/` 将会匹配 "123"，而使用 `/\d+?/` 则只会匹配到 "1"。



.	默认匹配除了换行符之外的单个字符

//如果 `s` ("dotAll") 标志位被设为 true，它也会匹配换行符。

(x)	匹配x并且记住匹配项，括号被称为捕获括号

\1 \2表示在正则表达式匹配环节的第一第二个被捕获括号匹配的子字符

$1 $2表示在正则表达式替换环节的第一第二个被捕获括号匹配的子字符



(?:x)	匹配x但是不记住该匹配项

x(?=y)	匹配x当且仅当x后面跟着y ，称为先行断言（y不是匹配结果的一部分）

(?<=y) x	匹配x当且仅当x的前面是y，称为后行断言

x(?!y)	匹配x当且仅当x后面不跟着y，称为正向否定查找

(?<!y) x	反向否定查找

[xyz]	一个字符集合，匹配方括号中的任意字符

/[a-z.]+/和/[\w.]+/ 与字符串"test.i.ng"匹配

[^xyz]	一个反向字符集，它匹配任何没有包含在方括号中的字符

[\b]	匹配一个退格(U+0008)

\b	匹配一个词的边界

\B	匹配一个非单词边界，匹配如下几种情况

- 字符串第一个字符为非“字”字符
- 字符串最后一个字符为非“字”字符
- 两个单词字符之间
- 两个非单词字符之间
- 空字符串



\d	匹配一个数字

\D	匹配一个非数字字符

\f	匹配一个换行符		

\n	匹配一个换行符	

\r匹配一个回车符	

\s匹配一个空白字符，包括空格，制表符，换页符和换行符

\S	匹配一个非空白字符

\t	匹配一个水平制表符

\v	匹配一个垂直制表符

\w	匹配一个单子字符	相当于[A-Za-z0-9_]



![image-20211027141713786](C:\Users\ASUS\Desktop\前端之路\笔记\笔记-image\image-20211027141713786.png)



#### **索引集合类**

遍历集合类（数组遍历）的方法：

**1、forEach遍历：**

　　　　　　　　　　map.forEach(function(value,key){
　　　　　　　　　　　　console.log(value,key);
　　　　　　　　　　});
　　　　　函数中第一个参数是属性值，第二个参数是属性

　　**2、for-of遍历：**
　　　　　　　　①for(let item of map){

　　　　　　　　　}
　　　　　遍历结果是数组
　　　　　　　　②for(let item of map.values()){

　　　　　　　　　}
　　　　　遍历属性值
　　　　　　　　③for(let item of map.keys()){

　　　　　　　　　}
　　　　　遍历属性

　　**3、entries遍历：**

　　　　　　　　for(let item of map.entries()){

　　　　　　　　}
　　　　　遍历结果同forEach



**处理有key-value数据调试检查对象属性时，用for...in**

var obj={a:1,b:2,c:3};

for(var key in obj){

console.log(\` obj.${key}=${obj[key]} \`);

}

//Output:  "a=1" "b=2" "c=3"

**数组的方法**

**concat()**-->连接两个数组并返回一个新的数组

**join(deliminator=',')**-->将数组的所有元素连接成一个字符串

push(),pop();

**shift()**-->从数组里移出第一个元素并返回该元素

**unshift()**-->从数组开头添加一个或多个元素，并返回数组的新长度

**slice(start index,upto index)**-->从数组中提取一个片段并作为新数组返回（左闭右开区间）

**splice(index,count to remove,addElement1,addElement2....)**-->从数组中移出一些元素，并替换（可选字段）

**reverse();**

**sort(method of sorting)-->排序**

自定义排序方法 var sortFn=function(a,b);

myArray.sort(sortFn)



**indexOf(searchElement[,fromIndex])**-->在数组中搜索searchElement并返回第一个匹配的索引，fromIndex表示从该索引开始搜索

lastIndexOf -->从数组末尾开始搜索



**forEach(callback[,thisObject]**);-->在数组每个元素项上执行callback

**map**(callback[,thisObject]);-->在数组的每个单元项执行callback函数，并把返回包含回调函数返回值的新数组

**filter**(callback[,thisObject]);-->返回一个包含所有在回调函数上返回true的元素的新数组

**every**(callback[,thisObject]);-->当数组的每一个元素在callback上被返回true时就返回true,类似于filter的判断功能

**some**(callback[,thisObject])-->当数组中有一个元素在callback上被返回true时就返回true



上述数组的方法中都带有一个被称为迭代方法的回调函数，有可选参数thisObject，如果提供这个参数，thisObject会变成回调函数内部this关键字的值，若不提供，thisObect将引用全局对象window



**reduce**(callback[,initialValue])-->使用回调函数callback把数组列表计算成一个单一值（数组元素两两递归处理的方式把数组计算成一个值）





使用类数组对象

所谓类数组对象就是外观和行为和数组类似，但是有些数组的属性方法不可以用的对象，即类似数组行为的对象

Array的原生（prototype）方法可以用来处于类数组对象,相当于提供机制可以实现forEach等类数组对象不能使用的方法。

1.处理函数内部可用的arguments对象

function printArguments(){

​	Array.prototype.forEach.call(arguments,function(item){console.log(item);});

}

2.处理字符串

​	Array.prototype.forEach.call("I lover you",function(item){console.log(item);});



数组推导式（vscode还不兼容，360也不兼容，ECMAScript7的快捷方式，不建议使用）

所谓数组推导式用来在一个数组的基础上构造一个新的数组，可以用来替代map()，filter()函数

```
var numbers = [1, 2, 3, 21, 22, 30];
var evens = [i*2 for (i of numbers) if (i % 2 === 0)];
//数组推导式可以筛选满足条件表达式的元素，还可以创建一个新数组
```



**数组reduce（）方法的使用：**

**常见使用方法**

**用reduce方法实现求数组的和**

```
        var arr=[1,2,3,4]
        var total=arr.reduce((a,b)=>a+b)
        console.log(total)//输出10    
```

**计算数组中元素出现的次数**

```
        let arr = ['A', 'B', 'C', 'B', 'A'];
        let times = arr.reduce((pre,cur)=>{
        if(cur in pre){
            pre[cur]++
        }else{
            pre[cur] = 1 
        }
        return pre
        },{})
        console.log(times);//输出{A:2,B:2,C:1}    
```

**将二维数组转成一维**

```
    let arr = [[0, 1], [2, 3], [4, 5]]
    let newArr = arr.reduce((pre,cur)=>{
        return pre.concat(cur)
    },[])
    console.log(newArr); // [0, 1, 2, 3, 4, 5]//同样可以实现多维到一维
```

　　　　**求对象中属性的总和**，如：求班级同学总分

```
         let info=[
            { 
                name:"小明",
                score:100
            },{ 
                naem:"小红",
                score:110
            },
            {
                name:"小强",
                score:120
            }
        ]
        let totalScore=info.reduce((pre,cur)=>{
            return pre+cur.score
        },0)
        console.log(totalScore);//输出330
```

　　　　**数组去重**

```
　　　　let arr = [1,2,3,4,4,1]
　　　　let newArr = arr.reduce((pre,cur)=>{
    　　　　if(!pre.includes(cur)){
   　　　　   return pre.concat(cur)
   　　　　 }else{
   　　　　   return pre
   　　　　 }
　　　　},[])
　　　　console.log(newArr);// [1, 2, 3, 4]
```

　　　　**参数求平均值**

```
　　　　var myAverage=(...args)=>args.reduce((pre,cur)=>pre+cur)/args.length
　　　　console.log(myAverage(0,1,2,3,4))//2　
```

#### **带键的集合**

使用Map的一些基本操作

`var sayings = new Map();`
`sayings.set('dog', 'woof');`
`sayings.set('cat', 'meow');`
`sayings.set('elephant', 'toot');`
`sayings.size; // 3`
`sayings.get('fox'); // undefined`
`sayings.has('bird'); // false`
`sayings.delete('dog');`
`sayings.has('dog'); // false`

`for (var [key, value] of sayings) {`
  `console.log(key + ' goes ' + value);`
`}`
`// "cat goes meow"`
`// "elephant goes toot"`

`sayings.clear();`
`sayings.size; // 0`



**使用for..of方法迭代Map**

for(let key of myMap.keys()){}

for(let value of myMap.values()){};

for(let [key,value] of myMap.entries()){}

使用forEach()方法迭代Map

myMap.forEach(function(key,value)){};



**Map与数组的关系**

一个二维键值对数组可以转换成一个Map对象

```
let kvArray = [["key1", "value1"], ["key2", "value2"]];

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap.keys())); // 输出和kvArray相同的数组

```



**复制或合成Maps**

let mp1=new Map([['1',1],['2',2]]);

let clone=new Map(mp1);

**Map对象和数组合并**

```
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
let merged = new Map([...first, ...second, [1, 'eins']]);
//...是展开运算符，作用是展开数组。不需要apply方法就能将数组转为函数的参数了。
console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```



**Set对象**

```
var mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2

for (let item of mySet) console.log(item);
// 1
// "some text"
```





**使用对象**

遍历对象中的所有元素

```
function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}
//hasOwnProperty检测对象中是否含有特定的自身属性，与in不一样，会忽略掉从原型链继承的属性
```



