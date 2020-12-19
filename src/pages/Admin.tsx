import React from 'react';
import { Card, } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper content=" 抱歉您暂时无权限查看此内容">
    <Card>
    </Card>
  </PageHeaderWrapper>
);
