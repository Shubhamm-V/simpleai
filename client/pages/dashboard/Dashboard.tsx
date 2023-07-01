import React from 'react';
import { useSelector } from 'react-redux';
type Props = {};

const Dashboard = (props: Props) => {
  const userInfo = useSelector((state: any) => state.userReducer.user);
  const user = userInfo.data.user;
  console.log('User: ', user);
  return <div>{user.name}</div>;
};

export default Dashboard;
