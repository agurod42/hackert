import { message, Card, Col, Row, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import HachathonList from '@/components/hachathon/list';
import HackathonSearchForm from '@/components/hachathon/searchForm';
import HackathonService from '@/services/hackathon';

export default class extends React.Component<any, any> {
  
  private hackathonService: HackathonService;

  constructor(props) {
    super(props);
    this.hackathonService = new HackathonService();
    this.state = {
      hackathons: [],
      loading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      this.setState({ loading: false, hackathons: await this.hackathonService.list() });
    }
    catch (err) {
      message.destroy();
      message.error((err.message || err).toString());
    }
  }
  
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

  async onSetWinnerModalOk(hackathon, winnerAddress) {
    try {
      message.loading('The winner is beign set. Please be patient, this may take a while.', 0);
      await this.hackathonService.assignWinner(hackathon, winnerAddress);
      message.destroy();
      message.success('The winner was set created successfully');
    }
    catch (err) {
      message.destroy();
      message.error((err.message || err).toString());
    }
  }

}
