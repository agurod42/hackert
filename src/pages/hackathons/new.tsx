import { message, Card, Col, Row } from 'antd';
import React from 'react';
import HackathonForm from '@/components/hachathon/form';
import HackathonService from '@/services/hackathon';

export default class extends React.Component {

  private hackathonService: HackathonService;

  constructor(props) {
    super(props);
    this.hackathonService = new HackathonService();
  }
  
  render() {
    return (
      <Card>
        <Row>
          <Col><h2>Post a new hackathon</h2></Col>
          <Col>
            <HackathonForm onSubmit={(hackathon) => this.onFormSubmit(hackathon)} />
          </Col>
        </Row>
      </Card>
    );
  }

  async onFormSubmit(hackathon) {
    try {
      await this.hackathonService.create(hackathon);
    }
    catch (err) {
      message.destroy();
      message.error((err.message || err).toString());
    }
  }

}
