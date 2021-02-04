const axios = require("axios")


static async weather(req, res, next) {
  try {
    const url = `https://api.currentsapi.services/v1/latest-news?country=ID&apiKey=6cHyeWL2ZD3W4RK5yf1fnRFHWZV-5sUZosV2I0r4_f3tOB66`
    const response = await axios.get(url)
    const news = response.data
    console.log(news);

    res.status(200).json(news)
  } catch (err) {
    next(err)
  }
}





http://api.airvisual.com/v2/nearest_city?key=6a43e3ca-235f-49a1-bc6d-6727e5895709
http://api.airvisual.com/v2/states?country=Indonesia&key=6a43e3ca-235f-49a1-bc6d-6727e5895709
http://api.airvisual.com/v2/cities?state=Bali&country=Indonesia&key=6a43e3ca-235f-49a1-bc6d-6727e5895709
http://api.airvisual.com/v2/city?city=jakarta&key=6a43e3ca-235f-49a1-bc6d-6727e5895709


static async weather(req, res, next) {
  try {
    const url = `http://api.airvisual.com/v2/states?country=Indonesia&key=6a43e3ca-235f-49a1-bc6d-6727e5895709`
    const response = await axios.get(url)
    const news = response.data
    console.log(news);

    res.status(200).json(news)
  } catch (err) {
    next(err)
  }
}

{
  "status": "success",
  "data": [
      {
          "state": "Bali"
      },
      {
          "state": "East Java"
      },
      {
          "state": "Jakarta"
      },
      {
          "state": "Riau"
      },
      {
          "state": "West Kalimantan"
      }
  ]
}


{
  "status": "success",
  "data": [
      {
          "city": "Denpasar"
      },
      {
          "city": "Jimbaran"
      },
      {
          "city": "Kuta"
      }
  ]
}

{
  "status": "success",
  "data": [
      {
          "city": "Sidoarjo"
      },
      {
          "city": "Surabaya"
      }
  ]
}

{
  "status": "success",
  "data": [
      {
          "city": "Jakarta"
      }
  ]
}

{
  "status": "success",
  "data": [
      {
          "city": "Balaipungut"
      },
      {
          "city": "Bangkinang"
      },
      {
          "city": "Duri"
      },
      {
          "city": "Pekanbaru"
      },
      {
          "city": "Sedinginan"
      }
  ]
}

{
  "status": "success",
  "data": [
      {
          "city": "Pontianak"
      }
  ]
}

static async weather(req, res, next) {
  try {
    const city = req.query.city || "bandung"

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_APIKEY}`)
    const localweather = {
      weather: response.data.weather[0].main,
      temp: response.data.main.temp,
      city: response.data.name
    }

    res.status(200).json(localweather)
  } catch (err) {
    next(err)
  }
}


