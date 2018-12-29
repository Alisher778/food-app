import React from 'react';
import TestComp from './TestComp';

const TestContext = React.createContext('hey');

class About extends React.Component {
    formHandler = (e) => {
        e.preventDefault();
        // const inputs = e.target.querySellectorAll('input');
        console.log(e.target.querySelectorAll('input'));
    }

    render() {
        return(
            <section>
                <h1>Secret Page Component</h1>
                <TestComp />
            </section>
        );
    }
}

export default About;