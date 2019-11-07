import React, { useState, FormEvent } from 'react'
import Button from './Button'

const Clue = (props: any) => {
  const { currentClue = {}, setCorrectAnswerArr, history } = props
  const [answer, setAnswer] = useState('')
  const clue = currentClue.id ? currentClue : JSON.parse(localStorage.getItem('currentClue') || '')
  if (!clue.id) {
    return <div>Something went wrong and I have no clue what! Pun intended...</div>
  }
  const { question, answer: clueAnswer } = clue
  const checkAnswer = (event: FormEvent, answerAttempt: string) => {
    event.preventDefault()
    if (!answerAttempt) {
      return
    }
    if (answerAttempt.toLowerCase() === clueAnswer.toLowerCase()) {
      console.log('correct!')
      setCorrectAnswerArr(clue.id)
    } else {
      console.log('not correct...')
    }
    history.push('')
    return
  }

  return (
    <div style={{height: '100%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div>{question}</div>
      <form onSubmit={(event) => checkAnswer(event, answer)}>
        <div style={{display: 'flex', padding: '3em', flexDirection: 'column'}}>
          <div style={{ display: 'flex', paddingBottom: 20, flexDirection: 'column' }}>
            <div>
              <label>What is:&nbsp;</label>
            </div>
            <div>
              <input style={{borderRadius: '0.5em', minHeight: '1.5em',  maxHeight: '1.5em', alignSelf: 'center', fontSize: '.5em'}} type='text' onChange={(event) => setAnswer(event.target.value)} value={answer}/>
            </div>
          </div>
          <Button label='Done'/>
        </div>
      </form>
    </div>
  )
}

export default Clue
