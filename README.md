# Gather Congress
A utility which will gather up data about members of Congress from an API and then write them to a JSON file.

I used to have a little app called [Politician List](https://github.com/briancribb/politicianlist) that listed all members of both chambers of Congress and allowed you to filter them down, but it was based upon the ProPublica API which is no longer available. This dependency caused my app to irrevocably bork. Fortunately, Congress offers [its own API](https://api.congress.gov/) for getting data on our national politicians. There's also a [GitHub repository](https://github.com/LibraryOfCongress/api.congress.gov/) for the whole thing. This gives me a new source of data, but it doesn't solve the problem of disassociative borking which occurs when an API is taken down. For that, I'll need local data.

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
1. [Vite](https://vite.dev/) - for bundling.
2. [React](https://react.dev/) - for the UI.
3. [Node](https://nodejs.org/en) - to write the final data files.
4. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - for requests, so I can avoid using jQuery.
5. [Bootstrap](https://getbootstrap.com/) - for styling, because this is just a utility.
6. TypeScript - because everyone is using TypeScript now and I need to use it more.

## Future Improvements
There's actually a [Fetch API for Node](https://nodejs.org/en/learn/getting-started/fetch) that I could use for this. I'm more comfortable on the front-end at the moment, but when I get more experience with Node I can probably move some functions to the back-end and do this entire process from the terminal.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
