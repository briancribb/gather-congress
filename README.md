# Gather Congress
A couple of little Node scripts which gather up data about members of Congress from an API and then write them to JSON files.

I used to have a little app called [Politician List](https://github.com/briancribb/politicianlist) that listed all members of both chambers of Congress and allowed you to filter them down, but it was based upon the ProPublica API which is no longer available. This dependency caused my app to irrevocably bork. Fortunately, Congress offers [its own API](https://api.congress.gov/) for getting data on our national politicians. There's also a [GitHub repository](https://github.com/LibraryOfCongress/api.congress.gov/) for the whole thing. This gives me a new source of data, but it doesn't solve the problem of disassociative borking which occurs when an API is taken down. For that, I'll need local data.

## How it Works
These scripts hit the endpoints from the [Congress.gov API](https://www.loc.gov/apis/additional-apis/congress-dot-gov-api/) from the Library of Congress. Run them one at a time, in order, and you'll end up with a usable data file.

1. build-data-files.js - This gets a list of active members for the current Congress. It uses the data to write two files to the current folder. First is just the data, and the other is an array of the `bioguideId` property from each member. It takes three calls to catch 'em all.

2. build-detailed-list.js - This one grabs the `bioguideId` array and uses that to hit the details API for each member, one at a time. This takes a minute or two to run, but then you have a data file for all active members of Congress which has more details than the data you get from the regular endpoint.

3. build-transformed-list.js - This builds the final file that will be used as the data source for politicianlist.com. Just copy "memberListData.js" over the version currently being used by the site.

**Note:** Delete the old files before making new ones. It's just a little script for me, so I didn't bother with protecting against that kind of error. If the files are still in the target folder, the terminal will honk at you.

**Another Note:** I played around with this in the browser before going into the terminal, and I kept that interface in the `Vite` branch in case I ever need it again.


## What's This For?
The data will be used in my other reposistory: [Politician List](https://github.com/briancribb/politicianlist). For now I'm going to use the general member list to get that app started, since I need something modern to show off during my job hunt. But that list doesn't include details like the person's age, and I really wanted to filter and sort by that data point. Bummer that they give the birth year instead of the birth date.

## Stuff This Will Solve
1. I will no longer need to worry about the API disappearing. If it does, my app will still work and I can put a note on there to tell visitors that I can't update it.
2. Rate Limits don't matter, since I'll only be hitting the API occasionally and site visitors won't hit it at all.
3. No one can look in the Network tab and grab my API key. It's not attached to a domain or anything. You just put that thing into a query parameter and there's bound to be some joker out there who doesn't want to give away his email address when he can just use mine. (Get your own, dude!)

## Tools I Will Use
This is going to end up as a bunch of tinkering in the browser, leading to a back-end script that will run from the terminal.
1. [Node](https://nodejs.org/en) - to hit the API and write the data files.
2. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - for requests to the Congress API, because it works pretty much the same in Node as it does in the browser.
