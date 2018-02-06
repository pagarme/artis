/* eslint-disable */

/** Custom Panel **/
const custom = ace.edit('custom');
custom.setTheme('ace/theme/monokai');
custom.session.setMode('ace/mode/javascript');
custom.getSession().setTabSize(2);
custom.setOptions({ fontSize: '11pt' });

const storagedCustomCode = window.localStorage.getItem('custom')
if (storagedCustomCode) {
  custom.setValue(storagedCustomCode)
  custom.clearSelection()
}

const btnOpenCustom = document.querySelector('#btn-open-custom')
btnOpenCustom.addEventListener('click', () => {
  const code = custom.session.getDocument().getAllLines().join('\n')
  window.localStorage.setItem('custom', code)
  eval(code)
  Checkout({ key, configs, formData, transaction, })()
})

const btnResetCustom = document.querySelector('#btn-reset-custom')
btnResetCustom.addEventListener('click', () => {
  window.localStorage.setItem('custom', '')
  location.reload()
})

/** Full Panel **/
const full = ace.edit('full');
full.setTheme('ace/theme/monokai');
full.session.setMode('ace/mode/javascript');
full.getSession().setTabSize(2);
full.setOptions({ fontSize: '11pt' });

const btnOpenFull = document.querySelector('#btn-open-full')
btnOpenFull.addEventListener('click', () => {
  const code = full.session.getDocument().getAllLines().join('\n')
  eval(code)
  Checkout({ key, configs, formData, transaction, })()
})