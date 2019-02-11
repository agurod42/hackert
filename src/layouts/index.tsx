import { Layout, Menu } from 'antd';
import React from 'react';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <Layout>
      <Layout.Header style={{ display: 'flex' }}>
        <h1 id='brand'>&lt;hackert/&gt;</h1>
        <Menu theme='dark' mode='horizontal' style={{ flex: '1 1 auto', lineHeight: '64px' }}>
          <Menu.Item key='1'>Hackathons</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        { props.children }
      </Layout.Content>
    </Layout>
  );
};

export default BasicLayout;
