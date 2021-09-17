var web=[];
var enemy=[];
var score = 0;
var gInt;
var healthbar;

function up() {
    var t = parseInt(document.querySelector('#player').style.top);
    if(isNaN(t)) t = 160;
    t-=10;
    document.querySelector('#player').style.top = t+'px';

}
function down() {
    var t = parseInt(document.querySelector('#player').style.top);
    if(isNaN(t)) t = 160;
    t+=10;
    document.querySelector('#player').style.top = t+'px';
}
function left() {
    var l = parseInt(document.querySelector('#player').style.left);
    if(isNaN(l)) l = 165;
    l-=10;
    document.querySelector('#player').style.left = l+'px';
}
function right() {
    var l = parseInt(document.querySelector('#player').style.left);
    if(isNaN(l)) l = 165;
    l+=10;
    document.querySelector('#player').style.left = l+'px';
    }
    

window.addEventListener("keydown" , keys);
function keys(e){
    var x = event.which || event.keycode;
    console.log(x);
    if(x==38) up();
    if(x==40) down();
    if(x==37) left();
    if(x==39) right();
    if(x==32) jump ();
    if(x==17) attack ();
    if(x==13) start();

    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
      }
    
      function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
      }
      const keys = Array.from(document.querySelectorAll('.key'));
      keys.forEach(key => key.addEventListener('transitionend', removeTransition));
      window.addEventListener('keydown', playSound);  
}

function jump(){
    console.log('jump');
    setTimeout(function(){up()}, 200);
    setTimeout(function(){up()}, 300);
    setTimeout(function(){up()}, 400);
    setTimeout(function(){down()}, 400);
    setTimeout(function(){down()}, 500);
    setTimeout(function(){down()}, 600);
}

function attack(){
    // console.log('attack');
    var topP = document.querySelector('#player').style.top;
    var leftP = document.querySelector('#player').style.left;
    if(topP=='') topP = 140;
    if(leftP=='') leftP = 120;
 
    topP=parseInt(topP);
    leftP=parseInt(leftP);
    createWeb(topP, leftP);
}

function createWeb(topP, leftP) {
var leftB = leftP + 50;

var bID = 'web'+Date.now();
    console.log(bID); 
var b = document.createElement('div');
    b.setAttribute('id', bID);
    b.className = 'web';
    b.style.top = (topP+8)+'px';
    b.style.left = (leftB+50)+'px'; 
    b.style.display = 'block';
    document.querySelector('#board').appendChild(b);
    
    //while (leftB<=300){
        //setTimeout(function(){document.querySelector('#web').style.left = leftB+'px'},leftB);
        //leftB = leftB + 10;
//}
   

 web[bID] = setInterval(function(){
     document.querySelector('#'+bID).style.left = leftB+'px';
     leftB = leftB + 10;
     checkHit(bID); 
if(leftB>=500){
        clearInterval(web[bID]);
        document.querySelector('#'+bID).style.display = 'none';
        document.querySelector('#board').removeChild(document.querySelector('#'+bID));
     }
    }, 100);

}
function createEnemy() {
    var topE = Math.floor(Math.random() * 420);
    var leftE = 360;

    
    var eID = 'enemy'+Date.now();
        console.log(eID);
    var e = document.createElement('div');
        e.setAttribute('id', eID);
        e.className = 'enemy';
        e.style.top = (topE+8)+'px';
        e.style.left = leftE+'px';
        e.style.display = 'block';
        document.querySelector('#board').appendChild(e);

        
        // //while (leftB<=300){
        //     //setTimeout(function(){document.querySelector('#web').style.left = leftB+'px'},leftB);
        //     leftB = leftB + 10;
 enemy[eID] = setInterval(function(){
         document.querySelector('#'+eID).style.left = leftE+'px';
         leftE = leftE + 8;
    if(leftE<=0){
            clearInterval(enemy[eID]);
            document.querySelector('#'+eID).style.display = 'none';
            document.querySelector('#board').removeChild(document.querySelector
                ('#'+eID));
         }
        }, 400);
    }
    function healthbar(h) {
        var h = document.querySelector('#'+h);
        var e = document.querySelectorAll('.enemy'), i;
    for (i = 0; i < e.length; --i) {
      // console.log(e[i].style.top); 
      // console.log(e[i].style.left);
      var hitL = false;
      var hitP = false;
          if(parseInt(h.style.left)>=parseInt(h[i].style.left)
      && (parseInt(h.style.left)<=parseInt(h[i].style.left)+72)){
          // console.log('hit left')
          hitL = true;
      }
      if(parseInt(h.style.top)>=parseInt(h[i].style.top)
      && (parseInt(h.style.top)<=parseInt(h[i].style.top)+72)){
          // console.log('hit top')
          hitP =- true;
    }
      if(hitL && hitP){
          console.log('health'); 
          health--;
          document.querySelector('.healtbar').innerHTML='healthbar'+healthbar;
          if(healthbar<=0) gameOver();
          document.querySelector('#board').removeChild(document.querySelector
              ('#'+h[i].getAttribute('id')));
          document.querySelector('#board').removeChild(document.querySelector
              ('#'+h.getAttribute('id')));   
              clearInterval(healthbar[h.getAttribute('id')]);
              clearInterval(enemy[e[i].getAttribute('id')]);
    
      
      }
    }
      } 

function checkHit (b) {
      var b = document.querySelector('#'+b);
      var e = document.querySelectorAll('.enemy'), i;

for (i = 0; i < e.length; ++i) {
    // console.log(e[i].style.top); 
    // console.log(e[i].style.left);
    var hitL = false;
    var hitP = false;
        if(parseInt(b.style.left)>=parseInt(e[i].style.left)
    && (parseInt(b.style.left)<=parseInt(e[i].style.left)+72)){
        // console.log('hit left')
        hitL = true;
    }
    if(parseInt(b.style.top)>=parseInt(e[i].style.top)
    && (parseInt(b.style.top)<=parseInt(e[i].style.top)+72)){
        // console.log('hit top')
        hitP = true;
}
    if(hitL && hitP){
        console.log('hit'); 
        score++;
        document.querySelector('#score').innerHTML='Score: '+score;
        if(score>=5) gameOver();
        document.querySelector('#board').removeChild(document.querySelector
            ('#'+e[i].getAttribute('id')));
        document.querySelector('#board').removeChild(document.querySelector
            ('#'+b.getAttribute('id')));   
            clearInterval(web[b.getAttribute('id')]);
            clearInterval(enemy[e[i].getAttribute('id')]);
    
    }
}
    } 

function start() {
    document.querySelector('#start').style.display='none';

    gInt = setInterval(function(){
      createEnemy();
       }, 3000);
}

function gameOver(){
    clearInterval(gInt);
    console.log('GAMEOVER');
}


