/* global myConfig */

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

console.log("myConfig is present in global scope :" + myConfig!==undefined);

var piece = drawPiece(40, 40, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);

var angle = 1;
function r() {
    piece.rotate(angle);
}
setInterval(r, 10);




