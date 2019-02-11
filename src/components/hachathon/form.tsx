import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import React from 'react';

interface IHackathonFormProps extends FormComponentProps {
    onSubmit: (values) => any;
}

export default Form.create()(class extends React.Component<IHackathonFormProps> {

    private formRules = {
        symbol: [{ required: true }],
        title: [{ required: true }],
        description: [{ required: true }],
        prize: [{ required: true }],
        endDate: [{ required: true }]
    };

    render() {
        const colProps = { labelCol: { md: { span: 4 }, xl: { span: 2 } }, wrapperCol: { md: { span: 20 }, xl: { span: 22 } } };
        return (
            <Form>
                <Form.Item label='Symbol' {...colProps}>
                    {this.renderField('symbol', null,
                        <Input placeholder='GBH' />
                    )}
                </Form.Item>
                <Form.Item label='Title' {...colProps}>
                    {this.renderField('title', null,
                        <Input placeholder='Global Blockchain Hackathon for Clean Water' />
                    )}
                </Form.Item>
                <Form.Item label='Description' {...colProps}>
                    {this.renderField('description', '',
                        <Input placeholder={'We challenge participants to create innovative applications using Blockchain, AI & IoT technologies to help solve the world\'s growing water challenges.'} />
                    )}
                </Form.Item>
                <Form.Item label='Prize' {...colProps}>
                    {this.renderField('prize', 1000,
                        <InputNumber min={0} placeholder={'1000'} formatter={(value) => `$ ${value}`} />
                    )}
                </Form.Item>
                <Form.Item label='End Date' {...colProps}>
                    {this.renderField('endDate', moment().add(7, 'days'),
                        <DatePicker disabledDate={(endDate) => endDate.valueOf() < moment().valueOf()} />
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ md: { offset: 4 }, xl: { offset: 2 } }}>
                    <Button type='primary' onClick={() => this.onFormSubmit()}>Post</Button>
                </Form.Item>
            </Form>
        );
    }

    renderField(key, value, children) {
        // @ts-ignore
        return this.props.form.getFieldDecorator(key, { initialValue: value, rules: this.formRules[key] })(children);
    }

    onFormSubmit() {
        this.props.form.validateFields(async (err) => {
            if (err) return;

            if (this.props.onSubmit) {
                this.props.onSubmit(this.props.form.getFieldsValue());
            }
        });
    }

});