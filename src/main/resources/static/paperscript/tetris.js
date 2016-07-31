function drawBlock(x, y) {

    var colorMain = "#FF0000";
    var colorLight = "#FFAA00";
    var colorDark = "#CC0000";
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
    var blocPresence = 0;
    var arrayOfBlock = [];
    var block;
    for (var lines = 0; lines < pieceData.height; lines++) {
        for (var rows = 0; rows < pieceData.width; rows++) {
            console.log("lines=" + lines + ",rows=" + rows);
            console.log("x=" + x + ",y=" + y);
            blocPresence = pieceData.data[lines][rows];
            if (blocPresence === true) {
                block = drawBlock(x, y);
                arrayOfBlock.push(block);
            }
            x += myConfig.sizeBlock;
        }
        y += myConfig.sizeBlock;
    }
    var piece = new Group({
        children: arrayOfBlock
    });
    return piece;

}

console.log("myConfig is present in global scope :" + myConfig!==undefined);
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var piece = drawPiece(40, 40, myConfig.listOfPiece[getRandomInt(0,myConfig.listOfPiece.length)]);


var angle = 1;
function r() {
    piece.rotate(angle);
}
setInterval(r, 10);




