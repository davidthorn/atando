import { SideBarItem } from "../components/Sidebar/SideBarItem";
import { UsersFeature, OrdersFeature, CompaniesFeature } from '../features'
import React from 'react'

export const SideBarItems: SideBarItem[] = [
  {
    name: 'Users',
    route: '/users',
    active: true,
    component: <UsersFeature/>

  },
  {
    name: 'Companies',
    route: '/companies',
    active: false,
    component: <CompaniesFeature/>
  },
  {
    name: 'Orders',
    route: '/orders',
    active: false,
    component: <OrdersFeature/>
  }
];
