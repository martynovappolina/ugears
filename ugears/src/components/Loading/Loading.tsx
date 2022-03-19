import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return (
      <Spin style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }} indicator={antIcon}/>
    );
}

export default React.memo(Loading)
