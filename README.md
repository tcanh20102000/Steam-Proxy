# Steam-Proxy
This repository creates a server that act as a proxy to receive response from SteamAPI. This webserver is currently [online](https://steam-proxy.vercel.app/).

## 1.Detail
### 1.1 API

Constrast with the above sentence, this webserver made requests to both SteamAPI and [Steam Spy API](https://steamspy.com/api.php) to get necessary info, as Steam Spy API has some cool features that SteamAPI doesn't support like GET top 100 in 2 weeks, GET games for a particular genres (this feature only usable for a handful of genres), ...

### 1.2 Routes

There are two main routes in this webserver, GetNAppsAPI with address "/get_multi_apps/" and GetAppDetail with address "/get_app_detail/".

GetNAppsAPI
 Has four functions: get games in particular genres, get random games, get all games and get top 100.
 1) Get games in particular genres
  - Has the address "/get_in_genre/:genre". You can access it with the syntax 'https://steam-proxy.vercel.app/get_multi_apps/get_in_genre/:genre' with the genre is limit to the list of genres that Steam API support.
    Ex: 'https://steam-proxy.vercel.app/get_multi_apps/get_in_genre/casual' will return info about some apps, while 'https://steam-proxy.vercel.app/get_multi_apps/get_in_genre/science_fiction' (an accessible genre in Steam official website) yield empty.
  - For more detail about that list, access https://steamspy.com/about and go to Genres menu.
    
 2) Get random games
  - Has the address "/get_random/". You can access it with the syntax 'https://steam-proxy.vercel.app/get_multi_apps/get_random'.
  - Will returns 20 random games from the top100in2weeks API provided by SteamAPI. I intended to get random games for the *all* requests but with the 1 request per 60 second limit from steamAPI, for the sake of simplified the demo, I chose the current option.
    
 3) Get all games
  - Has the address "/get_all". You can access it with the syntax 'https://steam-proxy.vercel.app/get_multi_apps/get_all'.
  - Return all the games, at least SteamSpy API said so.
  - With the limit of 1 request per 60 second, this request should not be called frequently.
  4) Get top 100
  - Has the address "/get_top_100". You can access it with the syntax 'https://steam-proxy.vercel.app/get_multi_apps/get_top_100'.
  - Return top 100 game played in 2 weeks.

GetAppDetail



## 2.Hosting

I host this webserver with Vercel. For the step, I mostly followed [Coding Garden's video](https://www.youtube.com/watch?v=B-T69_VP2Ls) instructions but instead of using command line as in the video, I connected my Git repository to Vercel.
