const fs = require('fs');

const memberIds = JSON.parse(fs.readFileSync('./data/member-ids.json', 'utf8'));
let 	APIKey = "",// API key goes here. Get your own from https://api.congress.gov/sign-up/
		members = [],
		count = 0, 
		countLimit = memberIds.length;


const getMemberById = (bioguideId) => {
	console.log('-- getMemberList()');

	let request = `https://api.congress.gov/v3/member/${bioguideId}?format=json&api_key=${APIKey}`;

	return fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}

const getDetailedMembers = () => {
	console.log('getDetailedMembers()');
	getMemberById(memberIds[count])
		.then((data) => {
			members.push(data.member);
			count ++;
			if (count < countLimit) {
				console.log(`Got the data. members.length = : ${members.length}`);
				getDetailedMembers();
			} else {
				console.log("Reached the limit", {members});
				let strDetailedMembers = JSON.stringify(members);
				fs.writeFile('./data/detailed-members.json', strDetailedMembers, 'utf8', ()=>{console.log("detailed-members.json created")});
			}
		});
}

console.log(`Got the file: ${memberIds.length}`);
getDetailedMembers();