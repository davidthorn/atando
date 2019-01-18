import React, { Component } from "react"
import './Orders.scss'

interface OrdersFeatureProps {

}

interface OrdersFeatureState {
    
}

export class OrdersFeature extends Component<OrdersFeatureProps, OrdersFeatureState> {

    constructor(props: OrdersFeatureProps, state: OrdersFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="OrdersFeature">
                Orders Feature
            </div>
        )
    }

}
