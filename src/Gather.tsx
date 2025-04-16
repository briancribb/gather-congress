import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './gather.css'

function Gather() {
  const [APIKey, setAPIKey] = useState("");
  const [congressNum, setCongressNum] = useState(119);
  const [disabled, setDisabled] = useState(false);
  const [limit] = useState(250);


  /*
  Some non-state scoped variables. I can't wait for the lifecycle to update because 
  I'll need the new value on the very next line. This is all going to end up in Node anyway.
  */

  let offset = 0; 
  let memberIds = [];
  let members = [];

  const handleKeyChange = (evt) => {
    setAPIKey(evt.target.value);
  }

  const handleNumChange = (evt) => {
    setAPIKey(evt.target.value);
  }

  const handleClick = (evt) => {
    getIds();
  }

  const getMemberList = () => {
    console.log('getMemberList()');

    let request = `https://api.congress.gov/v3/member/congress/${congressNum}?format=json&offset=${offset}&limit=${limit}&api_key=${APIKey}`;

    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  }

  const getIds = () => {
    console.log('getIds()');
    setDisabled(true);

    if (!APIKey) {
      console.error("You must provide a valid API key.");
      return;
    } else if(!congressNum) {
      console.error("Please provide the number of the current Congress.");
      return;
    }

    getMemberList().then((response) => {
      if (response?.members && response.members.length > 0) {
        offset += 250;
        let justIds = response.members.map((member)=>member.bioguideId);
        memberIds.push(...justIds);
        if (offset !== 0 && offset < 1000) getIds();// No runaways, please.
      } else {
        setDisabled(false);
        console.log("-- Ran out of peeps.", {memberIds});
      }
    });
  }



  return (
    <>

      <div className="container pt-5">
        <h1>Gather Congress</h1>
        <p className="lead">Add an API Key from the <a target="_blank" href="https://www.congress.gov/help/using-data-offsite">Congress.gov API</a> and hit the button to all Members of the U.S. House and Senate.</p>
        <form className="mb-5">
          <div className="mb-3">
            <label htmlFor="api-key" className="form-label">API Key</label>
            <input type="text" className="form-control" id="api-key" aria-describedby="api-key-help" onChange={handleKeyChange} />
            <div id="api-key-help" className="form-text">Please provide an API key from <a target="_blank" href="https://www.congress.gov/help/using-data-offsite">Congress.gov</a></div>
          </div>
          <div className="mb-3">
            <label htmlFor="congress-number" className="form-label">Congress Number</label>
            <input type="number" className="form-control" id="congress-number" aria-describedby="api-key-help" onChange={handleNumChange} />
            <div id="api-key-help" className="form-text">Please provide the current number for Congress. In 2025, it's 119.</div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary" disabled={disabled} onClick={handleClick}>Gather</button>
          </div>
        </form>
        <p>The goal is to hit the Congressional API and gather up all members of both chambers, and then hit each member in turn to build up an array of detailed data.</p>
        <p>This will take multiple calls and it will involve promise chains and error handling. It's going to end up as a back-end utility in Node, but since Node uses JavaScript I can work out the functions in the browser's developer console before moving it into Node.</p>
        <p>Here's the <a target="_blank" href="https://github.com/briancribb/gather-congress/">GitHub repo</a> for this utility.</p>
      </div>
    </>
  )
}

export default Gather
