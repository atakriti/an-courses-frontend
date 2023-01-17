import React from 'react'
import "./test.scss"
import data from '../data'
function Test() {
    let grammar = data.filter(item => item.type === "grammar" && item.lan === "en")
    let vocabs = data.filter(item => item.type === "vocabs" && item.lan === "en")
    let speaking = data.filter(item => item.type === "speaking" && item.lan === "en")
    let writting = data.filter(item => item.type === "writting" && item.lan === "en")
  return (
      <div className='test'>
          <h1>Grammar</h1>
          {grammar.map(item => (
              <li>
                  <h3>{item.question}</h3>
                  {item.options.map(it => it.isCorrect && <h3>{ it.answer}</h3>)}
              </li>
          ))}
          <hr />
          <h1>vocabs</h1>
          {vocabs.map(item => (
              <li>
                  <h3>{item.question}</h3>
                  {item.options.map(it => it.isCorrect && <h3>{ it.answer}</h3>)}
              </li>
          ))}
          <hr />
          <h1>speaking</h1>
          {speaking.map(item => (
              <li>
                  <h3>{item.question}</h3>
                 
              </li>
          ))}
          <hr />
          <h1>writting</h1>
          {writting.map(item => (
              <li>
                  <h3>{item.answer}</h3>
                 
              </li>
          ))}
          <hr />
    </div>
  )
}

export default Test