  session.botId = 'example'

  const goToError = async () => {

    return new Promise(async res => {
      bp.logger.info(`Jump to error!`)

      session.valid = false
      const sessionId = bp.dialog.createId(event)
      await bp.dialog.jumpTo(sessionId, event, 'Main', 'invalidCode')
      // await bp.dialog.processEvent(sessionId, event)
      res();
    })

    
  }

  /**
   * Verify the ID against a valid transaction
   * @title Verify the bot session ID
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const checkIdValid = async () => {
    bp.logger.info('INSIDE INIT')
    bp.logger.info(session.transactionId)

    // await setTimeout(async () => {
    bp.logger.info(`Compare ${session.transactionId} to 1234`)

    if (!session.transactionId || session.transactionId === null) {
      await goToError()
      return
    }

    if (session.transactionId.toString() === '1234') session.valid = true
    else await goToError()
    // }, 2000)
  }

  return checkIdValid()