/* eslint-disable */

/***************
** Custom Panel **
****************/
const customPanel = ace.edit('custom-panel')
customPanel.setTheme('ace/theme/monokai')
customPanel.session.setMode('ace/mode/javascript')
customPanel.getSession().setTabSize(2)
customPanel.setOptions({ fontSize: '11pt' })

const $btnOpenCustom = $('#btn-open-custom')
$btnOpenCustom.click(() => {
  const code = customPanel.session.getDocument().getAllLines().join('\n')
  window.localStorage.setItem('custom', code)
  eval(code)
  Checkout({ ...configs })()
})

const $btnResetCustom = $('#btn-reset-custom')
$btnResetCustom.click(() => {
  window.localStorage.setItem('custom', '')
  location.reload()
})


/*****************
** Simple Panel **
******************/
const simplePanel = ace.edit('simple-panel')

simplePanel.setTheme('ace/theme/monokai')
simplePanel.session.setMode('ace/mode/javascript')
simplePanel.getSession().setTabSize(2)
simplePanel.session.setUseWorker(false)
simplePanel.setOptions({ fontSize: '11pt' })

$('#btn-open-simple').click(() => {
  const code = simplePanel.session.getDocument().getAllLines().join('\n')

  $('#simple-page')
    .find('.checkout-button')
    .remove()
    .end()
    .append(code)
    .fadeIn()
  
  const checkoutFormButtons = document.querySelectorAll('.checkout-button')

  CheckoutSimple(checkoutFormButtons)
})

$('#simple-btn-close').click(() => {
  $('#simple-page').fadeOut()
})


/******************
** See All Panel **
*******************/
const seeAllPanel = ace.edit('see-all-panel')

seeAllPanel.setTheme('ace/theme/monokai')
seeAllPanel.session.setMode('ace/mode/javascript')
seeAllPanel.getSession().setTabSize(2)
seeAllPanel.setOptions({ fontSize: '11pt' })


/**********************
** Add panel content **
***********************/

// custom panel
const storagedCustomParameters = window.localStorage.getItem('custom')
if (storagedCustomParameters) {
  customPanel.setValue(storagedCustomParameters)
  customPanel.clearSelection()
} else {
  customPanel.setValue(pagarmeApi)
  customPanel.clearSelection()
}

// see all
seeAllPanel.setValue(pagarmeApi)
seeAllPanel.clearSelection()

// simple panel
simplePanel.setValue(simpleParameters)
simplePanel.clearSelection()


/********************
** Company option **
*********************/
const optSetMundipagg = $('#opt-set-mundipagg')
optSetMundipagg.click(() => {
  customPanel.setValue(mundipaggApi)
  customPanel.clearSelection()
})

const optSetPagarme = $('#opt-set-pagarme')
optSetPagarme.click(() => {
  customPanel.setValue(pagarmeApi)
  customPanel.clearSelection()
})


/************
** See all **
*************/
let seeAllIsOpen = false
$('.btn-see-all').click(function() {
  let animation
  seeAllIsOpen = seeAllIsOpen ? false : true
  
  if (seeAllIsOpen) {
    $(this).text('[x] close')
    $('.box-see-all').fadeIn()
  } else {
    $(this).text('see all')
    $('.box-see-all').fadeOut()
  }
})