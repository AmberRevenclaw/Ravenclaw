function toBig(){
	var Bbox = document.getElementById('box');//定义一个变量来代替某个值
	Bbox.style.width='600px'; 
	Bbox.style.height='600px';
	Bbox.style.backgroundColor='skyblue';
}
function toSmall(){
	var Sbox = document.getElementById('box');
	Sbox.style.width='300px'; 
	Sbox.style.height='300px';
	Sbox.style.backgroundColor='pink';
}
var Tbox = document.getElementById('boxtext');
Tbox.style.color='red';
