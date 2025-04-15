import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './gather.css'

function Gather() {
  const [APIKey, setAPIKey] = useState("");
  const [haveMembers, setHaveMembers] = useState(false);
  const [memberCount, setMemberCount] = useState(false);

  const handleChange = (evt) => {
    console.log(evt.target.value);
    setAPIKey(evt.target.value)
  }

  const handleClick = (evt) => {
    console.log(APIKey);
  }

  const getListURL = (congressNum, APIKey, limit, offset)=>{
    return `https://api.congress.gov/v3/member/congress/${congressNum}?format=json&offset=${offset}&limit=${limit}&api_key=${APIKey}`;
  }

  const getAllMembers = (congressNum = "", APIKey = "") => {
    let offset = 0, limit = 250;

    window
      .fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.blob();
      })
      .then((response) => {
        myImage.src = URL.createObjectURL(response);
      });


  }



  return (
    <>

      <div className="container pt-5">
        <h1>Gather Congress</h1>
        <div className="input-group mx-auto">
          <input type="text" className="form-control" placeholder="API Key" aria-label="API Key" aria-describedby="button-key" onChange={handleChange} />
          <button className="btn btn-outline-secondary" type="button" id="button-key" onClick={handleClick}>Set Key</button>
        </div>
      </div>
    </>
  )
}

export default Gather
