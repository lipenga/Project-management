// Project
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { Button } from 'antd'
import ProjectDetail from './Label'

/** 
 * Preset 
 */
type ProjectLableDrawerType = {
  visible: boolean,
  id: string
}

const Project: React.FC<{}> = () => {
  /** 
   * state 
   */
  const [projectLableDrawer, setProjectLableDrawer] = useState<ProjectLableDrawerType>({
    visible: false,
    id: '',
  })

  /** 
   * method
   */


  /** 
   * effct 
   */



  /** 
   * componentsConfig 
   */



  const Dprops = {
    ...projectLableDrawer,
    onCancel: () => {
      setProjectLableDrawer((old) => {
        return {
          ...old,
          visible: false
        }
      });
    },
  };
  /** 
   * render
   */
  return (
    <>
      <h1>项目管理模块...</h1>
      <Button type='primary' onClick={() => { setProjectLableDrawer({ visible: true, id: '123' }) }}>点击我展开弹出层</Button>
      <ProjectDetail {...Dprops} />
    </>
  )
}

export default Project