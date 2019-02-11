import { Card, Col, Row, Button } from 'antd';
import React from 'react';
import HachathonList from '@/components/hachathon/list';
import HackathonSearchForm from '@/components/hachathon/searchForm';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  
  render() {
    return (
      <>
        <Card>
          <Row>
            <Col md={16}><h2 style={{ marginBottom: 0 }}>Participate in online and in-person hackathons.</h2></Col>
            <Col md={8}>
              <Button type='primary' style={{ float: 'right' }}><Link to='/hackathons/new'>Post a hackathon</Link></Button>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col style={{ marginTop: 24 }}>
            <HackathonSearchForm />
          </Col>
          <Col style={{ marginTop: 24 }}>
            <Card>
              <HachathonList />
            </Card>
          </Col>
        </Row>
      </>
    );
  }

}
