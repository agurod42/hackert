import { Avatar, Col, Icon, List, Modal, Row, Skeleton, Button, Input } from 'antd';
import React from 'react';

interface IHackathonListProps {
    dataSource: [any];
    loading?: boolean;
    onSetWinnerModalOk: (...args) => void;
}

export default class HackathonList extends React.Component<IHackathonListProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        return (
            <List
                dataSource={this.props.dataSource}
                itemLayout='horizontal'
                loading={this.props.loading}
                renderItem={this.renderItem}
            />
        );
    }
    
    renderItem(item) {
        let actions = [<Button type='primary'>Submit</Button>];

        if (item.owned) {
            actions.push(<Button type='danger' onClick={() => this.setState({ modal: item.id })}>Set winner</Button>);
        }

        return (
            <List.Item actions={actions}>
                <Skeleton active avatar loading={this.props.loading}>
                    <List.Item.Meta
                        avatar={<Avatar shape='square' size={100} src='https://picsum.photos/200' />}
                        description={<span><sup>(@{item.contract})</sup><br />{item.description}</span>}
                        title={<a href={`/hachathon/${item.id}`}>{item.title}</a>}
                        
                    />
                    <Row type='flex' style={{ flexDirection: 'column', height: 100, justifyContent: 'center' }}>
                        <Col>
                            <Icon type='star' theme='filled' />{` $${item.prize} in prize`}
                        </Col>
                        <Col>
                            <Icon type='clock-circle' theme='filled' />{this.renderDaysLeftToSubmit(item)}
                        </Col>
                    </Row>
                    <Modal
                        title={`Winner of ${item.title} is: `}
                        visible={this.state.modal === item.id}
                        onOk={async () => await this.onSetWinnerModalOk(item)}
                        onCancel={() => this.setState({ modal: false })}>
                            <Input autoFocus placeholder='0x92ad7698Ac1FC0c1103eC5E38f0c88b75517Aa9f' onChange={(e) => this.setState({ modalInput: e.target.value })} />
                    </Modal>
                </Skeleton>
            </List.Item>
        );
    }

    renderDaysLeftToSubmit(item) {
        const today = new Date();
        const endDate = new Date(item.endDate);
        const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000*60*60*24));
        return ` ${daysLeft} days to submit`;
    }

    async onSetWinnerModalOk(item) {
        if (this.props.onSetWinnerModalOk) {
            await this.props.onSetWinnerModalOk(item, this.state.modalInput);
        }

        this.setState({ modal: false });
    }

}