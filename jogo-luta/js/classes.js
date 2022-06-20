class Sprite{ 
    constructor({position,imageSrc}){
        this.position=position
        this.width=50
        this.height=150    
        this.image= new Image()
        this.image.scr= imageSrc 
    
    }

    draw(){ 
        c.drawImage(this.image, this.position.x, this.position.y)
    }


    update(){
      this.draw()
 }
} 



class Fighter{ 
  constructor({position,velocity,color='pink', offset}){
      this.position=position
      this.velocity= velocity
      this.width=50
      this.height=150
      this.lastkey
      this.attackBox={
          position: {
            x: this.position.x,
            y: this.position.y
          }, //this makes always follow the player
           offset:offset,
            width: 100,
            height:50, //attack retangle
           }
         
      
      this.color= color
      this.isAttacking //revise
       this.health=100
  }

  draw(){ //forms 
      c.fillStyle= this.color
      c.fillRect(this.position.x, this.position.y, this.width, this.height)

      //attack box
      if(this.isAttacking){ 
        //when you add this.isAttacking{} makes go if this is true than do this
      c.fillStyle= 'purple'
      c.fillRect(this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height) //problem with this one 
      }
    
  }


  update(){
      this.draw() //forms: velocity with gravity and one another
      this.attackBox.position.x= this.position.x + this.attackBox.offset.x
      this.attackBox.position.y= this.position.y

      this.position.x += this.velocity.x 
      this.position.y += this.velocity.y
  
      if(this.position.y + this.height + this.velocity.y>= canvas.height){
          this.velocity.y=0
      } else
       this.velocity.y += gravity // when falls its the same velocity as thi.velocity
  }

  attack(){
      this.isAttacking= true
      setTimeout(() => {
          this.isAttacking= false // when pass 100ms the attack wont damage
      }, 100);
  }
} 