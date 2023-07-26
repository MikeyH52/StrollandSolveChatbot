  /**
   * Load the question into session.currentQuestion variable
   * @title Load the current question
   * @category Custom
   * @author Your_Name
   */
  const myAction = async () => {
    if (!user.questionIndex || user.questionIndex < 0) user.questionIndex = 1

    // load the question
    session.currentQuestion = session.questions[user.questionIndex]

    if (session.currentQuestion && session.currentQuestion.leadingImage) {
      let image = await bp.cms.listContentElements(session.botId, 'builtin_image', {
        searchTerm: session.currentQuestion.leadingImage,
        from: 0,
        count: 1
      })

      if (image && image.length > 0) {
        // only returning 1 result so get first item in list
        let foundImage = image[0]

        // strip out the path to the file only
        let imageFilePath = foundImage.previews.en.substring(
          foundImage.previews.en.indexOf('/api'),
          foundImage.previews.en.indexOf('>)')
        )

        // set up the element to be displayed
        const element = {
          image: imageFilePath,
          typing: true //?
        }

        // create the payloads and send them
        let payloads = await bp.cms.renderElement('builtin_image', element, event)
        await bp.events.replyToEvent(event, payloads)
      }
    }
  }

  return myAction()