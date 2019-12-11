/*
	obj 要改变的是那个元素
	attr 要改变的是那个属性
	target 要将该属性的值改到多少
*/
function animate(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 0;
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current * 100);
		}
		if(current < target){
			iSpeed = 8;
		}else{
			iSpeed = -8;
		}
		if( Math.abs(target - current) < Math.abs(iSpeed)){
			if(attr == 'opacity'){
				obj.style[attr] = target/100;
			}else{
				obj.style[attr] = target + 'px';
			}
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed + 'px';
			}
			
		}
	},30);
}

//多值动画
//obj:处理目标，attr:更改属性，value:目标值
//option:是一个对象，包含处理目标和目标的属性
function animate2(obj,option,isLinear,endFn){	
	//判断是否传入isLinear判断值，默认匀速运动
	if(isLinear == undefined){
		isLinear = true;
	}
	//清除定时器
	clearInterval(obj.timer);
	//循环定时器设置
	obj.timer = setInterval(function(){
		//默认停止所有动画,每一次在定时器中都要获取一次
		var isStopAll = true;
		for (attr in option){
			//获取要更改的值
			var current = parseFloat(getComputedStyle(obj,false)[attr]);
			//设置初始速度
			var iSpeed = 0;
			//设定关闭定时器条件
			var isStop = false;
			//若更改属性为透明值则另做处理
			if(attr == 'opacity'){
				current = Math.round(current * 100);
			}
			//isLinear为ture时做匀速运动动画,否则做减速运动
			if (isLinear) {//匀速运动
				if(current < option[attr]){
					iSpeed = 5;
				}else{
					iSpeed = -5;
				}
				//匀速运动的终止条件——当前动画到达目标值
				if (Math.abs(option[attr]-current) < Math.abs(iSpeed)){
					if(attr == 'opacity'){
						obj.style[attr] = option[attr]/100;
					}else{
						obj.style[attr] = option[attr]+'px';
					}	
					isStop = true;
				}else{//当前动画没有到达目标值
					isStopAll = false;
				}
			}else{//减速运动
				iSpeed = (option[attr]-current)/10;
				//决定速度向上取整还是向下取整
				iSpeed > 0 ? iSpeed = Math.ceil(iSpeed) : iSpeed = Math.floor(iSpeed);
				//减速运动的终止条件
				if (!iSpeed) {
					isStop = true;
				}else{
					isStopAll = false;
				}
			}
			//循环返回结果或终止循环	
			if(!isStop){
				if (attr == 'opacity') {
					obj.style[attr] = (current + iSpeed)/100;
				}else{
					obj.style[attr] = current + iSpeed +'px';
				}
			}
			if(isStopAll){
				clearInterval(obj.timer);
				// console.log('clear');
				typeof endFn == 'function' && endFn();
			}
		}
	},30)
};

function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}