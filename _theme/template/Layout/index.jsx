import React,{Component} from 'react'
import Header from './Header'
import '../../static/style'

export default class LayoutDoc extends Component{
    render(){
        const {children } = this.props
        return(
            <div className="souche-wrapper">
                <Header />
                {children}
            </div>
        )
    }
}