import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useMutation } from 'react-query';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const createAccount = async ({ username, password }) => {
    await axios.post('/api/signup', { username, password });
}
export const SignupForm = (props) => {
    const createAccountAction = useMutation(createAccount, {
        onSuccess() {
            alert('created')
        }
    })
    const onClickCreateAccount = (values) => {
        const { username, password } = values;
        createAccountAction.mutate({ username, password })
    }
    return (
        <>
            <Form onFinish={(values) => onClickCreateAccount(values)} onFinishFailed={onFinishFailed}>
                <Form.Item label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}