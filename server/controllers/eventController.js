const axios = require('axios');
const TM_APIKEY = process.env.TM_APIKEY

class EventController{
    
    static showEvent(req,res,next){
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${TM_APIKEY}`)
        .then((eventsData)=>{
            const {events} = eventsData.data._embedded
            // console.log(eventsData);
            res.status(200).json(events)
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = EventController