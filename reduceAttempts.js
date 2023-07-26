
  /**
   * Minus 1 from attempts
   * @title Minus 1 from attempts
   * @category Custom
   * @author Your_Name
   */
  const myAction = async () => {
    session.incorrectGuesses = session.incorrectGuesses + 1;
    session.currentQuestion.attempts = session.currentQuestion.attempts - 1;
  }

  return myAction()