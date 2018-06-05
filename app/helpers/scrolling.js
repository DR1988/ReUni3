const getRelativeCoords = (elem, elem2) =>
  elem.getBoundingClientRect().left - elem2.getBoundingClientRect().left

// const stopdrag = (e) => {
//   e.persist()
//   e.ondragstart = () => false
// }

export const setCoord = (e, coord, container) => {
  const containerrWidth = container.clientWidth
  const sliderB = e
  const contentWidth = container.children[0].clientWidth
  const selfContainer = container
  // console.log('this.sliderW', this.sliderW)
  let pos
  if (e) {
    pos = sliderB.getBoundingClientRect().left - container.getBoundingClientRect().left
  }
  // console.log(coord)
  // console.log('pos', pos)
  let scrollPercent
  if (coord) {
    scrollPercent = (coord / containerrWidth) * 100
  } else {
    scrollPercent = (pos / containerrWidth) * 100
  }
  const scrollPx = (scrollPercent / 100) * contentWidth
  // console.log('scrollPx', scrollPx)
  selfContainer.scrollLeft = scrollPx
  if (e) {
    const event = e
    event.style.left = `${coord}px`
  }// console.log(' container.scrollLeft', container.scrollLeft)
}

export default (e) => { // u have to use callback function getRelativeCoords instead of call it inside the method
  e.persist()
  const container = e.target.parentElement.parentElement
  // console.log(container)
  const thumbCoords = getRelativeCoords(e.target, container)
  let shiftX
  if (e.touches) {
    shiftX = e.touches[0].pageX - thumbCoords
  } else {
    shiftX = e.pageX - thumbCoords
  }
  // console.log(shiftX)
  // console.log(e.target.parentElement)
  const sliderBar = e.target.parentElement
  // const sliderCoords = getCoords(document.querySelector('.slider-bar'))
  const sliderCoords = getRelativeCoords(sliderBar, container)

  document.onmousemove = (evt) => {
    let newLeft = evt.pageX - shiftX - sliderCoords
    if (newLeft < 0) {
      newLeft = 0
    }
    // console.log(e.target.offsetWidth.offsetWidth)
    const rightEdge = sliderBar.offsetWidth - e.target.offsetWidth
    if (newLeft > rightEdge) {
      newLeft = rightEdge
    }
    // console.log(newLeft)
    setCoord(e.target, newLeft, container)
    // e.target.style.left = newLeft + 'px'
  }

  document.ontouchmove = (evt) => {
    let newLeft = evt.touches[0].pageX - shiftX - sliderCoords
    if (newLeft < 0) {
      newLeft = 0
    }
    // console.log(e.target.offsetWidth.offsetWidth)
    const rightEdge = sliderBar.offsetWidth - e.target.offsetWidth
    if (newLeft > rightEdge) {
      newLeft = rightEdge
    }
    // console.log(newLeft)
    setCoord(e.target, newLeft, container)
  }

  document.onmouseup = () => {
    document.onmousemove = document.onmouseup = null
  }
  document.ontouchend = () => {
    document.ontouchmove = document.ontouchend = null
  }
  return false
}
