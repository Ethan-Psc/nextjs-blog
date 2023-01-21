堆排序两种实现方法（均以实现小顶堆为例子）
一种是自下而上的堆化
一种是自上而下的堆化

自下而上，遍历数组从前到后（错误的！！！）

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/3/1727787c4d8e3f8e~tplv-t2oaga2asx-watermark.awebp)



```
function swap(items,i,j){
  let temp=items[i];
  items[i]=items[j];
  items[j]=temp;
}
//自下而上堆化,遍历数组从前到后
function buildHeap1(items){
  var heapSize=1;
  while(heapSize<items.length){
​    heapify1(items,heapSize);
​    heapSize++;
  }
}
function heapify1(items,i){
  while(Math.floor(i/2)>0&&items[i]<items[Math.floor(i/2)]){
​    swap(items,i,Math.floor(i/2));
​    i = Math.floor(i/2);
  }
}
// 测试
var items = [,5, 2, 3, 4, 1];
console.log(items);
// 初始有效序列长度为 1
buildHeap1(items)
console.log(items)

```



自上而下，遍历数组从后到前(正确的！！！)![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/3/1727787c4d776aba~tplv-t2oaga2asx-watermark.awebp)

```
function swap(items,i,j){
  let temp=items[i];
  items[i]=items[j];
  items[j]=temp;
}

function heapify2(items,i){
  while(1){
    let maxIndex=i;
    if(i*2<items.length&&items[i]>items[i*2]){
      maxIndex=i*2;
    }
    if(i*2+1<items.length&&items[maxIndex]>items[i*2+1]){
      maxIndex=i*2+1;
    }
    if(maxIndex===i)break;
    swap(items,i,maxIndex);
    i=maxIndex;
  }
}
function buildHeap2(items){
  var heapSize=Math.floor(items.length/2);
  while(heapSize>=0){
    heapify2(items,heapSize);
    heapSize--;
  }
}
// 测试
var items = [,5, 2, 3, 4, 1];
console.log(items);
// 初始有效序列长度为 1
buildHeap2(items)
console.log(items)
```

