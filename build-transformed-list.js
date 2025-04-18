const fs = require('fs');
const detailedList = JSON.parse(fs.readFileSync('./data/detailed-members.json', 'utf8'));



const transformList = () => {
	console.log('transformList()');

	let updatedData = detailedList.map((member)=>{
		let recentTerm = member.terms[member.terms.length-1],
			recentParty = member.partyHistory[member.partyHistory.length-1];

		return {
			bioguideId: member.bioguideId,
			birthYear: member.birthYear,
			firstName: member.firstName,
			lastName: member.lastName,
			fullName: member.directOrderName,
			lastNameFirst: member.invertedOrderName,
			chamber: recentTerm.chamber,
			type: recentTerm.memberType,
			district: recentTerm.district,
			startYear: recentTerm.startYear,
			stateName: recentTerm.stateName,
			stateCode: recentTerm.stateCode,
			type: recentTerm.memberType,
			phone: member.addressInformation?.phoneNumber,
			imageUrl: member.depiction?.imageUrl,
			imageLink: member.depiction?.attribution
		}
	});


	console.log(`Data transformed: ${updatedData.length}`);
	let strMembers = JSON.stringify(updatedData),
		start = `const memberListData = {\n    members:`,
		end = `\n};\nexport default memberListData;`;

	fs.writeFile('./data/memberListData.js', (start+strMembers+end), 'utf8', ()=>{console.log("memberListData.js created")});


}

transformList();