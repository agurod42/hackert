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
      message.loading('The hackathon is beign created. Please be patient, this may take a while.', 0);
      await this.hackathonService.create(hackathon);
      message.destroy();
      message.success('The hackathon was created successfully');
    }
    catch (err) {
      message.destroy();
      message.error((err.message || err).toString());
    }
  }

}
