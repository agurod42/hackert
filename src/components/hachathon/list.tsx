import { Avatar, Col, Icon, List, Row, Skeleton, Button } from 'antd';
import React from 'react';

interface IHackathonListProps {
    loading?: boolean;
}

export default class HackathonList extends React.Component<IHackathonListProps> {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        return (
            <List
                dataSource={[
                    { id: 1, title: 'Global Blockchain Hackathon for Clean Water', description: 'We challenge participants to create innovative applications using Blockchain, AI & IoT technologies to help solve the world\'s growing water challenges.' }
                ]}
                itemLayout='horizontal'
                loading={false}
                renderItem={this.renderItem}
            />
        );
    }
    
    renderItem(item) {
        return (
            <List.Item actions={[<Button type='primary'>Submit</Button>]}>
                <Skeleton active avatar loading={this.props.loading}>
                    <List.Item.Meta
                        avatar={<Avatar shape='square' size={100} src='https://picsum.photos/200' />}
                        description={item.description}
                        title={<a href={`/hachathon/${item.id}`}>{item.title}</a>}
                    />
                    <Row type='flex' style={{ flexDirection: 'column', height: 100, justifyContent: 'center' }}>
                        <Col>
                            <Icon type='star' theme='filled' /> $10.000 in prizes
                        </Col>
                        <Col>
                            <Icon type='clock-circle' theme='filled' /> 7 days to submit
                        </Col>
                    </Row>
                </Skeleton>
            </List.Item>
        );
    }

}