# unpolished
LIRI is a Language Interpretation and Recognition Interface Nodejs application that takes in user porivded search parameters and returns relevant data based on publicly accessible API's.

**COMPLETED** and functioning product screenshots are located in the corresponding folder of the same name.


For the application to run on your device you will need to clone the repository and install the following Node modules:
Axios
Moment
Env
Node-Spotify-API
  You will also need to provide your own Spotify API key
 
At this time LIRI accepts four user command line interface inputs in the following formats:

node liri.js spotify-this-song "Song Name" (This returns information from Spotify regarding a searched song.)
node liri.js concert-this "Artist Name" (This returns information from Bands-In-Town regarding a searched artist.)
node liri.js movie-this "Movie Name" (This returns information from OMDB regarding a searched movie.)
node liri.js do-what-it-says (Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's corresponding commands.)

**#TODO**
1) Create a visual, front-end counterpart.
2) Incorporate other search metrics, ie local weather, directions, etc.
