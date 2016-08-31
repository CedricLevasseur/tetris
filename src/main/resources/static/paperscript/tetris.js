var DEFAUT_ROTATION_SPEED = 5;
var DEFAUT_FALLING_SPEED=1;
var angle = 0;
var rotation = 0;
var position = 0;
var linesCompleted = 0; 
var piece;
var fallingSpeed = DEFAUT_FALLING_SPEED;

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


function getUpperLeftX(piece) {
    var x = Math.min.apply(Math, [ piece.bounds.topLeft.x, piece.bounds.topRight.x, piece.bounds.bottomLeft.x, piece.bounds.bottomRight.x ]) ;
    console.log("getUpperLeftX="+x);
    return x;
}

function getUpperLeftY(piece) {
    var y=  Math.min.apply(Math, [ piece.bounds.topLeft.y, piece.bounds.topRight.y, piece.bounds.bottomLeft.y, piece.bounds.bottomRight.y ]) ;
    console.log("getUpperLeftY="+y);
    return y;
}

function getUpperRightX(piece) {
    var x=Math.max.apply(Math, [ piece.bounds.topLeft.x, piece.bounds.topRight.x, piece.bounds.bottomLeft.x, piece.bounds.bottomRight.x ]) ;
    console.log("getUpperRightX="+x);
    return x;
}

function getUpperRightY(piece) {
    var y=Math.max.apply(Math, [ piece.bounds.topLeft.y, piece.bounds.topRight.y, piece.bounds.bottomLeft.y, piece.bounds.bottomRight.y ]) ;
    console.log("getUpperRightY="+y);
    return y;
}


function drawUpperLeftPoint(piece){
    if(piece!==undefined){
        var upperLeft = new Path.Circle(new Point(getUpperLeftX(piece),getUpperLeftY(piece)), 5);
        upperLeft.fillColor = 'red';
        piece.children.push(upperLeft);
    }
    return piece;
}


/**
 * Draw a piece with drawBlock from a schema coming from pieceConfig 
 * @param {type} x 
 * @param {type} y
 * @param {type} pieceConfig
 * @returns {Group|drawPiece.piece}
 */
function drawPiece(x, y, pieceConfig) {
    var xInitial=x;
    var yInitial=y;
    var blocPresence = 0;
    var arrayOfBlock = [];
    var block;
    var colorIdx = getRandomInt(0,myConfig.listOfColor.length);
    console.log(pieceConfig.name);    
    for (var lines = 0; lines < pieceConfig.height; lines++) {
        for (var rows = 0; rows < pieceConfig.width; rows++) {
            blocPresence = pieceConfig.data[lines][rows];
            if (blocPresence === true) {
                block = drawBlock(x, y,colorIdx);
                arrayOfBlock.push(block);
            }
            x += myConfig.sizeBlock;
        }
        x=xInitial;
        y += myConfig.sizeBlock;
    }
    var pivot = new Path.Circle(new Point(pieceConfig.pivotX*myConfig.sizeBlock, pieceConfig.pivotY*myConfig.sizeBlock), 5);
    pivot.fillColor = 'black';
    arrayOfBlock.push(pivot);
    var piece = new Group({
        children: arrayOfBlock
    });
    piece.pivot=new Point(pieceConfig.pivotX*myConfig.sizeBlock, pieceConfig.pivotY*myConfig.sizeBlock);
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
    //console.log("fallPiece");
    if(piece!==undefined){
        bottomPointY = Math.max.apply(Math, [ piece.bounds.bottomLeft.y, piece.bounds.bottomRight.y, piece.bounds.topLeft.y, piece.bounds.topRight.y ]) ;
    }
    if((piece!==undefined)&&( bottomPointY <myConfig.gridHeight)){
            piece.translate(new Point(0,fallingSpeed));        
    }else{
        piece = drawPiece(0, 0, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);
        piece = drawUpperLeftPoint(piece);
    }
    // Create a centered text item at the center of the view:
    //text.content='lines completed : '+linesCompleted+'\nposition:'+(piece!==undefined?piece.position.y:"undefined")+ "\nbottomPosition:"+(piece!==undefined?piece.bottomLeft.y:"undefined");
    text.content='lines completed : '+linesCompleted+'\nfallingSpeed='+fallingSpeed+'\npositionX:'+(piece!==undefined?piece.position.x:"undefined") +'\npositionY:'+(piece!==undefined?piece.position.y:"undefined" );
}

function move(direction){
    console.log("move "+direction);
    if(direction==="left"){
        if(getUpperLeftX(piece)>myConfig.sizeBlock){
            piece.translate(new Point(-myConfig.sizeBlock,0));
        }
    }
    if(direction==="right"){
        if(getUpperRightX(piece)<=myConfig.gridWidth-myConfig.sizeBlock){
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
            rotation=-DEFAUT_ROTATION_SPEED;
        }
        if(event.key==="up"){
            console.log("rotate-right");
            rotation=DEFAUT_ROTATION_SPEED;
        }
        if(event.key==="space"){
            fallingSpeed=DEFAUT_FALLING_SPEED*4;           
            console.log("speed UP : "+fallingSpeed);
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
function onKeyUp(event) {
        if(event.key==="space"){
            
            fallingSpeed=DEFAUT_FALLING_SPEED;
            console.log("speed down : "+fallingSpeed);
        }
}

console.log("myConfig is present in global scope :" + (myConfig!==undefined).toString());

//piece = drawPiece(40, 40, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);



setInterval(rotatePiece, 10);
setInterval(fallPiece, 10);



