import { SideBarItem } from "../components/Sidebar/SideBarItem";
import { UsersFeature, OrdersFeature, CompaniesFeature, UserFeature} from '../features'
import React from 'react'
import { User } from "./User.model";



export const SideBarItems: SideBarItem[] = [
  {
    name: 'Users',
    route: '/users',
    active: true,
    hidden: false,
    component: <UsersFeature></UsersFeature>

  },
  {
    name: 'User',
    route: '/user',
    active: false,
    hidden: true,
    component: <UserFeature/>

  },
  {
    name: 'Companies',
    route: '/companies',
    active: false,
    hidden: false,
    component: <CompaniesFeature/>
  },
  {
    name: 'Orders',
    route: '/orders',
    active: false,
    hidden: false,
    component: <OrdersFeature/>
  }
];
