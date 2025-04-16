const fs = require('fs');


let APIKey = "",//Get your own API key from https://api.congress.gov/sign-up/
	congressNum = 119,
	offset = 0,
	limit = 250,
	members = [];

const getRequestString = () => {
	return `https://api.congress.gov/v3/member/congress/${congressNum}?format=json&offset=${offset}&limit=${limit}&api_key=${APIKey}`;
}

const getMemberList = () => {
	let request = getRequestString();
	return fetch(request)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}

const getAllMembers = () => {
	console.log('getAllMembers()');

	getMemberList().then((data) => {
		if (data?.members && data.members.length > 0) {
			offset += 250;
			members.push(...data.members);
			console.log("Got some stuff", `${data.members.length} - ${members.length}`);
			if (data.members.length > 0 && offset < 1000) getAllMembers();// No runaways, please.
		} else {
			console.log("-- Ran out of peeps.", members.length);
			let strMembers = JSON.stringify(members);
			let stMemberIds = JSON.stringify(members.map((member)=>member.bioguideId));
			fs.writeFile('./data/members.json', strMembers, 'utf8', ()=>{console.log("members.json created")});
			fs.writeFile('./data/member-ids.json', stMemberIds, 'utf8', ()=>{console.log("members.json created")});
		}
	});
}

getAllMembers();