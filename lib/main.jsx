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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    let value = event.target.value
    this.setState({location: value})
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleClick(event);
    }
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
              aria-label="enter a location"
              placeholder='Enter a Location'
              type='text'
              value={this.state.location}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}>
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
  let { location, date, weatherType, temp } = props
  return(
    <div>
        <div className='individual-day-of-week '>
          <p className='location-p-tag'>{location.toUpperCase()}</p>
          <p className='date-p-tag'>{date}</p>
          <p className='high-p-tag'>The high today will be {temp.high}</p>
          <p className='fake-temp-p-tag'>{(Math.floor(Math.random() * 20) +1) + (temp.low)}</p>
          <p className={checkWeather(weatherType.type)}></p>
          <p className='low-p-tag'>The low today will be {temp.low}</p>
          <p>{weatherType.type}</p>
        </div>
    </div>
  )
}

function checkWeather(type) {
  if (type === 'sunny') {
    return 'sunny'
  } else if (type === 'cloudy') {
    return 'cloudy'
  }  else if (type === 'windy') {
    return 'windy'
  } else if (type === 'thunder storms') {
    return 'thunderstorm'
  } else if (type === 'foggy') {
    return 'foggy'
  } else if (type === 'snow') {
    return 'snow'
  } else if (type === 'rain') {
    return 'rain'
  }
}


ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' title='weathrly'/>, document.querySelector('.application'))
