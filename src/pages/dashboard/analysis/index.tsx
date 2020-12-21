// Analyasis
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { test } from './service'
import { Table, Tag, Space } from 'antd';
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
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: '邮箱',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '角色',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',

    },

  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  /** 
   * render
   */
  return (
    <>

      <Table columns={columns} bordered dataSource={data} />
    </>
  )
}

export default Analyasis