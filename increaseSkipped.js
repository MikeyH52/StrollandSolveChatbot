  /**
   * Increase the skipped question count
   * @title Add 1 to the skipped questions count for stats purposes
   * @category Custom
   * @author Your_Name
   */
  const myAction = async () => {
    session.questionsSkipped = session.questionsSkipped + 1
  }

  return myAction()