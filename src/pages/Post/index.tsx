import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_POST } from "./queries";
import Loading from "../../components/Loading";
import styles from "./styles.module.css"

import { Image } from "antd";
import Comments from "../../components/Comments";

const Post = () => {

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id,
        }
    });

    if (loading) {
        return <Loading />
      }
    
      if (error) {
        return <div>Error:  {error.message} </div>
      }


      const {post} = data
      

  return (
    <div>
      <h2>{post.title}</h2>
      <Image src= {post.cover} />
      <div className={styles.description}> {post.description} </div>
      <Comments postId={id} />
    </div>
  )
}

export default Post
