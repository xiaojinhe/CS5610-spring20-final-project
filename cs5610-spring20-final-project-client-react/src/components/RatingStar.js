import React from 'react';


export class RatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      num:this.props.rating / 2.0,
      arr:[1,2,3,4,5]
    }
  }
  render(){
    return(
      <span>
        {this.state.arr.map((ele,index)=>{
          return(
            <span key={index}>
              {ele <= this.state.num ?
              <span><i className="fas fa-star"/></span> :
              (ele - this.state.num <= 0.5 ?
              <span><i className="fas fa-star-half-alt"/></span> :
              <span><i className="far fa-star"/></span>)}
            </span>
          )})
        }
      </span>
    )
  }
}