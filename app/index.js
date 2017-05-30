var main = require("./main.js");
import "./2048.css";

$(document).ready(function () {  
    newGame();
    //给newgame按钮绑定事件
    var btn = $("button");
    btn.bind("click",function(){
    	main.newGame();
    });
    //判断键盘所按的方向键
    $(document).keydown(function(){
    	switch(event.keyCode) {
    		case 37:  //向左移动
    		     event.preventDefault();
    		     if(main.moveLeft()){
    		     	setTimeout("main.randomOneNumber()",210);
    		     	setTimeout("main.isGameover()",300);
    		     }
    		     break;
    		case 38:  //向上移动
    		     event.preventDefault();
    		     if(main.moveUp()){
    		     	setTimeout("main.randomOneNumber()",210);
    		     	setTimeout("main.isGameover()",300);
    		     }
    		     break;
    		case 39:  //向右移动
    		     event.preventDefault();
    		     if(main.moveRight()){
    		     	setTimeout("main.randomOneNumber()",210);
    		     	setTimeout("main.isGameover()",300);
    		     }
    		     break;
    		case 40:  //向下移动
    		     event.preventDefault();
    		     if(main.moveDown()){
    		     	setTimeout("main.randomOneNumber()",210);
    		     	setTimeout("main.isGameover()",300);
    		     }
    		     break;
    		default:
    		     break;
    	}
    });
});