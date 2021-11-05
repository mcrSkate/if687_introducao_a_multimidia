class Arena{
    constructor(){
        this.limits[0] = Bodies.rectangle(0,0,0,window.innerHeight, {restitution: 1, isStatic: true, friction: 0});//left
        this.limits[1] = Bodies.rectangle(window.innerWidth, 0, window.innerWidth, window.innerHeight, {restitution: 1, isStatic: true, friction: 0});//right
        this.limits[2] = Bodies.rectangle(0,0,window.innerWidth,0, {restitution: 1, isStatic: true, friction: 0});//top
        this.limits[3] = Bodies.rectangle(0,window.innerHeight,window.innerWidth,window.innerHeight, {restitution: 1, isStatic: true, friction: 0});//down
        this.all = Body.create();
    }

    getBodies(){
        Body.setParts(all, limits);
        return this.all;
    }
}