const fs = require('fs');


let APIKey = "",// API key goes here. Get your own from https://api.congress.gov/sign-up/
	congressNum = 119,
	offset = 0,
	limit = 250,
	members = [];

const getRequestString = () => {
	return `https://api.congress.gov/v3/member/congress/${congressNum}?format=json&offset=${offset}&limit=${limit}&currentMember=true&api_key=${APIKey}`;
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
			let strMemberIds = JSON.stringify(members.map((member)=>member.bioguideId));
			fs.writeFile('./data/members-basic.json', strMembers, 'utf8', ()=>{console.log("members-basic.json created")});
			fs.writeFile('./data/member-ids.json', strMemberIds, 'utf8', ()=>{console.log("member-ids.json.json created")});
		}
	});
}

getAllMembers();