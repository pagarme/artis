import renderNormalPages from './renderNormalPages'
import renderJoinedPages from './renderJoinedPages'

const render = ({ pagesToJoin, normalPages }) => {
  const pages = []

  if (pagesToJoin.length > 0) {
    pages.push(
      renderJoinedPages(pagesToJoin)
    )
  }

  pages.push(
    ...renderNormalPages(normalPages)
  )

  return pages
}

export default render
