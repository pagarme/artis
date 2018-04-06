const errorMessages = {
  error: {
    errorTitle: 'Ocorreu um erro ao processar seu pagamento',
    errorSubtitle: 'Tente novamente mais tarde ou entre em contato.',
  },
  unauthorized: {
    errorTitle: 'Seu pagamento foi recusado',
    errorSubtitle: 'Tente novamente mais tarde ou entre em contato com seu banco.',
  },
}

export default response => (
  (response.status === 'unauthorized') ?
    errorMessages.unauthorized :
    errorMessages.error
)
