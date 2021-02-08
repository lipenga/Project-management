// ProjectDetail
import config from '@/utils/config'
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, Drawer, message, Popconfirm, } from 'antd'
import React, { useState, useRef, } from 'react'
import { createGrade, deleteLable, getLable } from '../../service'
import AddModal from './AddModal'

/** 
 * Preset 
 */


const ProjectDetail: React.FC<any> = (Props) => {
  /** 
   * state 
   */
  const { id, visible, onCancel } = Props
  const actionRef = useRef();
  const [size, setSize] = useState('middle');
  const [sorter, setSorter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const [visibleS, setVisibleS] = useState<boolean>(false);
  const [obj, setObj] = useState<boolean>(false);

  /** 
   * method
   */
  const onTableChange = (p, f, s) => {
    setSorter(s.field || '');
    setSortOrder(s.order || '');
  };

  const loadData = async (params) => {
    const response = await getLable(params);
    return {
      success: response.success,
      ...response.data,
    };
  };

  //  删除标注
  const { run: useDeleteLable, } = useRequest(deleteLable, {
    manual: true,
    onSuccess: (res) => {
      if (res.sucess) {
        message.success('删除成功！')
        actionRef.current?.reload()
      }
    }
  })

  //  创建标注
  const { run: useCreateGrade, } = useRequest(createGrade, {
    manual: true,
    onSuccess: (res) => {
      // if (res.success) {
      // }
      setVisibleS(false);
      actionRef.current?.reload()
    }
  })

  const confirm = (value) => {
    useDeleteLable(value._id)

  }

  const cancel = (e) => {
  }

  /** 
   * effct 
   */


  /** 
   * componentsConfig 
   */
  const columns = [
    {
      title: '标识描述',
      dataIndex: 'description',
      ellipsis: true,
      width: 200,
    },
    {
      title: '级别',
      dataIndex: 'grade',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      width: 150,
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm
          title="您确定要删除该标注？"
          onConfirm={() => { confirm(record) }}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];



  const props = {
    visibleS,
    loading: false,
    obj,
    onCancel: () => {
      setVisibleS(false);
      setObj(false);
    },
    onSubmit: (values: any) => {
      useCreateGrade(values)
      console.log('values', values);
    },
  };


  /** 
   * render
   */
  return (
    <>
      <Drawer
        visible={visible}
        title='项目标注'
        closable={false}
        onClose={onCancel}
        height="60%"
        bodyStyle={{ paddingTop: 0 }}
        placement='bottom'
      >
        <ProTable
          headerTitle={
            <>
              <Button onClick={() => { setVisibleS(true) }} type="primary" size={size}>
                <PlusOutlined />
              新增
            </Button>
            </>

          }
          columns={columns}
          actionRef={actionRef}
          request={(params) => loadData(params)}
          params={{ sorter, sortOrder }}
          size={size}
          rowKey="id"
          search={false}
          onSizeChange={(size) => setSize(size)}
          onChange={(p, f, s) => onTableChange(p, f, s)}
          pagination={config.paginationDisplay}
          scroll={{ y: 450 }}
        />
        <AddModal {...props} />
      </Drawer>
    </>
  )
}

export default ProjectDetail