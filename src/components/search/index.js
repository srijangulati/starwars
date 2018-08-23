import React,{Component} from 'react';
import {Grid,Row,Col,form,FormControl, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginAction from '../../reducers/login';
import * as SearchAction from '../../reducers/search';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

class Search extends Component{
  state = {
    search:''
  };
  debounce = null;
  constructor(props){
    super(props);
    if(!this.props.login.loggedIn.hasOwnProperty('name')){
      this.props.history.push('/');
    }
  }
  onChange = (event)=>{
      this.setState({
        [event.target.name]:event.target.value
      })
      if(this.props.login.loggedIn.name==="Luke Skywalker")
        this.props.SearchAction.fetchPlanets(event.target.value);
      else{
        if(this.debounce){
          this.debounce(event.target.value);
        }
        else{
          this.debounce = debounce(this.props.SearchAction.fetchPlanets,1000/15);
          this.debounce(event.target.value);
        }
      }
  }

  nextSearch=()=>{
    if(this.props.search.next){
      this.props.SearchAction.fetchNext(this.props.search.next);
    }
  }


  render(){
    var data = this.props.search.planets.map((planet,index)=>{
      return{
        label:planet.name,
        value:parseInt(planet.population)
      }
    })
    return(
      <div>
        <Grid>
          <Row>
            <Col md={4} mdOffset={3}>
              <form>
                <FormControl
                  type="text"
                  name="search"
                  placeholder="Search"
                  onChange={this.onChange}
                  value={this.state.search}
                />
              </form>
            </Col>
            {(this.props.search.next)?(
            <Col md={2}>
              <Button bsStyle="primary" onClick={this.nextSearch}>Next</Button>
            </Col>):(<div/>)
            }
          </Row>
          <Row>
          {(this.props.search.planets.length)?(<BubbleChart
            graph={{
              zoom: 0.8
            }}
            data={data}
          />):(<div/>)}
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login:state.login,
    search:state.search
  };
}
function mapDispatchToProps(dispatch){
  return  {
    LoginAction: bindActionCreators(LoginAction,dispatch),
    SearchAction: bindActionCreators(SearchAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search);
