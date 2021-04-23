# My Spotify Data

The server-side of the `My Spotify Data` app uses the Spotify API to 1) log into a user's Spotify account, 2) search for a song among the user's playlists, 3) view the user's recent listening history, and 4) export the user's songs to a csv file.

The app has a PostgreSQL database used to store 1) the username, 2) the user's playlists, and, 3) the user's songs. There are 3 main tables: spotify_users, playlists, and tracks.

## Spotify Login & Token Management

Spotify Web authorization template code used for login, token access, and token refresh:

https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js

## Spotify GET API - list of user's playlists

GET https://api.spotify.com/v1/me/playlists

## Spotify GET API - user's tracks

GET https://api.spotify.com/v1/tracks

## Spotify GET API - user's current listening history

GET https://api.spotify.com/v1/me/player/recently-played

## App DB POST

Along with using the Spotify API to perform GETs of user data, this app also does a PostgreSQL POST of user song data to the My Spotify Data database.
