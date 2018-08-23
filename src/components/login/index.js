import React,{Component} from 'react';
import {Grid,Row,Col,form,FormControl,ControlLabel, Button,HelpBlock} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginAction from '../../reducers/login';

class Login extends Component{
  state={
    name:'',
    password:'',
    helpText:''
  }

  static getDerivedStateFromProps(props,state){
    if(props.login.isLoginError){
      return {
        ...state,
        helpText:'Incorrect username or password',
      }
    }
    return{
      ...state,
      helpText:'',
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.login.loggedIn.hasOwnProperty('name') && !prevProps.login.loggedIn.hasOwnProperty('name')){
      this.props.history.push('./search');
    }
  }

  onChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  onClick=()=>{
    this.props.LoginAction.fetchLogin({...this.state});
  }


  render(){
    return(
      <Grid style={{marginTop:window.innerHeight/3}}>
        <Row>
          <Col md={4} mdOffset={4}>
            <form>
              <ControlLabel>Never tell me the odds!</ControlLabel>
              <FormControl
                type="text"
                name="name"
                placeholder="Username"
                onChange={this.onChange}
                value={this.state.name}
              />
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
              />
              <FormControl.Feedback />
              <Button bsStyle="primary" onClick={this.onClick} block>Login</Button>
              <HelpBlock>{this.state.helpText}</HelpBlock>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {login:state.login};
}
function mapDispatchToProps(dispatch){
  return  {
    LoginAction: bindActionCreators(LoginAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
