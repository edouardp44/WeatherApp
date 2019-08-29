import React, { Component } from 'react';
import { EROFS } from 'constants';

class Weather extends Component {
    constructor() {
        super();

        this.state = {
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            cityName: '',
            iconId: '',
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() { 
        navigator.geolocation.getCurrentPosition((success) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${success.coords.latitude}&lon=${success.coords.longitude}&APPID=fcef1558e0f353f59ebb3001bb08d820`)
            .then(res => res.json())
            .then((res) => {
                this.setState({     
                    humidity: res.main.humidity,
                    cityName: res.name,
                    windSpeed: res.wind.speed,
                    temp: res.main.temp,
                    iconId: res.weather[0].icon
                })
            })    
        }, (error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${event.target.value}&APPID=fcef1558e0f353f59ebb3001bb08d820&lang=fr`)
        .then(result => result.json())
        .then((result) => {
            this.setState({
                humidity: result.main.humidity,
                cityName: result.name,
                windSpeed: result.wind.speed,
                temp: result.main.temp,
                iconId: result.weather[0].icon
            })
        });
    }

    handleSubmit(event) {
        alert('La ville a été soumis : ' + this.state.value);
        event.preventDefault();
      }

    render() {
        return (
            <div>
                 <form action='' methode='get' onSubmit={this.handleSubmit}>
                    <label for="city">
                    Ville :
                    </label>
                    <input type="text" name='city' onChange={this.handleChange} required/>
                    <input type="submit" value="Envoyer"/>
                </form>
                <p>Météo</p><img src={`http://openweathermap.org/img/wn/${this.state.iconId}.png`}></img>
                <p>Vous êtes à {this.state.cityName}</p>
                <p>Le vent est à une vitesse de {this.state.windSpeed}m/s </p>
                <p>Il fait actuellement {this.state.temp}°C</p>
                <p>Le taux d'humidité est de {this.state.humidity}%</p>
            </div>
        )
    }
}
export default Weather;