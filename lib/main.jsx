import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      test: false,
    }
  }
  render() {
    return(
      <div>
        <container className='header'>
          <h1>{this.props.title}</h1>
          <Header
          source = {this.props.source}/>
        </container>
        <Body />
      </div>
    )
  }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: null,
    }
    this.updateProperties = this.updateProperties.bind(this);
  }
  updateProperties(event) {
    let value = event.target.value
    this.setState({location: value})
  }

  locationAccepted(event) {
    $.get(this.props.source + this.state.location, (results) => {
      this.setState( { weather: results },
      localStorage.setItem('location', this.state.location))

    })
  }


  render() {
    return(
      <div className='div-holding-input-feild'>
        <container>
          <input
            className='Header-input'
            placeholder='Enter a Location'
            value={this.state.location}
            onChange={this.updateProperties}>
          </input>

          <input
            className='Header-button'
            type='button'
            value='Go!'
            onClick={(event) => this.locationAccepted(event)}>
          </input>
        </container>
      </div>
    )
  }
}

class Body extends React.Component {
  render() {
    return(
      <div>
        body test
      </div>
    )
  }
}

ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' title='Weatherly'/>, document.querySelector('.application'))




























































































//
// import React from 'react'
// import ReactDOM from 'react-dom'
// const $ = require('jquery')
//
// class Main extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       location: '',
//       // setting our location to blank, call api
//       weather: null,
//     }
//   }
//
//   locationAccepted(event){
//     // make our server request
//     $.get(this.props.source + this.state.location , (results) => {
//       this.setState( { weather: results }, localStorage.setItem('location', this.state.location))
//     })
//     // once we get results back, put them in array
//     // set the state of our data array to be the response from the api
//     // store the idea in local storage
//     // clear fields
//
//   }
//
//   render(){
//     return(
//       <div className='container-holding-input-feild'>
//         <section className='header'>
//         <h1>{this.props.title}</h1>
//         <input
//           className='LocationInput-feild'
//           placeholder='location'
//           value = { this.state.location }
//         // making the location whatever the user types in, changing the state to whatever the user types in
//           onChange={(event) => { this.setState({ location: event.target.value})}}
//         // passes through an event, location can now be the new event since we are targeting the value
//       />
//         <input
//           className='LocationInput-button'
//           type='submit'
//           onClick={ (event) => this.locationAccepted(event) }
//           // made a location accepted event/function before it was a real thing
//         />
//         </section>
//     {/* // made button into input because its easier  */}
//         <WeatherDisplayList weather={ this.state.weather }/>
//       </div>
//     )
//   }
// }
//
// const WeatherDisplayList = (props) => {
//   let { weather } = props
//
//   if (!weather) {
//     return (
//       <div>
//         <div className='original-message'>Enter a Location</div>
//       </div>
//     )
//   }
//
//   return (
//     <div className='Weather-Card'>
//       { weather.map((card) => <div className='display-cards-inline' key={ card.date }>
//         <Weather {...card}/>
//       </div> )}
//     </div>
//   )
// }
//
// // <li>{card.location}</li>
// // <li>{card.temp.high}</li>
// // <li>{card.temp.high}</li>
//
// const Weather = (props) => {
//   let {location, date, temp} = props
//
//   return(
//     <div>
//         <div className='individual-day-of-week '>
//           <p className='location-p-tag'>{location}</p>
//           <p>{date}</p>
//           <p>{temp.high}</p>
//           <p>{temp.low}</p>
//         </div>
//     </div>
//   )
// }
//
// ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' title='Weatherly'/>, document.querySelector('.application'));
