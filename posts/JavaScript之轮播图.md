```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="GBK">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>轮播图</title>
    <style>
#my-slider{
  position: relative;
  width: 790px;
  height: 340px;
}

.slider-list ul{
  list-style-type:none;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.slider-list__item,
.slider-list__item--selected{
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  text-align: center;
}

.slider-list__item--selected{
  transition: opacity 1s;
  opacity: 1;
}

.slide-list__control{
  position: relative;
  display: table;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 12px;
  bottom: 30px;
  margin: auto;
}

.slide-list__next,
.slide-list__previous{
  display: inline-block;
  position: absolute;
  top: 50%; /*定位在录播图组件的纵向中间的位置*/
  margin-top: -25px;
  width: 30px;
  height:50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  overflow: hidden;
  border: none;
  background: transparent;
  color: white;
  background: rgba(0,0,0,0.2); /*设置为半透明*/
  cursor: pointer; /*设置鼠标移动到这个元素时显示为手指状*/
  opacity: 0; /*初始状态为透明*/
  transition: opacity .5s; /*设置透明度变化的动画，时间为.5秒*/
}

.slide-list__previous {
  left: 0; /*定位在slider元素的最左边*/
}

.slide-list__next {
  right: 0; /*定位在slider元素的最右边*/
}

#my-slider:hover .slide-list__previous {
  opacity: 1;
}


#my-slider:hover .slide-list__next {
  opacity: 1;
}

.slide-list__previous:after {
  content: '<';
}

.slide-list__next:after {
  content: '>';
}

/*下面是四个小圆点的样式，其实通过这种BEM命名规则你也能看出来*/
.slide-list__control-buttons,
.slide-list__control-buttons--selected{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: white;
  cursor: pointer; /*设置鼠标移动到这个元素时显示为手指状*/
}
/*当选择后，小圆点的颜色变成红色*/
.slide-list__control-buttons--selected {
  background-color: red;
}
    </style>
</head>
<body>
    <div id="my-slider" class="slider-list">
        <ul>
          <li class="slider-list__item--selected">
            <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
          </li>
          <li class="slider-list__item">
            <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
          </li>
          <li class="slider-list__item">
            <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
          </li>
          <li class="slider-list__item">
            <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
          </li>
        </ul>
        <a class="slide-list__next"></a>
        <a class="slide-list__previous"></a>
        <div class="slide-list__control">
          <span class="slide-list__control-buttons--selected"></span>
          <span class="slide-list__control-buttons"></span>
          <span class="slide-list__control-buttons"></span>
          <span class="slide-list__control-buttons"></span>
        </div>
      </div>
      
      <script>
     class Slider{
  constructor(id, cycle = 3000){
  
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = cycle;
  }
  //插件化
  registerPlugins(...plugins){
    // 这里的this就是组件的实例对象
    plugins.forEach(plugin => plugin(this));
  }
  getSelectedItem(){
    let selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    let selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
    //这里的event就是自定义事件slide
    //obj.dispatchEvent(event),触发自定义事件event,可传入参数
    const event = new CustomEvent('slide', {bubbles:true, detail:{index:idx}})
    this.container.dispatchEvent(event)
  }
  slideNext(){
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
  // 定义一个定时器，循环播放
  start(){
    this.stop();
    this._timer = setInterval(()=>this.slideNext(), this.cycle);
  }
  // 停止循环播放（用户在自己操作的时候要停止自动循环）
  stop(){
    clearInterval(this._timer);
  }
}
function pluginController(slider){
    const controller = slider.container.querySelector('.slide-list__control');
    if(controller){
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      
      // 鼠标经过某个小圆点，就将此圆点对应的图片显示出来，并且停止循环轮播
      controller.addEventListener('mouseover', evt=>{
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
            slider.slideTo(idx);
            slider.stop();
        }
      });
      
      // 鼠标移开小圆点，就继续开始循环轮播
      controller.addEventListener('mouseout', evt=>{
        slider.start();
      });
      
      // 注册slide事件，将选中的图片和小圆点设置为selected状态
      slider.container.addEventListener('slide', evt => {
        const idx = evt.detail.index
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      })
    }
}
function pluginNext(slider){
    const next = slider.container.querySelector('.slide-list__next');
    if(next){
      next.addEventListener('click', evt => {
        slider.stop();
        slider.slideNext();
        slider.start();
        evt.preventDefault();
      });
    }  
}
function pluginPrevious(slider){
    const previous = slider.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        slider.stop();
        slider.slidePrevious();
        slider.start();
        evt.preventDefault();
      });
    }  
  }
const slider = new Slider('my-slider');
slider.registerPlugins(pluginController,pluginNext,pluginPrevious);
slider.start();
      </script>
</body>
</html>
```

