import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let value = event.target.value
    this.setState({location: value})
  }

  handleClick(event) {
    $.get(this.props.source + this.state.location, (results) => {
      this.setState( { weather: results },
      localStorage.setItem('location', this.state.location))

    })
  }

  render() {
    return(
      <div className='div-holding-input-feild'>
        <container className='header'>
          <h1>{this.props.title}</h1>
            <input
              className='Header-input'
              placeholder='Enter a Location'
              value={this.state.location}
              onChange={this.handleChange}>
            </input>

            <input
              className='Header-button'
              type='button'
              value='Go!'
              onClick={ (event) => {
                this.handleClick(event);
              }}>
            </input>
            <WeatherDisplay weather = {this.state.weather}/>
        </container>
      </div>
    )
  }
}

const WeatherDisplay = (props) => {
  let { weather } = (props);
  if(!weather) {
    return (
      <div>please enter a location</div>
    );
  }
  return (
    <div className='Weather-Card'>
      {weather.map((card) =>
        <div className='display-cards-inline' key={card.date}>
          <WeatherData {...card} />
        </div> )}
    </div>
  )

}

const WeatherData = (props) => {
  let { location, date, weatherType, temp } = props
  return(
    <div>
        <div className='individual-day-of-week '>
          <p className='location-p-tag'>{location}</p>
          <p>{date}</p>
          <p>{temp.high}</p>
          <p>{temp.low}</p>
        </div>
    </div>
  )
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
//   handleClick(event){
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
//           onClick={ (event) => this.handleClick(event) }
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
