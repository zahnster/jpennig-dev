# Jade Pennig's site experiment

This is a *very* early stage Next.js web app, with the ultimate goal being to turn this into my 
personal website, which is something I've been struggling to build for the last decade (...seriously).

I am hoping to build some interfaces to showcase:
* current music rotation
* select photography and media
* travel map
* blog (ha.. maybe..)
* {{{other magic and/or random stuff}}}

**\*\*DISCLAIMER\*\***

This project is very very very early. Like two nights of coding early. It will change, and it is full of bugs.

## Running The Project

You can checkout and run this project locally, however, you will need to provide your own MusicKit credentials.
The project is wired up to accept the keys and generate a JWT token when the app is started up (it then sets the
JWT token as an additional env var).

* Clone project
* `npm install`
* You will need to set the following environment variables (create a .env to store/manage)
  * MUSICKIT_TEAM_ID
  * MUSICKIT_KEY_ID
  * MUSICKIT_ID

## Technology Choices and Considerations

First and foremost, Next.js was chosen for a React framework / toolchain, as it is incredibly powerful
and robust, and fits the project's needs well. The app is deployed through now.sh, which is built to work
with Next.js apps.

For the music service, I have chosen Apple's MusicKit JS API, to take advantage of Apple Music's library.
This will require

## Future Considerations

Spotify also has a web API worth exploring. It might be worthwhile to investigate that API as well to see
if we could make the music player work with either service.

## Feedback

Feedback welcome, either through issues on here, or Twitter (@zahnster).
