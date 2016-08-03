var ROTATION_SPEED = 5;
var FALLING_SPEED=0.25;
var angle = 0;
var rotation = 0;
var position = 0;
var linesCompleted = 0;
var piece;

function drawBlock(x, y, colorIdx) {
    var colorMain = myConfig.listOfColor[colorIdx].colorMain;
    var colorLight = myConfig.listOfColor[colorIdx].colorLight;
    var colorDark = myConfig.listOfColor[colorIdx].colorDark;
    var sizeLight = myConfig.sizeBlock / 10;
    var point, size;

    point = new Point(x, y);
    size = new Size(myConfig.sizeBlock, myConfig.sizeBlock);
    var path1 = new Path.Rectangle(point, size);
    path1.fillColor = colorMain;

    point = new Point(x, y);
    size = new Size(sizeLight, myConfig.sizeBlock);
    var path2 = new Path.Rectangle(point, size);
    path2.fillColor = colorLight;

    point = new Point(x + myConfig.sizeBlock - sizeLight, y);
    size = new Size(sizeLight, myConfig.sizeBlock);
    var path4 = new Path.Rectangle(point, size);
    path4.fillColor = colorDark;

    point = new Point(x, y);
    size = new Size(myConfig.sizeBlock, sizeLight);
    var path3 = new Path.Rectangle(point, size);
    path3.fillColor = colorLight;

    point = new Point(x, y + myConfig.sizeBlock - sizeLight);
    size = new Size(myConfig.sizeBlock, sizeLight);
    var path5 = new Path.Rectangle(point, size);
    path5.fillColor = colorDark;

    var block = new Group({
        children: [path1, path2, path3, path4, path5]
    });
    return block;
}


function drawPiece(x, y, pieceData) {
    var xInitial=x;
    var blocPresence = 0;
    var arrayOfBlock = [];
    var block;
    var colorIdx = getRandomInt(0,myConfig.listOfColor.length);
    console.log(pieceData.name);    
    for (var lines = 0; lines < pieceData.height; lines++) {
        for (var rows = 0; rows < pieceData.width; rows++) {
            blocPresence = pieceData.data[lines][rows];
            if (blocPresence === true) {
                block = drawBlock(x, y,colorIdx);
                arrayOfBlock.push(block);
            }
            x += myConfig.sizeBlock;
        }
        x=xInitial;
        y += myConfig.sizeBlock;
    }
    var pivot = new Path.Circle(new Point(pieceData.pivotX*myConfig.sizeBlock, pieceData.pivotY*myConfig.sizeBlock), 5);
    pivot.fillColor = 'black';
    arrayOfBlock.push(pivot);
    var piece = new Group({
        children: arrayOfBlock
    });
    piece.pivot=new Point(pieceData.pivotX*myConfig.sizeBlock, pieceData.pivotY*myConfig.sizeBlock);
    return piece;
}

// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	content: 'lines completed : '+linesCompleted+'\nposition:'+(piece!==undefined?piece.position.y:"undefined"),
	justification: 'center',
	fontSize: 15
});

var bottomPointY;
function fallPiece(){
    if(piece!==undefined){
        bottomPointY = Math.max.apply(Math, [ piece.bounds.bottomLeft.y, piece.bounds.bottomRight.y, piece.bounds.topLeft.y, piece.bounds.topRight.y ]) ;
    }
    if((piece!==undefined)&&( bottomPointY <myConfig.gridHeight)){
            piece.translate(new Point(0,FALLING_SPEED));        
    }else{
        piece = drawPiece(0, 0, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);
    }
    // Create a centered text item at the center of the view:
    //text.content='lines completed : '+linesCompleted+'\nposition:'+(piece!==undefined?piece.position.y:"undefined")+ "\nbottomPosition:"+(piece!==undefined?piece.bottomLeft.y:"undefined");
    text.content='lines completed : '+linesCompleted+'\nposition:'+(piece!==undefined?piece.position.y:"undefined");
}

function move(direction){
    if(direction==="left"){
        if(piece.position.x>myConfig.sizeBlock){
            piece.translate(new Point(-myConfig.sizeBlock,0));
        }
    }
    if(direction==="right"){
        if(piece.position.x<=myConfig.gridWidth-myConfig.sizeBlock){
            piece.translate(new Point(myConfig.sizeBlock,0));
        }
    }
    
}

function rotatePiece() {
    angle=angle+rotation;
    piece.rotate(rotation);
    if(angle>359){
        angle-=360;
    }
    if(angle<0){
        angle+=360;
    }
    if((angle===0)||(angle===90)||(angle===180)||(angle===270)){
        rotation=0;
    }
}




function onKeyDown(event) {
        if(event.key==="down"){
            console.log("rotate-left");
            rotation=-ROTATION_SPEED;
        }
        if(event.key==="up"){
            console.log("rotate-right");
            rotation=ROTATION_SPEED;
        }
        if(event.key==="space"){
            console.log("down");
            console.log("To be implemented");
        }
        if(event.key==="left"){
            console.log("move-left");
            move("left");
        }
        if(event.key==="right"){
            console.log("move-right");
            move("right");
        }
}

console.log("myConfig is present in global scope :" + (myConfig!==undefined).toString());

//piece = drawPiece(40, 40, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);



setInterval(rotatePiece, 10);
setInterval(fallPiece, 10);



