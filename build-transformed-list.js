const fs = require('fs');
const detailedList = JSON.parse(fs.readFileSync('./data/detailed-members.json', 'utf8'));
const basicList = JSON.parse(fs.readFileSync('./data/members-basic.json', 'utf8'));
const senatorsClass1 = JSON.parse(fs.readFileSync('./data/senatorsClass1.json', 'utf8'));
const senatorsClass2 = JSON.parse(fs.readFileSync('./data/senatorsClass2.json', 'utf8'));
const senatorsClass3 = JSON.parse(fs.readFileSync('./data/senatorsClass3.json', 'utf8'));
/*
https://www.senate.gov/senators/Class_I.htm
https://www.senate.gov/senators/Class_II.htm
https://www.senate.gov/senators/Class_III.htm
*/


function getNextEvenYear() {
  const now = new Date();
  let year = now.getFullYear();
  while (year % 2 !== 0) {
    year++;
  }
  return year;
}

const nextEvenYear = getNextEvenYear();

const transformList = () => {
	console.log('transformList()');

	let updatedData = detailedList.map((member)=>{
		let recentTerm = member.terms[member.terms.length-1],
			recentParty = member.partyHistory[member.partyHistory.length-1];

		let basicMember = basicList.find((basic)=>{
			return ( basic.bioguideId.toLowerCase() === basic.bioguideId.toLowerCase() );
		});

		let updatedMember = {
			id: member.bioguideId,
			birthYear: member.birthYear,
			firstName: member.firstName,
			lastName: member.lastName,
			fullName: member.directOrderName,
			lastNameFirst: member.invertedOrderName,
			chamber: recentTerm.chamber,
			type: recentTerm.memberType,
			district: member.district || null,
			partyName: recentParty.partyName,
			partyAbbr: recentParty.partyAbbreviation,
			startYear: recentTerm.startYear,
			reelectionYear: getNextEvenYear(),
			stateName: recentTerm.stateName,
			stateCode: recentTerm.stateCode,
			type: recentTerm.memberType,
			type: recentTerm.memberType,
			phone: member.addressInformation?.phoneNumber,
			imageUrl: member.depiction?.imageUrl || "",
			imageCredit: member.depiction?.attribution || ""
			// basicData: basicMember,
			// detailedData: member
		}

		if (updatedMember.chamber === "Senate") {
			if (senatorsClass1.includes(updatedMember.lastNameFirst)) {
				updatedMember.senateClass = 1;
				updatedMember.reelectionYear = 2030;
			} else if (senatorsClass2.includes(updatedMember.lastNameFirst)) {
				updatedMember.senateClass = 2;
				updatedMember.reelectionYear = 2026;
			} else if (senatorsClass3.includes(updatedMember.lastNameFirst)) {
				updatedMember.senateClass = 3;
				updatedMember.reelectionYear = 2028;
			} else {
				updatedMember.reelectionYear = "MissingYear";
				console.log(`Mismatched name: ${updatedMember.lastNameFirst}`);
			}
		}
		if (!member.birthYear) {
			if (member.bioguideId === 'K000404') updatedMember.birthYear = "1975"
		}

		return updatedMember;

	});


	console.log(`Data transformed: ${updatedData.length}`);
	let strMembers = JSON.stringify(updatedData),
		start = `const memberListData = {\n    members:`,
		end = `\n};\nexport default memberListData;`;

	fs.writeFile('./data/memberListData.js', (start+strMembers+end), 'utf8', ()=>{console.log("memberListData.js created")});


}

transformList();