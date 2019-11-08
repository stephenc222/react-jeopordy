import React from 'react'
import { isMobileCheck } from '../utils/isMobileCheck'

const isMobile = isMobileCheck()

const Control = (props: any) => {
  const {
    children,
    numClues,
    numCategories,
    setNumClues,
    setNumCategories,
  } = props
  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column': 'row', width: '100%', justifyContent: 'space-between'}}> 
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', color: 'white', textAlign: 'left'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div> Clues:&nbsp;</div>
          <div> Categories:&nbsp;</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div><input style={{maxWidth: '4em', borderRadius: '0.5em', fontSize: 16}} type={isMobile ? 'tel': 'number'} value={numClues} onChange={event => setNumClues(parseInt(event.target.value) || 0)}/></div>
          <div><input style={{maxWidth: '4em', borderRadius: '0.5em', fontSize: 16}} type={isMobile ? 'tel': 'number'} value={numCategories} onChange={event => setNumCategories(parseInt(event.target.value) || 0)}/></div>
        </div>
      </div>
      {isMobile && children || null}
    </div>
      {!isMobile && children || null}
    </div>
  )
}

export default Control
