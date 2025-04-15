const getListURL = (congressNum, APIKey, limit, offset)=>{
	return `https://api.congress.gov/v3/member/congress/${congressNum}?format=json&offset=${offset}&limit=${limit}&api_key=${APIKey}`;
}

const getAllMembers = (congressNum = "", APIKey = "") => {
	let offset = 0, limit = 250;


}