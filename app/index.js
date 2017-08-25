//依赖文件
import {getPosition,getNumBgcolor,getNumColor,canMoveLeft,canMoveDown,canMoveUp,canMoveRight,noXBlock,noYBlock,nomove,nospace} from './support.js';
import {showNumAnimation,showMoveAnimation,updateScore} from "./animation.js";
import "./2048.css";



$(document).ready(function () {  
    newGame();
    //给newgame按钮绑定事件
    var btn = $("button");
    btn.bind("click",function(){
    	newGame();
    });
    //判断键盘所按的方向键
    $(document).keydown(function(){
    	switch(event.keyCode) {
    		case 37:  //向左移动
    		     event.preventDefault();
    		     if(moveLeft()){
    		     	setTimeout(randomOneNumber,210);
    		     	setTimeout(isGameover,300);
    		     }
    		     break;
    		case 38:  //向上移动
    		     event.preventDefault();
    		     if(moveUp()){
    		     	setTimeout(randomOneNumber,210);
    		     	setTimeout(isGameover,300);
    		     }
    		     break;
    		case 39:  //向右移动
    		     event.preventDefault();
    		     if(moveRight()){
    		     	setTimeout(randomOneNumber,210);
    		     	setTimeout(isGameover,300);
    		     }
    		     break;
    		case 40:  //向下移动
    		     event.preventDefault();
    		     if(moveDown()){
    		     	setTimeout(randomOneNumber,210);
    		     	setTimeout(isGameover,300);
    		     }
    		     break;
    		default:
    		     break;
    	}
    });
});




//main.js

var cellArray = new Array();
var hasConflicted = new Array();
var score = 0;
var cellWidth = "75px";


//向右滑
function moveRight(){
    if(!canMoveRight(cellArray))
        return false;
    for(var i = 0;i < 4;i++)
        for(var j = 2;j >= 0;j--){
            if(cellArray[i][j] != 0){
                for(var k = 3;k > j;k--){
                    if(cellArray[i][k] == 0 && noXBlock(i,j,k,cellArray)){
                        showMoveAnimation(i,j,i,k);
                        cellArray[i][k] = cellArray[i][j];
                        cellArray[i][j] = 0;
                        break;
                    }else if(cellArray[i][k] == cellArray[i][j] && noXBlock(i,j,k,cellArray) && hasConflicted[i][k] == false){
                        showMoveAnimation(i,j,i,k);
                        cellArray[i][k] += cellArray[i][j];
                        cellArray[i][j] = 0;
                        score += cellArray[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    //使用动画更新表格
    setTimeout(updateCellView,200);
    return true;
}
//向左滑
function moveLeft(){
    if(!canMoveLeft(cellArray))
        return false;
    for(var i = 0;i < 4;i++)
        for(var j = 1;j < 4;j++){
            if(cellArray[i][j] != 0){
                for(var k = 0;k < j;k++){
                    if(cellArray[i][k] == 0 && noXBlock(i,k,j,cellArray)){
                        showMoveAnimation(i,j,i,k);
                        cellArray[i][k] = cellArray[i][j];
                        cellArray[i][j] = 0;
                        break;
                    }else if(cellArray[i][k] == cellArray[i][j] && noXBlock(i,k,j,cellArray) && hasConflicted[i][k] == false){
                        showMoveAnimation(i,j,i,k);
                        cellArray[i][k] += cellArray[i][j];
                        cellArray[i][j] = 0;
                        score += cellArray[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    //使用动画更新表格
    setTimeout(updateCellView,200);
    return true;
}
//向上滑
function moveUp(){
    if(!canMoveUp(cellArray))
        return false;
    for(var i = 1;i < 4;i++)
        for(var j = 0;j < 4;j++){
            if(cellArray[i][j] != 0){
                for(var k = 0;k < i;k++){
                    if(cellArray[k][j] == 0 && noYBlock(j,k,i,cellArray)){
                        showMoveAnimation(i,j,k,j);
                        cellArray[k][j] = cellArray[i][j];
                        cellArray[i][j] = 0;
                        break;
                    }else if(cellArray[k][j] == cellArray[i][j] && noYBlock(j,k,i,cellArray) && hasConflicted[k][j] == false){
                        showMoveAnimation(i,j,k,j);
                        cellArray[k][j] += cellArray[i][j];
                        cellArray[i][j] = 0;
                        score += cellArray[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    //使用动画更新表格
    setTimeout(updateCellView,200);
    return true;
}
//向下滑
function moveDown(){
    if(!canMoveDown(cellArray))
        return false;
    for(var i = 2;i >= 0;i--)
        for(var j = 0;j < 4;j++){
            if(cellArray[i][j] != 0){
                for(var k = 3;k > i;k--){
                    if(cellArray[k][j] == 0 && noYBlock(j,i,k,cellArray)){
                        showMoveAnimation(i,j,k,j);
                        cellArray[k][j] = cellArray[i][j];
                        cellArray[i][j] = 0;
                        break;
                    }else if(cellArray[k][j] == cellArray[i][j] && noYBlock(j,i,k,cellArray) && hasConflicted[k][j] == false){
                        showMoveAnimation(i,j,k,j);
                        cellArray[k][j] += cellArray[i][j];
                        cellArray[i][j] = 0;
                        score += cellArray[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    //使用动画更新表格
    setTimeout(updateCellView,200);
    return true;
}

//新游戏
function newGame(){
    //初始化表格
    init();

    //在随机两个格子生成数字
    randomOneNumber();
    randomOneNumber();

}

//初始化
function init(){
    for(var i = 0; i < 4;i++){
        cellArray[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0;j < 4;j++){
            cellArray[i][j] = 0;
            hasConflicted[i][j] = false;
            var cell = $("#cell-"+i+"-"+j);
            cell.css('top',getPosition(i));
            cell.css('left',getPosition(j));
        }
    }
    updateCellView();
    score = 0;
    updateScore(score);
}

//更新表格
function updateCellView(){
    $(".numCell").remove();
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            $("#container").append('<div class="numCell" id="numCell-'+i+'-'+j+'"></div>');
            var numCell = $("#numCell-"+i+"-"+j);
            if(cellArray[i][j] == 0){
                numCell.css("width","0px");
                numCell.css("height","0px");
                numCell.css("top",getPosition(i));
                numCell.css("left",getPosition(j));
            }else{
                numCell.css("width",cellWidth);
                numCell.css("height",cellWidth);
                numCell.css("top",getPosition(i));
                numCell.css("left",getPosition(j));
                numCell.css("background-color",getNumBgcolor(cellArray[i][j]));
                numCell.css("color",getNumColor(cellArray[i][j]));
                numCell.text(cellArray[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }


}

//产生随机数
function randomOneNumber(){
    var emptyCellPos = emptyCell(cellArray);
    var len = emptyCellPos.length;
    if(len === 0)
        return false;

    //随机产生一个位置
    var randomPos = Math.floor(Math.random()*len);
    var randomX = emptyCellPos[randomPos][0];
    var randomY = emptyCellPos[randomPos][1];

    //随机产生一个数字
    var randomNum = Math.random() > 0.2 ? 2 : 4;

    //在随机位置显示随机数字
    cellArray[randomX][randomY] = randomNum;
    showNumAnimation(randomX,randomY,randomNum);

    return true;
}

//返回空格子的位置数组
function emptyCell(arr){
    var emptyCellPos = [];
    for(var i = 0;i < 4; i++)
        for(var j = 0;j < 4;j++){
            if(arr[i][j] === 0)
                emptyCellPos.push([i,j]);
        }
    return emptyCellPos;
}


//判断是否游戏结束
function isGameover(){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(cellArray[i][j] == 2048){
                alert("恭喜您成功拼出2048！");
                newGame();

            }
        }
    }
    if(nospace(cellArray) && nomove(cellArray)){
        alert("已经没有可移动的方块了！");
        newGame();
    }
}
