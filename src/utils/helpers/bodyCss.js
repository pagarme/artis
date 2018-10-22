const changePosition = (position) => {
  document.body.style.position = position
}

const insertRelativePosition = () => changePosition('relative')
const insertStaticPosition = () => changePosition('static')

export {
  insertRelativePosition,
  insertStaticPosition,
}
