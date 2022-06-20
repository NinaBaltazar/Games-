const canvas=document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width= 1024
canvas.height= 576 //game screen


c.fillRect(0,0,canvas.width,canvas.height)
const gravity=0.7 //velocity of the fall : gravity
const background= new Sprite({
  position: {
    x:0,
    y:0
  },
  imageSrc: './img/background(1).png'
})


const player= new Fighter({ //start position
    position:{
    x:0,
    y:0
},
  velocity:{
    x:0,
    y:0
  },
   offset:{
    x:0,
    y:0
   }

}) 



const enemy= new Fighter({ //strat position
    position:{
    x:400,
    y:100
},
  velocity:{
    x:0,
    y:0
  },
  color:'yellow',
  offset:{
    x:-50,
    y:0
   }
}) 
enemy.draw()
console.log(player)

const keys={
    a:{
        pressed:false
    },

    d:{
        pressed:false
    },
    
    ArrowRight:{
        pressed:false
    } ,

    ArrowLeft:{
        pressed:false
    }
    


}

function retangularCollision({retangle1,retangle2}) {
  return (
    retangle1.attackBox.position.x + retangle1.attackBox.width>= retangle2.position.x //position player 1 and 2 horizontal
    &&  retangle1.attackBox.position.x <= retangle2.position.x + retangle2.width && retangle1.attackBox.position.y + retangle1.attackBox.height>= enemy.position.y // pass the enemy point count false
    && retangle1.attackBox.position.y<= retangle2.position.y + retangle2.height
  )
}


function determinateWinner({player,enemy,TimerId}){
  clearTimeout(TimerId)
  document.querySelector('#displayText'), style.display='flex'
  if(player.health=== enemy.health){
    document.querySelector('#displayText'), innerHTML='Tie'

   } else if(player.health>enemy.health){
     document.querySelector('#displayText'), innerHTML='Princess Rocket Wins'

   }else if(enemy.health>player.health){
     document.querySelector('#displayText'), innerHTML='Princess Bee Wins'

   }
}


let timer = 60
let TimerId
function decreaseTimer(){
 
  if(timer>0) {
   TimerId= setTimeout(decreaseTimer, 1000 )
    timer-- 
    document.querySelector('#timer').innerHTML = timer
  }
    if (timer===0) {
      document.querySelector('#displayText'), style.display='flex'
    determinateWinner({player,enemy, TimerId})
  }
}

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate) //loop
    c.fillStyle='black'
    c.fillRect(0,0, canvas.width, canvas.height)
   background.update()
   player.update()
   enemy.update()

   player.velocity.x =0
   enemy.velocity.x=0
   /* player movement */

  if(keys.a.pressed && player.lastkey === 'a'){
    player.velocity.x=-5
  } else if(keys.d.pressed && player.lastkey==='d'){
     player.velocity.x =5 // movement velocity
  }
     /* enemy movement */
  if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
    enemy.velocity.x=-5
  } else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
     enemy.velocity.x =5 //movement velocity
  }

  //detect for collision
  if(
    retangularCollision({
      retangle1:player,
      retangle2:enemy
    })
       &&
        player.isAttacking // jump another point counter attack false and attack
  ) {
    player.isAttacking= false // so will only count 1 hit at time of thr attack 100ms
    enemy.health-=20
     document.querySelector('#enemyHealth').style.width=enemy.health + '%'
  }


  if(
    retangularCollision({
      retangle1:enemy,
      retangle2:player
    })
       &&
        enemy.isAttacking // jump another point counter attack false and attack
  ) {
    enemy.isAttacking= false // so will only count 1 hit at time of thr attack 100ms
    player.health-=20
    document.querySelector('#playerHealth').style.width=player.health + '%'
    console.log('enemy attack go ')  
  }


  //end game based on health

  if (enemy.health<=0 || player.health<=0) {
    determinateWinner({player,enemy, TimerId})

    
  }

} 

animate() //animaton


window.addEventListener('keydown',(event) =>{
    
    switch(event.key){ //console player
        case 'd':
            keys.d.pressed=true
            player.lastkey='d'
            break

            case 'a':
              keys.a.pressed=true
              player.lastkey='a'
                break

                case 'w':
                 player.velocity.y = -20
                break

                case ' ':
                    player.attack()
                    break


                case 'ArrowRight':
            keys.ArrowRight.pressed=true //console enemy
            enemy.lastkey='ArrowRight'
            
            break

            case 'ArrowLeft':
              keys.ArrowLeft.pressed=true
            enemy.lastkey= 'ArrowLeft'
                break

                case 'ArrowUp':
                 enemy.velocity.y = -20
                break

                case 'ArrowDown':
                  enemy.isAttacking=true
                  break
    }
    

})

window.addEventListener('keyup',(event) =>{ //when you stop pressing 
    switch(event.key){
        case 'd':
           keys.d.pressed = false
            break

            case 'a':
            keys.a.pressed = false
            break

           /* theres no need for w or arrrow up because gravity already do that */
    }
      /* enemy keys */
    switch(event.key){ //when you stop pressing
        case 'ArrowRight':
           keys.ArrowRight.pressed = false
            break

            case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break 

          

          
    }
    
    

})