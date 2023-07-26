  /**
   * Small description of your action
   * @title Get Spreadsheet Questions
   * @category Custom
   * @author Your_Name
   */
  const getSpreadsheetQuestons = async () => {
    // initial value setting
    if (!user.questionIndex) user.questionIndex = 1
    session.questionIndex = 0
    session.incorrectGuesses = 0
    session.questionsSkipped = 0

    if (!session.questions || Object.keys(session.questions).length < 1) {
      session.questions = {}

      // get questions
      const axios = require('axios')

      const config = {
        method: 'get',
        url: 'https://opensheet.elk.sh/1PqloyfMp0MFjqlJ6tJePy0cJco97VzK5DF4RdR-BMBY/1',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const sheetQuestions = await axios(config)

      bp.logger.info(JSON.stringify(sheetQuestions.data))

      // add all questions/facts into object with question index as the key
      sheetQuestions.data.map((q, idx) => {
        session.questions[idx + 1] = q // setup the question object with index (+1) as key

        if (q.type === 'question') {
          session.questions[idx + 1].attempts = 3 // set the attempt count
          session.questions[idx + 1].answer = q.answer.split(',').map(v => v.trim()) // convert answer list to array
        }
      })
    }

    // total question count
    session.questionCount = Object.keys(session.questions).flatMap(q =>
      session.questions[q].type === 'question' ? [1] : []
    ).length

    session.factCount = Object.keys(session.questions).flatMap(q =>
      session.questions[q].type === 'fact' ? [1] : []
    ).length

    session.totalItemCount = Object.keys(session.questions).length
    bp.logger.info(`Total questions: ${session.questionCount}`)
    bp.logger.info(`Total facts: ${session.factCount}`)
    bp.logger.info(`Total items: ${session.totalItemCount}`)
  }

  return getSpreadsheetQuestons()