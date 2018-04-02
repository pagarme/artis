/* eslint-disable */

/***************
** Custom Panel **
****************/
const customPanel = ace.edit('custom-panel');
customPanel.setTheme('ace/theme/monokai');
customPanel.session.setMode('ace/mode/javascript');
customPanel.getSession().setTabSize(2);
customPanel.setOptions({ fontSize: '11pt' });

const btnOpenCustom = document.querySelector('#btn-open-custom')
btnOpenCustom.addEventListener('click', () => {
  const code = customPanel.session.getDocument().getAllLines().join('\n')
  window.localStorage.setItem('custom', code)
  eval(code)
  Checkout({ ...configs })()
})

const btnResetCustom = document.querySelector('#btn-reset-custom')
btnResetCustom.addEventListener('click', () => {
  window.localStorage.setItem('custom', '')
  location.reload()
})

/***************
** Full Panel **
****************/
const fullPanel = ace.edit('full-panel');
fullPanel.setTheme('ace/theme/monokai');
fullPanel.session.setMode('ace/mode/javascript');
fullPanel.getSession().setTabSize(2);
fullPanel.setOptions({ fontSize: '11pt' });

const btnOpenFull = document.querySelector('#btn-open-full')
btnOpenFull.addEventListener('click', () => {
  const code = fullPanel.session.getDocument().getAllLines().join('\n')
  eval(code)
  Checkout({ ...configs })()
})
