import React from 'react';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {									
            username: "",
            password: "",
        };

        this.demoUser = {
            username: 'demo_user@gmail.com',
            password: '12345678'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    };

    demoLogin(e) {
        e.preventDefault();
        const demoUser = Object.assign({}, demoUser)
        this.props.action(demoUser); 					
    };


   handleSubmit(e) {
       e.preventDefault();
       const user = Object.assign({}, this.state);
       this.props.action(user)
           .then( this.props.history.push("/"))

   };

   update(field) {
       return e => this.setState({ [field]: e.currentTarget.value })
   };

    // renderErrors() {
    //     let errors = this.props.errors.join('.');

    //     if (errors.length == 0) return null;

    //         window.setTimeout(() => this.props.clearErrors(), 5000);

    //     return (
    //         <p className="sign-in-error">
    //             <a className="close" onClick={() => this.props.clearErrors()}>x</a>
    //             {errors}
    //         </p>
    //     );
    // }

    render() {

       return (
            <div className="login-form-container">
                <div className="login-form-box">
                    <h2 className='login-title'>{this.props.formType}</h2>
                    <form onSubmit={this.handleSubmit}>
                        {/* <div className="login-form"> */}
                        {/* {this.renderErrors()} */}
                            <label>
                                    <input type="text"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-input"
                                    placeholder="Username"
                                    />
                            </label>
                            <label>
                                    <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                    placeholder="Password"
                                    />
                            </label>
                            <br />
                        {/* </div> */}
                            <input className="session-submit" type="submit" value={this.props.formType} />
                    </form>
                    <button className="demo-login" onClick={this.demoLogin}>Demo</button>
                </div>
            </div>
        );
    }
};

export default LoginForm; 


