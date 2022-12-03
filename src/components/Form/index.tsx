import { createRef, Key, ReactNode } from 'react';
import { Button, Form, FormInstance, Input, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS, NEW_POST_MUTATION } from '../../pages/NewPost/queries';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const NewPostForm = () => {
    const navigate = useNavigate()

    const [savePost, {loading, error, data}] = useMutation(NEW_POST_MUTATION);

    const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

    const formRef = createRef<FormInstance>();

    const handleSubmit = async(values: any) => {
        console.log("handle" );
        console.log(values);
        
        try {
            await savePost({
                variables: {
                    data: values
                }
            });
            message.success("Post saved!");
            navigate("/")
        } catch {
            message.error("Post not saved!")
        }

    }

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            ref={formRef}
        >
            <Form.Item
                name="title"
                rules={[{ required: true, message: 'Please input your title!' }]}
            >
                <Input placeholder='Title' />
            </Form.Item>

            <Form.Item name="short_description">
                <Input placeholder='Short Description' />
            </Form.Item>

            <Form.Item name="description">
                <Input.TextArea placeholder='Description' />
            </Form.Item>

            <Form.Item name="cover">
                <Input placeholder='Cover' />
            </Form.Item>

            <Form.Item name="user_id" rules={[{ required: true, message: 'Please select user!'}]}>
                <Select
                    loading={get_users_loading}
                    disabled={get_users_loading}
                    placeholder="Select a user"
                    allowClear
                >
                    {
                        users_data && users_data.users.map((item: {
                            fullName: ReactNode; id: Key | null | undefined;
                        }) => <Option key={item.id} value={item.id}> {item.fullName} </Option>)
                    }

                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewPostForm
