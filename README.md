## liri-node-app

### Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters, queries APIs, and gives you back data.

### Commands

* `my-tweets`
This will show your last 20 tweets and when they were created at in your terminal/bash window.

* `spotify-this-song`
This will show the following information about the song in your terminal/bash window:

    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
    
If no song is provided, the program will default to "The Sign" by Ace of Base.

* `movie-this`
*This will output the following information to your terminal/bash window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

* `do-what-it-says`
Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

### Logging
In addition to logging the data to your terminal/bash window, LIRI will output the data to a .txt file called `log.txt`.
