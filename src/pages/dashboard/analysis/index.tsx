// Analyasis
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { test } from './service'

/** 
 * Preset 
 */


const Analyasis: React.FC<{}> = () => {
  /** 
   * state 
   */


  /** 
   * method
   */


  /** 
   * effct 
   */
  useEffect(() => {
    // test()
    setTimeout(() => {
      test()
    }, 5000)
  }, [])

  /** 
   * componentsConfig 
   */


  /** 
   * render
   */
  return (
    <>
      <h1>欢迎来到首页....</h1>
    </>
  )
}

export default Analyasis