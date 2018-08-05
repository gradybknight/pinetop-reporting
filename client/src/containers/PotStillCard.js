import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPot, setGraphData } from '../actions/PotStillAction'
import UnitOpTabCard from '../components/UnitOpTabCard';
import OperationButton from '../components/OperationButton';



class PotStillCard extends Component {


    changePotState = () => {
        console.log(`changing state to ${!this.props.isRunning}`);
        this.props.setPot(!this.props.isRunning);
    }

    // componentDidMount() {
    //     this.interval =  setInterval(function() { updateGraphData() }, 1500);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    // updateGraphData() {
    //     this.props.setGraphData();
    // }


    render() {
        let lastTimePoint = this.props.graphData[this.props.graphData.length-1].x;
        let lastTemperature = this.props.graphData[this.props.graphData.length-1].y;
        return (
            <div>
                <UnitOpTabCard 
                    headline="100 Gallon Pot Still" 
                    graphData={this.props.graphData}
                    lastTimePoint={lastTimePoint}
                    lastTemperature={lastTemperature}
                />
                {this.props.isRunning ? 
                    <OperationButton 
                        buttonName="Stop Pot Still" 
                        buttonColor = "secondary"
                        onClick={this.changePotState}
                    /> :
                    <OperationButton 
                        buttonName="Start Pot Still" 
                        buttonColor = "primary"
                        onClick={this.changePotState}
                    />
                }

            </div>
        )
  }
}

PotStillCard.propTypes = {
    setPot: PropTypes.func.isRequired,
    setGraphData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    graphData: state.potStill.graphData,
    isRunning: state.potStill.isRunning
})


export default connect(mapStateToProps, { setPot, setGraphData })(PotStillCard);