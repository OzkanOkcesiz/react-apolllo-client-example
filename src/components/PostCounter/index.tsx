import { useSubscription } from "@apollo/client"
import { Avatar, Badge } from "antd"
import { POST_COUNT_SUBSCRIPTION } from "../../pages/Home/queries"
import styles from "./styles.module.css"

const PostCounter = () => {

    const { loading, data } = useSubscription(POST_COUNT_SUBSCRIPTION);    

    return (
        <div className={styles.container} >
            <Badge count={loading ? "?" : data.postCount} size="small">
                <Avatar shape="square" size="default" >
                    <span className={styles.counterTitle} > Posts</span>
                </Avatar>
            </Badge>
        </div>
    )
}

export default PostCounter
