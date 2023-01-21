[JavaScript 数据结构与算法之美 - 归并排序、快速排序、希尔排序、堆排序 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903895789993997#heading-4)

### 归并排序

```
function merge_sort(arr){
    const n = arr.length;
    if(n<2)return arr;
    const m = Math.floor(n/2);
    let left = arr.slice(0,m);
    let right = arr.slice(m,n);
    return merge(merge_sort(left),merge_sort(right));
}
const merge = (left, right) => {
	const result = [];
	while (left.length && right.length) {
		// 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	while (left.length) result.push(left.shift());
	while (right.length) result.push(right.shift());
	return result;
};
```



### 快速排序

```
var quickSort = function(a,l,r){
    if(l<r)  //判断是否满足排序条件，递归的终止条件
	{
		let i = l, j = r;   //把待排序数组元素的第一个和最后一个下标分别赋值给i,j，使用i,j进行排序；
		let x = a[l];    //将待排序数组的第一个元素作为哨兵，将数组划分为大于哨兵以及小于哨兵的两部分                                   
		while(i<j)  
		{
		  while(i<j && a[j] >= x) j--;  //从最右侧元素开始，如果比哨兵大，那么它的位置就正确，然后判断前一个元素，直到不满足条件
		  if(i<j) a[i++] = a[j];   //把不满足位次条件的那个元素值赋值给第一个元素，（也即是哨兵元素，此时哨兵已经保存在x中，不会丢失）并把i的加1
		  while(i<j && a[i] <= x) i++; //换成左侧下标为i的元素开始与哨兵比较大小，比其小，那么它所处的位置就正确，然后判断后一个，直到不满足条件
		  if(i<j) a[j--] = a[i];  //把不满足位次条件的那个元素值赋值给下标为j的元素，（下标为j的元素已经保存到前面，不会丢失）并把j的加1
		} 
	        a[i] = x;   //完成一次排序，把哨兵赋值到下标为i的位置，即前面的都比它小，后面的都比它大
		quickSort(a, l ,i-1);  //递归进行哨兵前后两部分元素排序 ， low,high的值不发生变化，i处于中间
		quickSort(a, i+1 ,r);
	}


}
```

另一种需要另外新建数组的写法，更容易理解

```
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```



### 希尔排序

```
const shellSort = arr => {
	let len = arr.length,
		temp,
		gap = Math.floor(len / 2);
	for (gap; gap > 0; gap = Math.floor(gap / 2)) {
		for (let i = gap; i < len; i++) {
			temp = arr[i];
			let j = i - gap;
			for (; j >= 0 && arr[j] > temp; j -= gap) {
				arr[j + gap] = arr[j];
			}
			arr[j + gap] = temp;
		}
	}
	console.timeEnd("希尔排序耗时为");//可以输出排序所用的时间
	return arr;
};
```

**优化版本**

```
const shellSort = arr => {
	let len = arr.length,
		temp,
		gap = 1;
	console.time('希尔排序耗时');
	while (gap < len / 3) {
		//动态定义间隔序列
		gap = gap * 3 + 1;
	}
	for (gap; gap > 0; gap = Math.floor(gap / 3)) {
		for (let i = gap; i < len; i++) {
			temp = arr[i];
			let j = i - gap;
			for (; j >= 0 && arr[j] > temp; j -= gap) {
				arr[j + gap] = arr[j];
			}
			arr[j + gap] = temp;
            console.log(j+gap,temp)
			console.log('arr  :', arr);
		}
	}
	console.timeEnd('希尔排序耗时');
	return arr;
};
```



### 堆排序

堆排序两种实现方法（均以实现小顶堆为例子）
一种是自下而上的堆化
一种是自上而下的堆化



自下而上，遍历数组从前到后

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
//自上而下堆化，遍历数组从后到前
function buildHeap2(items){
  let i = Math.floor(items.length/2);
  while(i>0){
​    heapify2(items,i);
​    i--;
  }
}
```



自上而下，遍历数组从后到前![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/3/1727787c4d776aba~tplv-t2oaga2asx-watermark.awebp)

```
function swap(items,i,j){
  let temp=items[i];
  items[i]=items[j];
  items[j]=temp;
}
function heapify2(items,i){
  while(1){
    let maxIndex=i;
    if(i*2<=items.length&&items[i]>items[i*2]){
      maxIndex=i*2;
    }
    if(i*2+1<=items.length&&items[maxIndex]>items[i*2+1]){
      maxIndex=i*2+1;
    }
    if(maxIndex===i)break;
    swap(items,i,maxIndex);
    i=maxIndex;
  }
}
// 测试
var items = [,5, 2, 3, 4, 1];
console.log(items);
// 初始有效序列长度为 1
buildHeap2(items)
console.log(items)
```

