
import search from './images/magnifying-glass.png';
import clear from './images/images/clear.png'
import { useState } from 'react';

function App() {

  const[city,setCity] = useState('')
  const[weather, setWeather] = useState({
    city:'',
    temp:'',
    humidity:'',
    wind:'',
  })
  const url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  const apiKey = `cb536198ef7e31f13f2cc8580883de64`

  const handleChange = (e) =>{
    setCity(e.target.value)
  }

  const handleSearch = async() => {
    try {
      const res = await fetch(`${url}${city}&appid=${apiKey}`)
      const data = await res.json()
      console.log(data)

      setWeather({
        city: data.name,
        temp: (data.main.temp - 273.15).toFixed(1), 
        humidity: data.main.humidity,
        wind: data.wind.speed


      });
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  return (
    <>
      <div>
        <h1 className='lg:text-6xl md:text-5xl sm:text-4xl flex justify-center m-5 text-white'><strong>Weather App</strong></h1>

        <section className='flex justify-center mt-24'>
          <div className='m-4 xl:p-3.5 md:p-2 sm:p-0.5 bg-neutral-100 rounded-xl lg:w-2/5 flex items-center'>
            <input className='p-5 rounded m-5 lg:w-4/5' type="text" placeholder='Enter the city name' value={city} onChange={handleChange} />
            <button className='bg-gray-900 p-4 rounded-full' onClick={handleSearch}><img src={search} height={'20px'} width={'30px'} /></button>
          </div>
        </section>

        <section className="flex justify-center mt-8">
          <div className="bg-neutral-100 rounded-xl lg:w-2/5 p-4 flex flex-col items-center">
            <div>
              <img className="h-48" src={clear} alt="Weather icon" />
            </div>
            <div className="text-center mt-4">
              <h1 className="lg:text-4xl md:text-3xl sm:text-2xl">{weather.city}</h1>
              <h1 className="lg:text-4xl md:text-3xl sm:text-2xl">{weather.temp}</h1>
            </div>
          </div>
        </section>

        <section className="flex justify-center mt-8">
          <div className="bg-neutral-100 rounded-xl lg:w-2/5 p-4">
            <div className="flex justify-between">
              <h1 className="lg:text-xl md:text-lg sm:text-md">{weather.humidity}</h1>
              <h1 className="lg:text-xl md:text-lg sm:text-md">{weather.wind}</h1>
            </div>
          </div>
        </section>

      </div>

    </>
  )
}

export default App
