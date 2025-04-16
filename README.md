# Gather Congress
A utility which will gather up data about members of Congress from an API and then write them to a JSON file.

I used to have a little app called [Politician List](https://github.com/briancribb/politicianlist) that listed all members of both chambers of Congress and allowed you to filter them down, but it was based upon the ProPublica API which is no longer available. This dependency caused my app to irrevocably bork. Fortunately, Congress offers [its own API](https://api.congress.gov/) for getting data on our national politicians. There's also a [GitHub repository](https://github.com/LibraryOfCongress/api.congress.gov/) for the whole thing. This gives me a new source of data, but it doesn't solve the problem of disassociative borking which occurs when an API is taken down. For that, I'll need local data.

## The Plan for Local Data
I'm going to write a little Node app that will get the general list of members of Congress. I can only get them 250 at a time so I'll have to use a series of promises. That will result in three calls, after which the real fun begins. Once I have a list of ID numbers for the 535 members, I'll do a call for each one and get the detailed member data from another endpoint in the API. That's going to be the tricky part, because I don't want to bombard the API with a bunch of simultaneous calls. I'll probably just collect the IDs for each active member and run them in smaller batches to limit the number of calls. Most likely I'll set them up so that the next call is made from inside the callback of the previous one.

Once I have everybody, I'll use Node on my localhost to write the final array of detailed entries to a JSON file. I can put a time stamp on it so people know how old the data is, and I can run the app every so often to keep things current. If this works out, I'll learn some Node and I'll have a process that I can run over a few minutes every couple of weeks.

The data will be used in my other reposistory: [Politician List](https://github.com/briancribb/politicianlist). For now I'm going to use the general member list to get that app started, since I need something modern to show off during my job hunt. But that list doesn't include details like the person's age, and I'd really like to filter and sort by that data point. Once the list is good, 

## Stuff This Will Solve

1. I will no longer need to worry about the API disappearing. If it does, my app will still work and I can put a note on there to tell visitors that I can't update it.
2. Rate Limits don't matter, since I'll only be hitting the API occasionally and site visitors won't hit it at all.
3. No one can look in the Network tab and grab my API key. It's not attached to a domain or anything. You just put that thing into a query parameter and there's bound to be some joker out there who doesn't want to give away his email address when he can just use mine. (Get your own, dude!)

## Things I Will Do to Avoid Shenanigans
1. I'm going to run the final data through a transformation function which results in my own custom data structure. If the new API eventually disappears and I find a new one, I won't have to change my React app to match the new structure. I'll just alter my transformation function to accomodate it.
2. If some call for a Congressional member's details borks, I'll add their ID to a list which can then be run with a separate button after the first batch is done.

## Tools I Will Use
This is going to end up as a bunch of tinkering in the browser, leading to a back-end script that will run from the terminal.

1. [Node](https://nodejs.org/en) - to hit the API and write the data files.
2. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - for requests to the Congress API, because it works pretty much the same in Node as it does in the browser.
