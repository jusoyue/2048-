var board = new Array();
var score = 0;
var hasConflicted = new Array();
$("document").ready(function(){
    newGame();
});
function newGame(){
    start();
    generateOneNumber();
    generateOneNumber();
}
function start(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridcell = $("#grid-cell-" + i + "-" + j);
            gridcell.css("top", getTop(i,j));
            gridcell.css("left", getLeft(i,j)); 
        }
    }
    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();

    score = 0;
    updateScore(score);
}
function getTop(i, j){
    return 20 + 120*i;
}
function getLeft(i, j){
    return 20 + 120*j;
}
function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#ac957c";break;
        case 4:return "#ddc5ac";break;
        case 8:return "#da9144";break;
        case 16:return "#da7d1b";break;
        case 32:return "#da581b";break;
        case 64:return "#e2520e";break;
        case 128:return "#e2cd0e";break;
        case 256:return "#c7b40d";break;
        case 512:return "rgb(160, 207, 19)";break;
        case 1024:return "#7adafd ";break;
        case 2048:return "rgb(7, 66, 85)";break;
    }
    return "black";
}
function getNumberColor(number){
    if(number <= 4){
        return "rgb(49, 42, 35)";
    }
    else{
        return "white";
    }
}
function nospace(board){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j] || board[i][j] == 0){
                    return true;
                }
        }
    }
    return false;
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1+1; i < col2; i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function canMoveUp(board){
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i-1][j] == 0 || board[i-1][j] == board[i][j] || board[i][j] == 0){
                return true;
            }
        }
    }
    return false;
}

function noBlockVertical(col, row1, row2, board){
    for(var i = row1+1; i < row2; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

function canMoveRight(board){
    for(var i = 0; i < 4; i++){
        for(var j = 2; j > -1; j--){
            if(board[i][j+1] == 0 || board[i][j+1] == board[i][j] || board[i][j] == 0){
                return true;
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i = 2; i > -1; i--){
        for(var j = 0; j < 4; j++){
            if(board[i+1][j] == 0 || board[i+1][j] == board[i][j] || board[i][j] == 0){
                return true;
            }
        }
    }
    return false;
}

function nomove(){
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }
    return true;
}
function showNumberWithAnimation(i, j, number){
    var newcell = $("#number-cell-" + i + "-" + j);
    newcell.css("background-color", getNumberBackgroundColor(number));
    newcell.css("color", getNumberColor(number));
    newcell.text(number);

    newcell.animate({
        width:"100px",
        height:"100px",
        top:getTop(i,j),
        left:getLeft(i,j)
    },50);
}

function moveAnimation(fromx, fromy, tox, toy){
    var moveCell = $("#number-cell-" + fromx +"-"+ fromy);

    moveCell.animate({
        top: getTop(tox, toy),
        left: getLeft(tox, toy)
    }, 200);
}

function updateScore(score){
    $("#score").text(score);
}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var theNumberCell = $("#number-cell-"+ i + "-" + j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getTop(i,j)+50);
                theNumberCell.css('left',getLeft(i,j)+50)
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getTop(i,j));
                theNumberCell.css('left',getLeft(i,j));

                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));

                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}
function generateOneNumber(){
    if(nospace(board)){
        return false;
    }
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;

    while(times < 50){
        if(board[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if(times == 50){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    var ranNumber = Math.random() < 0.5? 2 : 4; 
    board[randx][randy] = ranNumber;
    showNumberWithAnimation(randx, randy, ranNumber);
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
    case 37: if(moveLeft()){
        setTimeout("generateOneNumber()", 210);
        setTimeout("isgameover()", 300);
    }
    break;
    case 38: if(moveUp()){
        setTimeout("generateOneNumber()", 210);
        setTimeout("isgameover()", 300);
    }
    break;
    case 39: if(moveRight()){
        setTimeout("generateOneNumber()", 210);
        setTimeout("isgameover()", 300);
    }
    break;
    case 40: if(moveDown()){
        setTimeout("generateOneNumber()", 210);
        setTimeout("isgameover()", 300);
    }
    break;
    default: break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        moveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;

                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]){
                        moveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;

                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);

    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 2; j > -1; j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
                        moveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;

                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);

    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var i = 2; i > -1; i--){
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
                        moveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;

                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);

    return true;
}

function isgameover(){
    if(nospace(board) && nomove()){
        alert("游戏结束了弟弟!");
    }

}