//依赖文件
var support = require("./support.js");
var anmiation = require("./animation.js");



//main.js

var cellArray = new Array();
var hasConflicted = new Array();
var score = 0;
var cellWidth = "75px";



//向右滑
exports.moveRight = function(){
	if(!support.canMoveRight(cellArray))
		return false;
	for(var i = 0;i < 4;i++)
		for(var j = 2;j >= 0;j--){
			if(cellArray[i][j] != 0){
				for(var k = 3;k > j;k--){
					if(cellArray[i][k] == 0 && support.noXBlock(i,j,k,cellArray)){
						anmiation.showMoveAnimation(i,j,i,k);
						cellArray[i][k] = cellArray[i][j];
						cellArray[i][j] = 0;
						break;
					}else if(cellArray[i][k] == cellArray[i][j] && support.noXBlock(i,j,k,cellArray) && hasConflicted[i][k] == false){
						anmiation.showMoveAnimation(i,j,i,k);
						cellArray[i][k] += cellArray[i][j];
						cellArray[i][j] = 0;
						score += cellArray[i][k];
						anmiation.updateScore(score);
						hasConflicted[i][k] = true;
						break;
					}
				}
			}
		}
	//使用动画更新表格
	setTimeout("updateCellView()",200);
	return true;
}
//向左滑
exports.moveLeft = function(){
	if(!support.canMoveLeft(cellArray))
		return false;
	for(var i = 0;i < 4;i++)
		for(var j = 1;j < 4;j++){
			if(cellArray[i][j] != 0){
				for(var k = 0;k < j;k++){
					if(cellArray[i][k] == 0 && support.noXBlock(i,k,j,cellArray)){
						anmiation.showMoveAnimation(i,j,i,k);
						cellArray[i][k] = cellArray[i][j];
						cellArray[i][j] = 0;
						break;
					}else if(cellArray[i][k] == cellArray[i][j] && support.noXBlock(i,k,j,cellArray) && hasConflicted[i][k] == false){
						anmiation.showMoveAnimation(i,j,i,k);
						cellArray[i][k] += cellArray[i][j];
						cellArray[i][j] = 0;
						score += cellArray[i][k];
						anmiation.updateScore(score);
						hasConflicted[i][k] = true;
						break;
					}
				}
			}
		}
	//使用动画更新表格
	setTimeout("updateCellView()",200);
	return true;
}
//向上滑
exports.moveUp = function(){
	if(!support.canMoveUp(cellArray))
		return false;
	for(var i = 1;i < 4;i++)
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] != 0){
				for(var k = 0;k < i;k++){
					if(cellArray[k][j] == 0 && support.noYBlock(j,k,i,cellArray)){
						anmiation.showMoveAnimation(i,j,k,j);
						cellArray[k][j] = cellArray[i][j];
						cellArray[i][j] = 0;
						break;
					}else if(cellArray[k][j] == cellArray[i][j] && support.noYBlock(j,k,i,cellArray) && hasConflicted[k][j] == false){
						anmiation.showMoveAnimation(i,j,k,j);
						cellArray[k][j] += cellArray[i][j];
						cellArray[i][j] = 0;
						score += cellArray[k][j];
						anmiation.updateScore(score);
						hasConflicted[k][j] = true;
						break;
					}
				}
			}
		}
	//使用动画更新表格
	setTimeout("updateCellView()",200);
	return true;
}
//向下滑
exports.moveDown =function(){
	if(!support.canMoveDown(cellArray))
		return false;
	for(var i = 2;i >= 0;i--)
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] != 0){
				for(var k = 3;k > i;k--){
					if(cellArray[k][j] == 0 && support.noYBlock(j,i,k,cellArray)){
						anmiation.showMoveAnimation(i,j,k,j);
						cellArray[k][j] = cellArray[i][j];
						cellArray[i][j] = 0;
						break;
					}else if(cellArray[k][j] == cellArray[i][j] && support.noYBlock(j,i,k,cellArray) && hasConflicted[k][j] == false){
						anmiation.showMoveAnimation(i,j,k,j);
						cellArray[k][j] += cellArray[i][j];
						cellArray[i][j] = 0;
						score += cellArray[k][j];
						anmiation.updateScore(score);
						hasConflicted[k][j] = true;
						break;
					}
				}
			}
		}
	//使用动画更新表格
	setTimeout("updateCellView()",200);
	return true;
}

//新游戏
exports.newGame = function(){
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
			cell.css('top',support.getPosition(i));
			cell.css('left',support.getPosition(j));
		}
    }
	updateCellView();
	score = 0;
	anmiation.updateScore(score);
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
				numCell.css("top",support.getPosition(i));
				numCell.css("left",support.getPosition(j));
			}else{
				numCell.css("width",cellWidth);
				numCell.css("height",cellWidth);
				numCell.css("top",support.getPosition(i));
				numCell.css("left",support.getPosition(j));
				numCell.css("background-color",support.getNumBgcolor(cellArray[i][j]));
				numCell.css("color",support.getNumColor(cellArray[i][j]));
				numCell.text(cellArray[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	

}

//产生随机数
exports.randomOneNumber = function(){
	var emptyCellPos = emptyCell(cellArray);
	var len = emptyCellPos.length;
	if(len === 0)
		return false;

	//随机产生一个位置
	var randomPos = Math.round(Math.random()*len);
	var randomX = emptyCellPos[randomPos][0];
	var randomY = emptyCellPos[randomPos][1];

	//随机产生一个数字
	var randomNum = Math.random() > 0.5 ? 2 : 4;

	//在随机位置显示随机数字
	cellArray[randomX][randomY] = randomNum;
	anmiation.showNumAnimation(randomX,randomY,randomNum);

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
exports.isGameover = function(){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] == 2048){
				alert("恭喜您成功拼出2048！");
				newGame();
				
			}
		}
	}
	if(support.nospace(cellArray) && support.nomove(cellArray)){
		alert("已经没有可移动的方块了！");
		newGame();
	}		
}
