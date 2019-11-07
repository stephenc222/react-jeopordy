import React, { useState } from 'react'
import './Board.css'


const MOBILE_WIDTH = 422

const isMobileCheck = () => window.innerWidth <= MOBILE_WIDTH

const CategoryName = (props: any) => {
  const { title, isMobile, onShowChildrenChange, showChildren } = props
  return(
    <div 
      onClick={isMobile && (() => onShowChildrenChange(!showChildren)) || null}
      style={{border: '1px solid black', display: 'flex', flexGrow: 1, justifyContent: 'center', flexDirection: 'row'}
    }>
      <div style={{paddingLeft: isMobile ? '1em' : '', display: 'flex', alignSelf: 'center'}}>{title}</div>
      { isMobile && (
        <div style={{display: 'flex', marginLeft: 'auto', padding: 10}}>
          {
            showChildren
            ?<div>-</div>
            :<div>+</div>
          }
          
        </div>
        )
      }
    </div>
  )
}

const ClueItem = (props: any) => {
  const {
    id,
    value,
    setCardId,
    history,
    correctAnswerArr
  } = props
  if (correctAnswerArr.includes(id)) {
    return <div style={{border: '1px solid black', color: '#EFBE66', minHeight: '25px', cursor: 'pointer' }} onClick={() => setCardId(id, history)}>&nbsp;</div>
  }
  return (
    <div style={{border: '1px solid black', color: '#EFBE66', minHeight: '25px', cursor: 'pointer' }} onClick={() => setCardId(id, history)}>${value}</div>
  )
}

const ClueContainer = (props: any) => {
  const { category, setCardId, history, correctAnswerArr } = props
  return category.clues.map( (clue: object, index: number) => {
    if (index < 5) {
      return <ClueItem key={`ci_${index}`} correctAnswerArr={correctAnswerArr}  history={history} setCardId={setCardId} {...clue} />
    }
    return null
  })
}

const CategoryRow = (props: any) => {
  const { category, index, setCardId, history, correctAnswerArr } = props
  const [showChildren, onShowChildrenChange]  = useState(false)
  // NOTE: this only runs "once", dynamic dev tool window change fails this
  const isMobile = isMobileCheck()
  return <div style={{color: 'white', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', flexGrow: 1, minHeight: 100, width: '100%'}}>
    <CategoryName isMobile={isMobile} showChildren={showChildren} onShowChildrenChange={onShowChildrenChange} {...category} />
    <div style={{display: 'flex', flexDirection: 'column' }}>
    {
      isMobile
      ? showChildren ? <ClueContainer correctAnswerArr={correctAnswerArr} category={category} setCardId={setCardId} history={history}/>: null 
      : <ClueContainer correctAnswerArr={correctAnswerArr} category={category} setCardId={setCardId} history={history}/>
    }
    </div>
  </div>
}

const Board = (props: any) => {
  const {
    categories,
    setCardId,
    history,
    correctAnswerArr
  } = props
  console.log({props})
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', overflowY: 'auto', backgroundColor: 'blue', flexGrow: 1, minHeight: 500}}>
      <div
        className='categories-container'
      >
      {
        categories.map( (category: any, index: number) => {
          return <CategoryRow correctAnswerArr={correctAnswerArr} setCardId={setCardId} category={category} history={history} index={index}/>
        })
      }
      </div>
    </div>
  )
}

export default Board
