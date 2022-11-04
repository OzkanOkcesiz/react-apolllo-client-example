import { Avatar, List } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../pages/Home/queries';
import Loading from '../Loading';
import { Link } from "react-router-dom"
import styles from "./styles.module.css"


interface PostsType {
  short_description?: string;
  id: string;
  title: string;
  user: {
    profile_photo?: string
  }

}


const UserList = () => {

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error:  {error.message} </div>
  }

  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data.posts}
      renderItem={(item: PostsType) => (
        <List.Item
        >
          <List.Item.Meta
            avatar={<Avatar src={item.user.profile_photo} />}
            title={<Link to={`/post/${item.id}`} className={styles.listTitle}>{item.title}</Link>}
            description={<Link to={`/post/${item.id}`} className={styles.listItem}>{item.short_description}</Link>}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;