众所周知，reduce()可以实现数值的累加或累乘等操作。

它还可以实现对对象属性的链式获取以及高阶函数的合成

```
//对象属性的链式获取
const obj = {
    name: 'alex',
    info: {
        address: {
            location: 'gz'
        }
    }
}
const array = ['info', 'address', 'location']
const value = array.reduce((pre,prop)=>pre[cur],obj)
console.log(value)  //-->gz
```

```
//使用promise实现高阶函数的合成
function addTwo(x){return x+2}
function addEight(x){return x+8}
function add(x) {
  return Promise.resolve(x).then(addTwo).then(addEight);
}
add(0).then(console.log);-->10

//使用promise+reduce实现高阶函数的合成
function addTwo(x){return x+2}
function addEight(x){return x+8}
function add(x) {
  return [addTwo, addFive, addTen].reduce((promise, fn) => {
    return promise.then(fn);
  }, Promise.resolve(x));
} 
add(0).then(console.log);-->10

//使用promise+reduce创建通用方法实现期约串行合成
function addTwo(x){return x+2}
function addEight(x){return x+8}
function compose(...args) {
  return function (x) {
    return args.reduce((promise, fn) => {
      return promise.then(fn);
    }, Promise.resolve(x));
  };
}
var add = compose(addTwo, addEight);
add(0).then(console.log);-->10
```

