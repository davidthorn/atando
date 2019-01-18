import React,{ Component } from 'react'
export interface SideBarItem {
    name: string;
    active: boolean;
    route: string;
    component: any
}
