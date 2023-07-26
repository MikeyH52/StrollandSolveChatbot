  const messageTypesToDiscard = ['typing', 'session_reference']

  if (messageTypesToDiscard.includes(event.type)) {
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    return
  }

  bp.logger.info(`EVENT: ${event.type}`)

  if (event.type === 'session_reset') {
    // need to reset the progress of the user's game
    event.state.user.questionIndex = undefined

    // then skip dialog engine
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    return
  }

  if (event.type === 'proactive-trigger') {
    bp.logger.info('************* PROACTIVE TRIGGER ******************')
    bp.logger.info('event.state.session.lastMessages.length:', event.state.session.lastMessages.length)

    // We only want to trigger a proactive message when the session is new,
    // otherwise the conversation will progress every time the page is refreshed.
    if (event.state.session.lastMessages.length > 0) {
      // This will tell the dialog engine to skip the processing of this event.
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    }

    return
    // do stuff
  }

  if (event.type === 'verify') {
    bp.logger.info('VERIFICATION')
    bp.logger.info('Verifying...')
    bp.logger.info(event.payload.payload.payload.text)

    event.state.session.transactionId = event.payload.payload.payload.text
  }