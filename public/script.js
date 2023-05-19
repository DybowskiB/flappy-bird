import { updateBird, setupBird, getBirdRect, handleJump } from "./bird.js"
import { updatePipes, setupPipes, getPassedPipesCount, getPipeRects } from "./pipe.js"


// Socket messages handling
const socket = io();
// Start when button is pressed   
socket.on('buttonPressed', () => {
  console.log("Button pressed client")
  handleStart();
})
// Jump when touch is pressed   
socket.on('sensorTouched', () => {
  console.log("Sensor is touched")
  handleJump();
})

const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  updateBird(delta)
  updatePipes(delta)
  if (checkLose()) return handleLose()
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function checkLose() {
  const birdRect = getBirdRect()
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
  return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function handleStart() {
  title.classList.add("hide")
  setupBird()
  setupPipes()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = `Result: ${getPassedPipesCount()}`
  }, 100)
}