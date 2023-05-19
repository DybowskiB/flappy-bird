const birdElem = document.querySelector("[data-bird]")
const BIRD_SPEED = 0.3
const JUMP_DURATION = 150
let timeSinceLastJump = Number.POSITIVE_INFINITY


export function setupBird() {
  setTop(window.innerHeight / 2)
}

export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta)
  } else {
    setTop(getTop() + BIRD_SPEED * delta)
  }

  timeSinceLastJump += delta
  updatePhoto()
}

let timeUnit = 0
const bird1 = document.querySelector("[bird-photo-1]")
const bird2 = document.querySelector("[bird-photo-2]")
const bird3 = document.querySelector("[bird-photo-3]")
const bird4 = document.querySelector("[bird-photo-4]")
const bird5 = document.querySelector("[bird-photo-5]")
const bird6 = document.querySelector("[bird-photo-6]")
const bird7 = document.querySelector("[bird-photo-7]")
const bird8 = document.querySelector("[bird-photo-8]")
const birds = [bird1, bird2, bird3, bird4, bird5, bird6, bird7, bird8]
function updatePhoto() {
  let index = parseInt(timeUnit / 10, 10)
  birds[index].classList.remove("hide")
  for(let i = 0; i < 8; ++i){
    if(index != i){
      birds[i].classList.add("hide")
    }
  }
  timeUnit = ++timeUnit % 80;
}

export function getBirdRect() {
  return birdElem.getBoundingClientRect()
}

function setTop(top) {
  birdElem.style.setProperty("--bird-top", top)
}

function getTop() {
  return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

export function handleJump(e) {
  timeSinceLastJump = 0
}
