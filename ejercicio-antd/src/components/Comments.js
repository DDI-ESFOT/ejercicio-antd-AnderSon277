import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React from 'react'


const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comentarios' : 'comentario'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Añadir Comentario
        </Button>
        </Form.Item>
    </>
);

class Comments extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
        return;
        }

        this.setState({
        submitting: true,
        });

        setTimeout(() => {
        this.setState({
            submitting: false,
            value: '',
            comments: [
            ...this.state.comments,
            {
                author: 'Usuario Random',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.state.value}</p>,
                datetime: moment().fromNow(),
            },
            ],
        });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
        value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
        <>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
            avatar={
                <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
                />
            }
            content={
                <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
                />
            }
            />
        </>
        );
    }
}

export default Comments;