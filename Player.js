class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.spt=createSprite(this.x, this.y, 50,50);
        this.spt.scale = 0.05;
        this.spt.addImage("player",playerImage);
        this.spt.shapeColor="orange";
    }

    motion(xdir,ydir){
        this.spt.x += xdir*grid;
        this.spt.y += ydir*grid;
    }
}