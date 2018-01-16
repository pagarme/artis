const isDesktop = window.innerWidth > 640

const joinRules = ['onDesktop']

const shouldJoin = rule =>
  joinRules.includes(rule) && isDesktop

const initialAcc = {
  pagesToJoin: [],
  normalPages: [],
}

const preRender = pages =>
  pages.reduce((acc, page) => {
    const { joinRule, component } = page

    return shouldJoin(joinRule) ?
      {
        pagesToJoin: acc.pagesToJoin.concat(component),
        normalPages: acc.normalPages,
      } : {
        pagesToJoin: acc.pagesToJoin,
        normalPages: acc.normalPages.concat(component),
      }
  }, initialAcc)

export default preRender
