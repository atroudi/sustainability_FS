import React from "react";
import _ from "lodash";
import {Link} from "react-router";


const allLinks = [
    // {
    //     permission: "users.view_emailuser",
    //     text: "Crop selection",
    //     to: "/admin/crops/",
    //     icon: "fa fa-map"
    // },
    // {
    //     permission: "users.view_emailuser",
    //     text: "Field selection",
    //     to: "/admin/geolocations/",
    //     icon: "fa fa-map"
    // },
        {
        permission: "users.view_emailuser",
        text: "Home",
        to: "/admin/home/",
        icon: "fa fa-map"
    },
    {
        permission: "users.view_emailuser",
        text: "Decision",
        to: "/admin/decision/",
        icon: "fa fa-map"
    },
    {
        permission: "users.view_emailuser",
        text: "Visualizations",
        to: "/admin/crops/",
        icon: "fa fa-map"
    },

    // {
    //     permission: "users.view_emailuser",
    //     text: "All Geolocations",
    //     to: "/admin/geolocations/",
    //     icon: "fa fa-map"
    // },
    // {
    //     permission: "users.view_emailuser",
    //     text: "Stations",
    //     to: "/admin/stations/",
    //     icon: "fa fa-map"
    // },
    // {
    //     permission: "users.view_emailuser",
    //     text: "Fields",
    //     to: "/admin/fields/",
    //     icon: "fa fa-map"
    // }
];

const userLinks = _.filter(allLinks, (link) => {
    return window.django.user.permissions.has(link.permission);
    // return true;  // for testing TO REMOVE
});


export default class Menu extends React.Component {

    constructor(props) {
        super(props)
    
        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
          activeIndex: 0
        }
    }
    
    componentWillReceiveProps(){
    }
    
    toggleClass(index, e) {
        this.setState({ activeIndex: index });
    };

    render() {
        return (
            <section className="sidebar">
                <ul className="sidebar-menu">
                    <li className="header text-center">MENU</li>
                    {_.map(userLinks, (link, key) => 
                        <li className={this.state.activeIndex==key ? 'active': null}
                        onClick={this.toggleClass.bind(this, key)}
                        key={key}>
                            <Link nextUrl={link.text} to={link.to}>
                                <i className={link.icon}/>
                                <span>{link.text}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </section>
        );
    }
}
