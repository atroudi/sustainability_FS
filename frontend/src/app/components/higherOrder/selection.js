import React from "react";
import {Button, Modal} from "react-bootstrap";
import {List} from "immutable";
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

export default (Component) => {
    class CreateForm extends React.Component {
        constructor(props) {
            super(props);
            const {collection} = props;

            this.state = {
                show: true,
                file: null,
                changeSet: new collection.ChangeSet()
            };
        }

        showModal = () => {
            this.setState({show: true});
        }

        hideModal = () => {
            const {changeSet} = this.state;

            this.setState({
                show: false,
                changeSet: changeSet.clear()
            });
        }

        // handleChangeFile(event) {
        //     const f = event.target.files[0];
        //     let formData = new FormData();
        //     formData.append('file', f);
        //     //Make a request to server and send formData
        //     const {changeSet} = this.state;

        //     this.setState({
        //         file: f
                //  changeSet: changeSet.set(event.target.name, file)
        //     });
        //   }

        handleChangeFile = (event) => {
            // Retreive file
            const f = event.target.files[0];
            this.setState({
                file: f,
                // changeSet: changeSet.set(event.target.name, formData)
            });
        }
          
        handleChange = (evnt) => {
            const {changeSet} = this.state;
            console.log(changeSet)
            this.setState({
                changeSet: changeSet.set(evnt.target.name, evnt.target.value)
            });
        }

        handleSubmit = (evnt) => {
            const {actions, collection} = this.props;
            const {changeSet} = this.state;
            const {file} = this.state;
            const {router} = this.context;

            const successCb = List([
                () => this.hideModal(),
                (response) => {
                    const Model = collection.get("Model");
                    const model = new Model(response.body);
                    this.setState({changeSet: changeSet.clear()});
                    router.push(model.appUrl());
                }
            ]);

            const errorCb = List([
                (response) => this.setState({
                    changeSet: changeSet.set("_errors", response.body)
                })
            ]);

            evnt.preventDefault();
            actions.createModel({collection, successCb, errorCb, changeSet, file});
        }

        handleSubmit2 = (evnt) => {
            const {actions, collection} = this.props;
            const {changeSet} = this.state;
            const {file} = this.state;
            const {router} = this.context;
            // hide modal
            this.hideModal()


            if (changeSet.get(this.props.entry))
                this.context.router.push(this.props.location.pathname + "/" + changeSet.get(this.props.entry))
            else
                this.context.router.push(this.props.entry)

            if (this.props.variables){
                var variablesList = this.props.variables.split(",");
                for (var variable in variablesList){
                    this.context.router.push(this.props.location.pathname + "/" + changeSet.get(this.props.entry) + "?" + variablesList[variable] + "=" + changeSet.get(variablesList[variable]))
                }
            }

            // const successCb = List([
            //     () => this.hideModal(),
            //     (response) => {
            //         const Model = collection.get("Model");
            //         const model = new Model(response.body);
            //         this.setState({changeSet: changeSet.clear()});
            //         router.push(model.appUrl());
            //     }
            // ]);

            // const errorCb = List([
            //     (response) => this.setState({
            //         changeSet: changeSet.set("_errors", response.body)
            //     })
            // ]);

            // evnt.preventDefault();
            // actions.createModel({collection, successCb, errorCb, changeSet, file});
        }

        render() {
            const {collection} = this.props;
            const {changeSet} = this.state;

            return(
                // <a className="btn btn-app" onClick={this.showModal}>
                    // <i className="fa fa-plus"></i> Add {collection.titleSingular}
                    <Modal
                        onHide={this.hideModal}
                        show={this.state.show}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.titleSingular}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Component
                                changeSet={changeSet}
                                handleChange={this.handleChange}
                                handleChangeFile={this.handleChangeFile}

                                handleSubmit={this.handleSubmit}
                                {...this.props}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            {/* <Button
                                className="pull-left"
                                onClick={this.hideModal}>Cancel
                            </Button> */}
                            <Button onClick={this.handleSubmit2}>Next</Button>
                        </Modal.Footer>
                    </Modal>
                // </a>
            );
        }
    }

    CreateForm.contextTypes = {
        router: PropTypes.object
    };

    return CreateForm;
};
