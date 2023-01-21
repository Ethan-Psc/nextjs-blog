```
//手撕一个call和apply
https://github.com/Anduin2017/HowToCook

Function.prototype.Call = function (context,...args) {
    //this对象不是function，会报错
    if(typeof this !== 'function'){
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    //没有context对象，默认使用window作为context对象
    var context = context || window;
    context.fn = this;
    var res = context.fn(...args)
    delete context.fn
    return res;
}
//call和apply的区别只有参数的写法，一种是数组作为参数，另一种是很多个参数
Function.prototype.Apply = function (context,args) {
  if(typeof this !== 'function'){throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
 }
  var context = context || window;
  context.fn = this;
  var res = context.fn(...args)
  delete context.fn
  return res;
}
//手撕一个bind
Function.prototype.Bind = function(context){
  if(typeof this !== 'function'){
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var context = context || window;
  var self = this;
  var args = Array.prototype.slice.call(arguments,1);
  var fNOP = function(){}
  var fBound = function(){
  var args2 = Array.prototype.slice.call(arguments);
    //一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
    //因此这里判断以下this的原型是否已经指向fBound，若指向fBound，那么原来的this值被忽略
    return self.apply(this instanceof fBound? this: context,args.concat(args2));
  }
  //使用一个空函数进行中转
  /*
  fBound.prototype = this.prototype ;
  //更改fBound.prototype的值时，会影响绑定对象的prototype的值
  */
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
//如果要上线，考察兼容性
Function.prototype.bind = Function.prototype.bind || function (context,...args) {
  if(typeof this !== 'function'){
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var context = context || window;
  context.fn = this;
  var res = context.fn(...args)
  delete context.fn
  return res;
}
//举例验证，结果:XXX，未来可期。
function print(name,flag){
  console.log(name,flag);
}
print.Call(obj,"XXX,"未来可期");
print.Apply(obj,["XXX","未来可期"])
var fn = print.Bind(obj,"XXX");
fn("未来可期");
```

