const snake = document.querySelector('.snake');
const gameBoard = document.querySelector(".game-board");
const score_element = document.querySelector(".score");
let lastRenderTime = 0 ;
let speed = 1   ;
let score = 0 ;
let expansion_rate = 2 ;
let game_over  ;

function main(currenetTime){
 
    if(game_over){
      alert("Lost the game");
      return ;
    }
   else {
  window.requestAnimationFrame(main);
  
  const secondsSinceLastRender = (currenetTime - lastRenderTime) / 1000 ; 
  if(secondsSinceLastRender < speed/10) return


  console.log('hi');

 lastRenderTime = currenetTime ;
 update_snake();
 draw_snake();
 update_food();  
 draw_food();
 check_game(snakeBody);
}
}

window.requestAnimationFrame(main);




let inputDirection = {x:0 , y:0};

window.addEventListener("keydown", e => {
  let lastInput = inputDirection ;
  switch(e.key){
   case "ArrowUp": 
    if(lastInput.x != 0)break
    inputDirection =  {x:-1 , y:0};
    lastInput = inputDirection ;
    break;
  case "ArrowDown": 
    if(lastInput.x != 0)break
    inputDirection =  {x:1 , y:0};
    lastInput = inputDirection ;
    break;
  case "ArrowRight": 
  if(lastInput.y != 0)break
    inputDirection =  {x:0 , y:1};
    lastInput = inputDirection ;
    break;
  case"ArrowLeft":
  if(lastInput.y != 0)break
    inputDirection =  {x:0 , y:-1};
    lastInput = inputDirection ;
    break;
    
 }

})

let snakeBody = [
   {x:10 , y:11},
   {x:10 , y:12},
   {x:10 , y:13}
   ];

  function update_snake(){
   for(let i = snakeBody.length - 2 ; i >= 0 ; i--){
      snakeBody[i + 1] = {...snakeBody[i]};
      }
    
        snakeBody[0].x += inputDirection.x ;
        snakeBody[0].y += inputDirection.y ;
  
  }


 function draw_snake(){
  gameBoard.innerHTML = '' ;
   snakeBody.forEach(part => {
    const newBody = document.createElement('div');
    newBody.style.gridRowStart = part.x ;
    newBody.style.gridColumnStart = part.y ;
    newBody.classList.add("snake");
    gameBoard.appendChild(newBody);


   });
  
}

var food = {x:10 , y:10};

function getRandomPosition(element){
  element.x = Math.floor(Math.random() * 21) + 1 ;
  element.y = Math.floor(Math.random() * 21) + 1 ;
}
getRandomPosition(food) ;


function update_food(){
 
  if(onSnake(food)){
    score++ ;
    score_element.textContent = "score : " + score ;
    getRandomPosition(food) ;
    expansion(expansion_rate);
 
  }
   
}


function onSnake(position){
  return snakeBody.some(part =>  part.x === position.x && part.y === position.y)
  
}
 
function expansion(rate){
  for(let i = 1 ; i <= rate ; i++){
   
    snakeBody.push({...snakeBody[snakeBody.length -1]});
  }
}



function draw_food(){
  const newFood = document.createElement('div');
  newFood.style.gridRowStart = food.x ;
  newFood.style.gridColumnStart = food.y ;
  newFood.classList.add("food");
  gameBoard.appendChild(newFood);
}

function check_game(snake){


  // 
  if(inputDirection.x === 0 && inputDirection.y === 0){
     return game_over  ;
  }

  // checking if the snake ran into self
  for(let i = 1 ; i < snake.length ; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
     game_over = true ;
     break;
 
    }
    
    // limiting the snake from going outside the grid area
    if(snake[0].x > 21 || snake[0].x < 1 || snake[0].y > 21 || snake[0].y < 1){
     game_over = true ;
   }

   else {
     game_over = false ;
   }
  
  
}
}
  





