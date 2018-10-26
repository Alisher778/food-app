import React from 'react';

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
                <form action="" onSubmit={this.formHandler}>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Your Name" name="name"/>
                    </div>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="YourEmail" name="email"/>
                    </div>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Your Number" name="phone"/>
                    </div>
                    <button>Send</button>
                </form>
            </section>
        );
    }
}

export default About;