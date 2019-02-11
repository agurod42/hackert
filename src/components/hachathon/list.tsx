import { Avatar, Button, Col, Icon, List, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { list } from '@/app/hackathon/hackathon.actions';

const mapStateToProps = ({ hackathonReducer }) => ({ 
    loading: hackathonReducer.loading,
    hackathons: hackathonReducer.hackathons
});

@connect(mapStateToProps, { list })
export default class HackathonList extends React.Component<any, any> {

    componentDidMount() {
        this.props.list();
    }

    render() {
        return (
            <List
                dataSource={this.props.hackathons}
                itemLayout='horizontal'
                loading={this.props.loading}
                renderItem={(item) => this.renderItem(item)}
            />
        );
    }
    
    renderItem(item) {
        let actions = [<Button type='primary'>Submit</Button>];

        if (item.owned) {
            actions.push(<Button type='danger' onClick={() => {}}>Set winner</Button>);
        }

        return (
            <List.Item actions={actions}>
                <List.Item.Meta
                    avatar={<Avatar shape='square' size={100} src='https://picsum.photos/200' />}
                    description={<span><sup>(@{item.contract})</sup><br />{item.description}</span>}
                    title={<a href={`/hachathon/${item.id}`}>{item.title}</a>}
                    
                />
                <Row type='flex' style={{ flexDirection: 'column', height: 100, justifyContent: 'center' }}>
                    <Col><Icon type='star' theme='filled' />{` $${item.prize} in prize`}</Col>
                    <Col><Icon type='clock-circle' theme='filled' />{this.renderDaysLeftToSubmit(item)}</Col>
                </Row>
            </List.Item>
        );
    }

    renderDaysLeftToSubmit(item) {
        const today = new Date();
        const endDate = new Date(item.endDate);
        const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000*60*60*24));
        return ` ${daysLeft} days to submit`;
    }

}