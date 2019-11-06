import React from 'react'

const CategoryRowItem = (props: any) => {
  const { title } = props
  return(
    <div 
      style={{border: '1px solid black', display: 'flex', flexGrow: 1, flexBasis: 1, justifyContent: 'center'}
    }>
      {title}
    </div>
  )
}

const ClueItem = (props: any) => {
  console.log('CluesItem', {props})
  const {
    id,
    value,
    category_id,
    setCardId,
    history
  } = props
  return (
    <div style={{border: '1px solid black', color: '#EFBE66'}} onClick={() => setCardId(id, history)}>${value}</div>
  )
}

const Board = (props: any) => {
  console.log({props})
  const {
    categories,
    setCardId,
    history
  } = props
  return (
    <div style={{ border: '1px solid black', display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      {
        categories.map( (category: any, index: number) => {
          return <div style={{color: 'white', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', flexGrow: 1, flexBasis: 1}}>
            <CategoryRowItem {...category} />
            {
              category.clues.map( (clue: object, index: number) => {
                if (index < 5) {
                  return <ClueItem history={history} setCardId={setCardId} {...clue} />
                }
                return null
              })
            }
          </div>
        })
      }
      </div>
    </div>
  )
}

export default Board
