```
//柯里化，以add作为例子

function Add(){

  return [...arguments].reduce((pre,cur)=>pre+cur ,0);

}

function curry(fn){

  var firstArg = Array.prototype.slice.call(arguments,1);

  return function(){

​    const args = Array.prototype.slice.call(arguments,0);

​    return fn.apply(this,firstArg.concat(args));

  }

}

//定长参数的柯里化

function myAdd1 (a,b,c){

  return Array.prototype.reduce.call(arguments,(pre,cur)=>pre+cur,0);

}

function myCurry(fn){

  var argsNum = fn.length;

  var args = [].splice.call(arguments,1);

  var argNum1 = args.length;

  return function(){

​    let argNum2 = arguments.length;

​    if(argNum1+argNum2>=argsNum){

​      return fn.call(this,...args,...arguments);

​    }

​    else{

​      return fn.apply(this,...args,...arguments);

​    }

  }

}

//不定长参数的柯里化

function myCurry2(fn) {

 // 保存预置参数

 const presetArgs = [].slice.call(arguments, 1)

 // 返回一个新函数

 function curried () {

  // 新函数调用时会继续传参

  const restArgs = [].slice.call(arguments)

  const allArgs = [...presetArgs, ...restArgs]

  return myCurry2.call(null, fn, ...allArgs)

 }

 // 重写toString

 curried.toString = function() {

  return fn.apply(null, presetArgs)

 }

 curried.valueOf = function() {

  return fn.apply(null, presetArgs)

 }

 return curried;

}



console.log(myAdd1(1,2,3));

var f=curry(Add,2,3);

console.log( f(3,4));

var f2=myCurry(myAdd1,1);

console.log(f2(3,4));

var f3=(myCurry2(Add,1,2,3));

var f4=f3(8)

console.log(f4.toString());

console.log(f4.valueOf());

console.log(f4)
```

