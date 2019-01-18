import React, { Component } from "react"
import './Sidebar.scss';
import { SideBarItem } from "./SideBarItem";

export interface SideBarProps {
    onTap(item: SideBarItem): void
    items: SideBarItem[]
}

interface SidebarState {

}

export class SidebarComponent extends Component<SideBarProps, SidebarState> {

    constructor(props: SideBarProps, state: SidebarState) {
        super(props, state)
        this.state = {
        }
    }

    render() {

        const i = this.props.items.map((item, index) => {
            return (
                <div onClick={(e) => this.props.onTap(item)} key={index} className="SidebarItem">
                    { item.name }
                </div>
            )
        })

        return (
            <div className="Sidebar">
               { i }
            </div>
        )
    }

}

// const style = StyleSheet.create({
//     view: {
//     }
// })