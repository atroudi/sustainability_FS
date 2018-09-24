import React from "react";
import {Link} from "react-router";


class LinkedListGroup extends React.Component {
    render() {
        const {collection,recordCollection} = this.props;
        // console.log(collection)
        // console.log(collection.models.size)


        // Check if the logged user is admin 
        console.log(window.django.user.is_superuser)

        let recordList = recordCollection.models.toList();
        let displayUsers = collection.models.toList();
        if(window.django.user.is_superuser=="False"){
            // filter all other users
            displayUsers = displayUsers
            .filter((model, key) => model.id==window.django.user.id)
        }
        console.log(collection.models)
        console.log(recordCollection.models)

        return (
            <div className="list-group" style={{opacity: collection.isLoading ? 0.5 : 1}}>
                {
                // filter staff (Doctors)
                displayUsers
                .filter((model, key) => model.is_staff==false)
                // sort based on id
                .sort((model1,model2)=>model1.id - model2.id)
                .map((model, key) =>
                {
                    let trend = recordList
                    .sort((r1, r2) => r2.id - r1.id)
                    .filter(record => record.owner_id == model.id)

                    let lastTrend = trend.reduce((m1,m2)=>m2.direction)
                    
                    // print last trend id
                    console.log(trend.reduce((m1,m2)=>m2.id));

                    let string=""
                    if(lastTrend== undefined){
                        string = model.toString()
                    } else {
                        string = model.toString() + "  (" + lastTrend + ")"
                    }

                    return <Link
                        activeClassName="active"
                        className="list-group-item"
                        to={model.appUrl()}
                    >
                        {string}
                        
                        <span className="pull-right">
                            <i className="fa fa-fw fa-angle-right"/>
                        </span>
                    </Link>
                }
                )}
                {collection.models.size === 0
                    && <div className="list-group-item">No items found.</div>}
            </div>
        );
    }
}

export default LinkedListGroup;
