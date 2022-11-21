import { useLazyQuery } from '@apollo/client';
import { Button, Divider, Comment, List } from 'antd'
import { useState, useEffect } from 'react';
import { COMMENTS_SUBSCRIPTIONS, GET_POST_COMMENTS } from '../../pages/Post/queries';
import styles from "./styles.module.css"

const Comments = ({ postId }: any) => {
    const [showButton, setShowButton] = useState(false)
    const [loadComments, { called, loading, data, subscribeToMore }] = useLazyQuery(
        GET_POST_COMMENTS,
        { variables: { id: postId } }
    );
    
    useEffect(() => {

        if(!loading && called) {
            subscribeToMore({
                document: COMMENTS_SUBSCRIPTIONS,
                updateQuery: (prev, { subscriptionData}) => {
                    if(!subscriptionData.data) return prev;

                    const newCommentItem = subscriptionData.data.commentCreated;

                    console.log(
{                        post : {
                            ...prev.post,
                            coments: [...prev.post.comments, newCommentItem]
                        }}
                    );
                    

                    return {
                        post : {
                            ...prev.post,
                            coments: [...prev.post.comments, newCommentItem]
                        }
                    }
                }
            })
        }

    }, [loading, called, subscribeToMore])

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
