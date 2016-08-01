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
    var piece = new Group({
        children: arrayOfBlock
    });
    return piece;

}
function fallPiece(){
    piece.translate(new Point(0,FALLING_SPEED));
}

function move(direction){
    if(direction==="left"){
        piece.translate(new Point(-myConfig.sizeBlock,0));
    }
    if(direction==="right"){
        piece.translate(new Point(myConfig.sizeBlock,0));
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
// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.top,
	content: 'lines completed : '+linesCompleted,
	justification: 'center',
	fontSize: 15
});

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

piece = drawPiece(40, 40, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);



setInterval(rotatePiece, 10);
setInterval(fallPiece, 10);



