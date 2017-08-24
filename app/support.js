//根据格子的坐标返回它的位置
exports.getPosition = function(n){
	var pos;
	switch(n){
		case 0: pos = "20px";
		     break;
		case 1: pos = "115px";
		     break;
		case 2: pos = "210px";
		     break;
		case 3: pos = "305px";
		     break;
	}
	return pos;
}
//获得相应数字的背景色
exports.getNumBgcolor = function(number){
	switch (number) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;
        default:return 'black';
	}

}
//获得相应数字的颜色
exports.getNumColor = function(number){
	if(number <= 4)
		return "#776e65";
	return 'white';
}
//判断能否向左滑
function canMoveLeft(cellArray){
	for(var i = 0;i < 4;i++)
		for(var j = 1;j < 4;j++){
			if(cellArray[i][j] != 0)
				if(cellArray[i][j-1] == 0 || cellArray[i][j-1] == cellArray[i][j])
					return true;
		}
	return false;
}
exports.canMoveLeft = canMoveLeft;
//判断能否向下滑
function canMoveDown(cellArray){
	for(var i = 0;i < 3;i++)
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] != 0)
				if(cellArray[i+1][j] == 0 || cellArray[i+1][j] == cellArray[i][j])
					return true;
		}

	return false;
}
exports.canMoveDown = canMoveDown;

//判断能否向上滑 
function canMoveUp(cellArray){
	for(var i = 1;i < 4;i++)
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] != 0)
				if(cellArray[i-1][j] == 0 || cellArray[i-1][j] == cellArray[i][j])
					return true;
		}
	return false;
}
exports.canMoveUp = canMoveUp;
//判断能否向右滑
function canMoveRight(cellArray){
	for(var i = 0;i < 4;i++)
		for(var j = 0;j < 3;j++){
			if(cellArray[i][j] != 0)
				if(cellArray[i][j+1] == 0 || cellArray[i][j+1] == cellArray[i][j])
					return true;
		}
	return false;
}
exports.canMoveRight = canMoveRight;
//判断水平方向两个格子间是否有数字阻塞
exports.noXBlock = function(row,col1,col2,cellArray){
	for(var j = col1 + 1;j < col2;j++)
		if(cellArray[row][j] != 0)
			return false;
	return true;
}
//判断垂直方向两个格子间是否有数字阻塞
exports.noYBlock = function(col,row1,row2,cellArray){
	for(var i = row1 + 1;i < row2;i++)
		if(cellArray[i][col] != 0)
			return false;
	return true;
}
//判断是否还能移动
exports.nomove = function(cellArray){
	if(canMoveUp(cellArray) || canMoveDown(cellArray) || canMoveRight(cellArray) || canMoveLeft(cellArray)){
		return false;
	}
	return true;
}
//判断是否还有空格子
exports.nospace = function(cellArray){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(cellArray[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
