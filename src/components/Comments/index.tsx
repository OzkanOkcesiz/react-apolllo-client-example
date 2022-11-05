import { useLazyQuery } from '@apollo/client';
import { Button, Divider, Comment, List } from 'antd'
import { useState } from 'react';
import { GET_POST_COMMENTS } from '../../pages/Post/queries';
import styles from "./styles.module.css"

const Comments = ({ postId }: any) => {
    const [showButton, setShowButton] = useState(false)
    const [loadComments, { loading, data }] = useLazyQuery(
        GET_POST_COMMENTS,
        { variables: { id: postId } }
    );


    const handleComments = () => {
        loadComments()
        setShowButton(!showButton)
    }

    return (
        <>
            <Divider>Comments</Divider>
            <div className={styles.showCommentsBtnContainer}>
                {!showButton && <Button loading={loading} onClick={() => handleComments()}> Show Comments  </Button>}
            </div>
            {
                !loading && data && showButton && <div>
                    <List
                        className="comment-list"
                        header={`${data.post.comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={data.post.comments}
                        renderItem={(item: any) => (
                            <li>
                                <Comment
                                    author={item.user.fullName}
                                    avatar={item.user.profile_photo}
                                    content={item.text}
                                />
                            </li>
                        )}
                    />
                    <Button onClick={() => setShowButton(!showButton)} > Close </Button>
                </div>
            }
        </>
    )
}

export default Comments
