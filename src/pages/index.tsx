import { Card, Col, Row } from 'antd';
import React from 'react';
import HachathonList from '@/components/hachathon/list';
import HackathonSearchForm from '@/components/hachathon/searchForm';

export default function() {
  return (
    <Row>
      <Col>
        <HackathonSearchForm />
      </Col>
      <Col style={{ marginTop: 24 }}>
        <Card>
          <HachathonList />
        </Card>
      </Col>
    </Row>
  );
}
