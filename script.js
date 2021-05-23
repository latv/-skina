window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    window.addEventListener('gamepadconnected', (event) => {
        gamepadIndex = event.gamepad.index;
        gamepad_action(gamepadIndex);
    });
    setInterval(game,1000/15);
}
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
isGameStarted=false;
tail = 5;
function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            if(isGameStarted===true){
            document.getElementById("score").innerText="Spēle beigusies tev ir " + tail + " punkti, spied ←↑→↓ lai atsāktu";}
            
            tail = 5;
            xv=yv=0;

        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        tail++;
        document.getElementById("score").innerText="Rezultāts astei " + tail;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    
}
function keyPush(evt) {
 

    switch(evt.keyCode) {
        
        case 37:
            xv=-1;yv=0;
            document.getElementById("score").innerText="Rezultāts astei " + tail;
            isGameStarted=true;
            break;
        case 38:
            xv=0;yv=-1;
            document.getElementById("score").innerText="Rezultāts astei " + tail;
            isGameStarted=true;
            break;
        case 39:
            xv=1;yv=0;
            document.getElementById("score").innerText="Rezultāts astei " + tail;
            isGameStarted=true;
            break;
        case 40:
            xv=0;yv=1;
            document.getElementById("score").innerText="Rezultāts astei " + tail;
            isGameStarted=true;
            break;
    }
}
function gamepad_action(gamepadIndex){
 
    
    // now print the axes on the connected gamepad, for example: 
    setInterval(() => {
        if(gamepadIndex !== undefined) {
            // a gamepad is connected and has an index
            const myGamepad = navigator.getGamepads()[gamepadIndex];
    
            console.log(`Left stick at (${myGamepad.axes[0]}, ${myGamepad.axes[1]})` );
            
            if(myGamepad.axes[0]<0.1){
                xv=-1;yv=0;
                document.getElementById("score").innerText="Rezultāts astei " + tail;
                isGameStarted=true;
                
            }
            if(myGamepad.axes[0]>-0.1){
               
                xv=1;yv=0;
                document.getElementById("score").innerText="Rezultāts astei " + tail;
                isGameStarted=true;
            }
            if(myGamepad.axes[1]>0.1){
                
                xv=0;yv=1;
                document.getElementById("score").innerText="Rezultāts astei " + tail;
                isGameStarted=true;
            }
            if(myGamepad.axes[1]<-0.1){
               
                xv=0;yv=-1;
                document.getElementById("score").innerText="Rezultāts astei " + tail;
                isGameStarted=true;
            }
    
        }
    }, 100) // print axes 10 times per second
}