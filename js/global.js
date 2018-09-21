/*
 * @Author: 松鼠岭 
 * @Date: 2017-10-26 10:44:05 
 * @Last Modified by: 松鼠岭
 * @Last Modified time: 2018-04-03 10:09:51
 */

// JavaScript Document



/*
单行滚动
*/
(function($){
	$.fn.extend({
		"sslSlideUp":function(value){
			
			var docthis = this;
			//默认参数
			value=$.extend({
				 "li_h":"30",
				 "time":2000,
				 "movetime":1000
			},value)
			
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".top-rolling");
				})
			}
			
			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
			
			//悬停时停止滑动，离开时继续执行
			$(docthis).children("li").hover(function(){
				clearInterval(anifun);			//清除自动滑动动画
			},function(){
				anifun = setInterval(autoani,value.time);	//继续执行动画
			})
		}	
	})
})(jQuery)










