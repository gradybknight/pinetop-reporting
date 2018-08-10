import React from 'react';
import { connect } from 'react-redux';
import TabbedNavBar from '../components/TabbedNavBar';
import { setActiveCard } from '../actions/userAction';
import PotStillCard from './PotStillCard';
import ExplanationCard from '../components/ExplanationCard';
import UtilityCalculator from '../components/UtilityCalculator';
import Dashboard from '../components/Dashboard';

const TabBar = ( props ) => {
    // let selectedTab;
    
    const setActiveTab = (tabIndex, selectedTab) => {
        let indexValue = parseInt(tabIndex.value, 10);  // includes radix parameter to make react quit complaining
        selectedTab = props.allowedTabs[indexValue];
        props.setActiveCard(selectedTab);
    } 

    return (
        <div>
            <TabbedNavBar tabName={props.allowedTabs} testFunction={setActiveTab} />
            {props.activeCard === 'Explanation' ? <ExplanationCard /> : ""}
            {/* {props.activeCard === 'Explanation' ? <ExplanationContainer /> : ""} */}
            {props.activeCard === 'Stripping Pot' ? <PotStillCard /> : ""}
            {props.activeCard === 'Utility Calculators' ? <UtilityCalculator /> : ""}
            {props.activeCard === 'Dashboard' ? <Dashboard /> : ""}
        </div>
    )
}



const mapStateToProps = state => ({
    allowedTabs: state.userInfo.allowedTabs,
    activeCard: state.userInfo.activeCard
})

export default connect(mapStateToProps, { setActiveCard })(TabBar);