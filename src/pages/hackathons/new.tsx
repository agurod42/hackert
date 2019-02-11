import { Card, Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { create } from '@/app/hackathon/hackathon.actions';
import HackathonForm from '@/components/hachathon/form';

const mapStateToProps = ({ hackathonReducer }) => ({ 
  loading: hackathonReducer.loading,
  success: hackathonReducer.success,
});

@connect(mapStateToProps, { create })
export default class extends React.Component<any, any> {
  
  render() {
    return (
      <Card>
        <Row>
          <Col><h2>Post a new hackathon</h2></Col>
          <Col>
            <HackathonForm loading={this.props.loading} success={this.props.success} onSubmit={(v) => this.props.create(v)} />
          </Col>
        </Row>
      </Card>
    );
  }

}
