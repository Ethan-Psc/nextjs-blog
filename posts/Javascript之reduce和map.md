Array.prototype.Map

```
let arr=[1,2,3,4];
Array.prototype.Map = function(fn){
  let resArr=[];
  this.forEach((element,index)=>{
​    let res=fn.call(this,element,index);
​    resArr.push(res);
  })
  return resArr;
}
arr.Map((element,index)=>{
  console.log(index);
  return element*2;
})
```

Array.prototype.Reduce

```
Array.prototype.Reduce = function(fn,init){
  let copyNum=this.concat();
  let curNum=this;
  if(init)copyNum.unshift(init);
  let res=copyNum[0];
  while(copyNum.length>1){
​    let index=curNum.length-copyNum.length+1;
​    res=fn.call(copyNum,copyNum[0],copyNum[1],index);
​    copyNum.splice(0,2,res);
  }
  return res;
}
arr.Reduce((pre,cur,index)=>{
  console.log(pre);
  return pre+cur;
},20)
```

