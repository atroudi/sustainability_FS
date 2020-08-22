import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import findModel from "app/components/higherOrder/findModel";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row, Panel, Container} from "react-bootstrap";
import superagent from "superagent";
import nprogress from "nprogress";
import {Pie} from "react-chartjs-2"


const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 3000;

export default class DecisionResultPanel extends React.Component{

    constructor(props){
        super(props)
        const {actions, collection} =props;
        this.state = {
            set: [100,10,10],
            positive: 10,
            negative: 10,
            neutral: 10,
            tweets: [],
        }
    }

    getAnaysis(tweet_list){
        const url = window.django.urls
        let request = superagent.get(window.django.urls.twitter);
        request.set("Accept", "application/json");
        request.query({});
        nprogress.start();

        request.end((error, response) => {
            nprogress.done();

            if (error) {
                console.log(error)
            } else {
                this.setState({
                    positive : response.body.positive, 
                    negative: response.body.negative, 
                    neutral: response.body.neutral,
                    tweets: response.body.tweets
                })
            }
        });
        
    }

    showAnalysis = () => {

        const data = {
            labels: [
                'Positive',    
                'Negative',
                'Neutral'
            ],
            datasets: [{
              data: [this.state.positive, this.state.negative, this.state.neutral],
              backgroundColor: [
              '#46BFBD',
              '#F7464A',
              '#FDB45C'
              ],
              hoverBackgroundColor: [
              '#46BFBD',
              '#F7464A',
              '#FDB45C'
              ]
            }]
          };

          const options = {
            maintainAspectRatio: false,
            responsive: false,
            legend: {
              position: 'left',
              labels: {
                boxWidth: 10
              }
            }
          }

        return(
            
            <Pie data={data} options={options} width={350} height={200}/>
            
        );
    }
    
    

    // componentDidMount(){                
    //     // promise with async/await
    //     this.getAnaysis(this.props.tweets);
    //     }


    componentWillReceiveProps(nextProps){
        const {props} = this;
        if (JSON.stringify(nextProps.pandemic_tweets) !== JSON.stringify(props.pandemic_tweets)){
            if (nextProps.pandemic_tweets)
                this.getAnaysis(nextProps.pandemic_tweets);
        }
        if(props.demand !== nextProps.demand){
            console.log(nextProps.demand);
        
        }
    }

    render(){      
        
        

        
        var renderTweets = this.state.tweets.map(function(item, i){
            var color = "#46BFBD";
            
            if(item.label == "Neutral"){
                color = "#FDB45C";
            }
            if(item.label == "Negative"){
                color = "#F7464A";
            }
              return (
                    <div key={i} className="tweets">
                    <h3>@{item.username}</h3>
                    <p>{item.text}</p>
                    <h4 style={{"color": color}}>Predicted Sentiment - {item.label}</h4>
                    </div>
                  );
            })

            var renderTweets2 = this.state.tweets.map(function(item, i){
                // list only first 10 tweets
                if(i<10){
                    var color = "#46BFBD";
            
                    if(item.label == "Neutral"){
                        color = "#FDB45C";
                    }
                    if(item.label == "Negative"){
                        color = "#F7464A";
                    }
                    return (
                    <li key={i} className={i}>
                      <div key={i} className="tweets">
                        <h3>@{item.username}</h3>
                        <p>{item.text}</p>
                        <h4 style={{"color": color}}>Predicted Sentiment - {item.label}</h4>
                        </div>
                    </li>
                  );
                }
            })
                  
        return(
            
            <Panel  style= {{border: 'none', padding: "0", backgroundColor: 'transparent', height: "200px"}} expanded={this.props.openPandemicPanel}>
            <Panel.Collapse>
            <Panel.Body>
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Sentiment Analysis Panel</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>
                <Box.Body>

                

                {/* {this.state.positive} */}
                {this.showAnalysis()}
                <div id="collapsible-pandemic-panel" >

                <Row xs={4}>
                <React.Fragment>

                    <ul className="tweets">
                        
                                {this.state.tweets?renderTweets:<br />}
                                </ul>
                                </React.Fragment>


                </Row>
                
                </div>

                </Box.Body>
            </Box.Wrapper> 
            </Panel.Body>
          </Panel.Collapse>
            </Panel>
        );
    }
    
}
