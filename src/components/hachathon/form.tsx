import { message, Button, DatePicker, Form, Input, InputNumber } from 'antd';
import moment from 'moment';
import React from 'react';
import { reduxForm, Field } from 'redux-form';

@reduxForm({ form: 'manager' })
export default class extends React.Component<any, any> {

    componentDidUpdate() {
        this.renderMessageIfLoading();
    }

    render() {
        const colProps = { labelCol: { md: { span: 4 }, xl: { span: 2 } }, wrapperCol: { md: { span: 20 }, xl: { span: 22 } } };
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Form.Item label='Symbol' {...colProps}>
                    <Field name='symbol' component={this.renderSymbolField} />
                </Form.Item>
                <Form.Item label='Title' {...colProps}>
                    <Field name='title' component={this.renderTitleField} />
                </Form.Item>
                <Form.Item label='Description' {...colProps}>
                    <Field name='description' component={this.renderDescriptionField} />
                </Form.Item>
                <Form.Item label='Prize' {...colProps}>
                    <Field name='prize' component={this.renderPrizeField} />
                </Form.Item>
                <Form.Item label='End Date' {...colProps}>
                    <Field name='endDate' component={this.renderEndDateField} />
                </Form.Item>
                <Form.Item wrapperCol={{ md: { offset: 4 }, xl: { offset: 2 } }}>
                    <Button type='primary' htmlType='submit' loading={this.props.loading}>Post</Button>
                </Form.Item>
            </form>
        );
    }

    renderMessageIfLoading() {
        if (this.props.loading) {
            message.loading('The hackathon is being created. Please be patient, this may take a while.', 0);
        }
        else {
            if (message) message.destroy();
        }
    }

    renderSymbolField(props) {
        return (
            <Input autoFocus placeholder='GBH' {...props.input} />
        );
    }

    renderTitleField(props) {
        return (
            <Input placeholder='Global Blockchain Hackathon for Clean Water' {...props.input} />
        );
    }

    renderDescriptionField(props) {
        return (
            <Input placeholder={`We challenge participants to create innovative applications using Blockchain, AI & IoT technologies to help solve the world\'s growing water challenges.`} {...props.input} />
        );
    }

    renderPrizeField(props) {
        return (
            <InputNumber min={0} placeholder={'1000'} formatter={(value) => `$ ${value}`} value={(props.input.value || '').toString().replace('$ ', '')} onChange={(v) => props.input.onChange(v)} />
        );
    }

    renderEndDateField(props) {
        return (
            <DatePicker disabledDate={(endDate) => endDate.valueOf() < moment().valueOf()} value={moment(props.input.value || new Date())} onChange={(v) => props.input.onChange(v)} />
        );
    }

};