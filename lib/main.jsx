import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let value = event.target.value
    this.setState({location: value})
  }

  handleClick(event) {
    $.get(this.props.source + this.state.location, (results) => {
      this.setState( { weather: results, location: ''},
      localStorage.setItem('location', this.state.location))

    })
  }

  render() {
    return(
      <div className='div-holding-input-feild'>
        <section className='header'>
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
          </section>
            <WeatherDisplay weather = {this.state.weather}/>
      </div>
    )
  }
}

const WeatherDisplay = (props) => {
  let { weather } = (props);
  if (!weather) {
    return (
      <div>
        <h2>welcome to weatherly. type in your location to get started</h2>
      </div>
    );
  }
  if (weather.length === 0) {
    return (
      <div>
        <h2>valid locations are</h2>
        <p>castle rock</p>
        <p>denver</p>
        <p>san-diego</p>
        <p>san-fransisco</p>
      </div>
    )
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
  let { location, date, weatherType, picture, temp } = props
  return(
    <div>
        <div className='individual-day-of-week '>
          <p className='location-p-tag'>{location.toUpperCase()}</p>
          <p className='date-p-tag'>{date}</p>
          <p className='high-p-tag'>The high today will be {temp.high}</p>
          <img src={'/images/snow.svg'} width='150px' height='160px'/>
          <p className='low-p-tag'>The low today will be {temp.low}</p>
          <p>{weatherType.type}</p>
        </div>
    </div>
  )
}


ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' title='weatherly'/>, document.querySelector('.application'))
