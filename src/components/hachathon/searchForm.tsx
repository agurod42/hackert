import { Form, Icon, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

export default Form.create()(class HackathonSearchForm extends React.Component<FormComponentProps> {

    private formRules = {};

    render() {
        return (
            <Form layout='inline'>
                <Form.Item wrapperCol={{ md: { span: 24 } }}>
                    {this.renderField('search', '',
                        <Input suffix={<Icon type='search' />} placeholder='Search by title, keyword or location' />
                    )}
                </Form.Item>
                <Form.Item label='Type'>
                    {this.renderField('type', 'online',
                        <Select style={{ width: 190 }}>
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='in-person'>In-person</Select.Option>
                            <Select.Option value='online'>Online</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='Sort by'>
                    {this.renderField('sortBy', 'recently-added',
                        <Select style={{ width: 190 }}>
                            <Select.Option value='prize-amount'>Prize Amount</Select.Option>
                            <Select.Option value='submission-deadline'>Submission Deadline</Select.Option>
                            <Select.Option value='recently-added'>Recently Added</Select.Option>
                        </Select>
                    )}
                </Form.Item>
            </Form>
        );
    }

    renderField(key, value, children) {
        // @ts-ignore
        return this.props.form.getFieldDecorator(key, { initialValue: value, rules: this.formRules[key] })(children);
    }

});