import React, { useState, FormEvent } from 'react'

const Clue = (props: any) => {
  const { currentClue = {}, updateAnswerArr } = props
  const [answer, setAnswer] = useState('')
  const clue = currentClue.id ? currentClue : JSON.parse(localStorage.getItem('currentClue') || '')
  console.log({clue})
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
      return
    }
    console.log('not correct...')
    return
  }

  return (
    <div style={{height: '100%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/* {
        JSON.stringify(clue, null, 2)
      } */}
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
          <button style={{ color: 'white', border: 'none', background: 'linear-gradient(#87ceeb,#3232ff)', borderRadius: '1.25em', padding: 15, boxShadow: '3px 10px 13px 3px #000058', fontSize: '22px', textTransform: 'uppercase', fontWeight: 'bold', textShadow: '1px 1px 1px black'}} type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Clue
