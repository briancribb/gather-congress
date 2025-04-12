# Gather Congress
A utility which will gather up data about members of Congress from an API and then write them to a JSON file.

I used to have a little app that listed all members of both chambers of Congress and allowed you to filter them down, but it was based upon the ProPublica API which is no longer available. This dependency caused my app to irrevocably bork. Fortunately, Congress offers [its own API](https://api.congress.gov/) for getting data on our national politicians. There's also a [GitHub repository](https://github.com/LibraryOfCongress/api.congress.gov/) for the whole thing. This gives me a new source of data, but it doesn't solve the problem of disassociative borking which occurs when an API is taken down. For that, I'll need local data.

## The Plan for Local Data
I'm going to write a little app that will get the general list of members of Congress. I can only get them 250 at a time so I'll have to use a series of promises. That will result in three calls, after which the real fun begins. Once I have a list of ID numbers for the 535 members, I'll do a call for each one and get the detailed member data from another endpoint in the API. That will take a while, and I'll need to make sure the error handling doesn't stop the process if one of the calls goes into a ditch. Once I have everybody, I'll use Node on my localhost to write the final array of detailed entries to a JSON file. I can put a time stamp on it so people know how old the data is, and I can run the app every so often to keep things current.

Once I have the data collected in a JSON file, I can use it in my other reposistory: [Politician List](https://github.com/briancribb/politicianlist). 

## Stuff This Will Solve

1. I will no longer need to worry about the API disappearing. If it does, my app will still work and I can put a note on there to tell visitors that I can't update it.
2. Rate Limits don't matter, since I'll only be hitting the API occasionally and site visitors won't hit it at all.
3. No one can look in the Network tab and grab my API key. You just put that thing into a query parameter and there's bound to be some joker out there who doesn't want to give away his email address when he can just use mine. (Get your own, dude!)

## Things I Will Do to Avoid Shenanigans
1. I'm going to run the final data through a transformation function which results in my own custom data structure. If the new API eventually disappears and I find a new one, I won't have to change my React app to match the new structure. I'll just alter my transformation function to accomodate it.
2. When some call for a Congressional member's details borks, I'll add their ID to a list which can then be run with a separate button after the first batch is done.

## Tools I Will Use
I'm going to make a little React App with Vite, and learn enough Node to make a local server that I can hit to write the final file. I'll use the Fetch API for calls.
1. [Vite](https://vite.dev/)
2. [React](https://react.dev/)
3. [Node](https://nodejs.org/en)
4. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
5. [Bootstrap](https://getbootstrap.com/)

## Future Improvements
There's actually a [Fetch API for Node](https://nodejs.org/en/learn/getting-started/fetch) that I could use for this. I'm more comfortable on the front-end at the moment, but when I get more experience with Node I can probably move some functions to the back-end and do this entire process from the terminal.
