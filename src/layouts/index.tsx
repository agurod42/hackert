import { Layout, Menu } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import appStore from '@/app/app.store';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <Provider store={appStore}>
      <Layout>
        <Layout.Header style={{ display: 'flex' }}>
          <h1 id='brand'>&lt;hackert/&gt;</h1>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[props.location.pathname]} style={{ flex: '1 1 auto', lineHeight: '64px' }}>
            <Menu.Item key='/hackathons'><Link to='/hackathons'>Hackathons</Link></Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content>
          { props.children }
        </Layout.Content>
      </Layout>
    </Provider>
  );
};

export default BasicLayout;
