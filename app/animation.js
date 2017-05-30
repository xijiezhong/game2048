var support = require("./support.js");
var cellWidth = "75px";
//显示数字动画
exports.showNumAnimation = function(i,j,number){
	var numCell = $("#numCell-"+i+"-"+j);
	numCell.css("background-color",support.getNumBgcolor(number));
	numCell.css("color",support.getNumColor(number));
	numCell.text(number);
	numCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:support.getPosition(i),
		left:support.getPosition(j)
	},50);
}

//格子移动动画
exports.showMoveAnimation = function(oldRow,oldCol,newRow,newCol){
	var numCell = $("#numCell-"+oldRow+"-"+oldCol);
	numCell.animate({
		top: support.getPosition(newRow),
		left: support.getPosition(newCol)},
		200);
}

//更新分数
exports.updateScore = function(score){
	$("strong").text(score);
}