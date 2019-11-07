import React, { useState, FormEvent } from 'react'
import Button from './Button'
import { isMobileCheck } from '../utils/isMobileCheck'

const isMobile = isMobileCheck()
const Clue = (props: any) => {
  const { currentClue = {}, setSelectedAnswerArr, history, dailyDoubleIndex } = props
  const clue = currentClue.id ? currentClue : JSON.parse(localStorage.getItem('currentClue') || '')
  const [answer, setAnswer] = useState('')
  const [showQuestion, onShowQuestionChange] = useState(true)
  const [showDailyDouble, onShowDailyDoubleChange] = useState(clue.id === dailyDoubleIndex)
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
    } else {
      console.log('not correct...')
    }
    setSelectedAnswerArr(clue.id)
    history.push('')
    return
  }
  if (showDailyDouble) {
    return (
      <div onClick={() => onShowDailyDoubleChange(false)} style={{height: '100%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div>Daily Double</div>
      </div>
    )
  }

  return (
    <div style={{height: '100%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: window.innerHeight - (isMobile ? 100 : 150), padding: 10}}>
        <Button onClick={() => onShowQuestionChange(!showQuestion)} label={`Show ${showQuestion ? 'Clue' : 'Question'}`}/>
      </div>
      {
        showQuestion
        ? <div>{question}</div>
        :<form onSubmit={(event) => checkAnswer(event, answer)}>
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
      }
    </div>
  )
}

export default Clue
