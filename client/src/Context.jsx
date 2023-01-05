import React,{createContext} from 'react'
export let context = createContext()

function Context(props) {
  return (
    <context.Provider>{props.children}</context.Provider>
  )
}

export default Context