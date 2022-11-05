import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css"

const items: MenuProps['items'] = [
  {
    label: (
      <Link className={styles.menuItem} to='/'>
        Home
      </Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link className={styles.menuItem} to='new'>
        New
      </Link>
    ),
    key: 'new',
  }
];

const HeaderMenu = () => {
  const [current, setCurrent] = useState("");

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className= {styles.headerMenu} />;
};

export default HeaderMenu;