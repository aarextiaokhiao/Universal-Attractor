//to cheat
function doubleStars() {
	player.stars=player.stars.times(2)
}

function getAllAchievements() {
	player.achievements=[]
	for (i=1;i<23;i++) {
		player.achievements.push(i)
		if (i<9) {
			player.achievements.push('bonus'+i)
		}
	}
}

function addGoogol() {
	player.stars=player.stars.add(1e100)
}

function googolPP() {
	player.prestigePower=new Decimal(1e100)
}

function freeUpgrades() {
	player.transferUpgrades=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
}

function freeSupernova() {
	if (player.stars.lt(Number.MAX_VALUE)) player.stars=new Decimal(Number.MAX_VALUE)
	reset(3)
}

function doubleNS() {
	player.neutronStars=player.neutronStars.times(2)
}

function freeSNUpgrades() {
	player.supernovaUpgrades=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
}

function respec() {
	player.supernovaUpgrades=[]
}

function unlockAll() {
	player.supernovaTabsUnlocked=4
}

function completeChallenges() {
	for (j=1;j<13;j++) {
		if (player.challengesCompleted[j]==undefined) {
			player.challengesCompleted[j]=1
			player.rewardBoxes[0]+=1
		}
	}
	if (player.autobuyers.interval==undefined) player.autobuyers.interval=3
	if (player.autobuyers.upgrade==undefined) player.autobuyers.upgrade={lastTick:player.playtime,disabled:false}
	updateAutobuyers()
}

function openAllRewardBoxes() {
	while (player.rewardBoxes[0]>0) unlockAutobuyer()
}

function unlockAutobuyerFeatures() {
	if (!player.buyinshopFeatures.includes(5)) {
		player.autobuyers.transfer.tp=new Decimal(1e6)
		updateAutobuyers()
	}
	if (!player.buyinshopFeatures.includes(6)) player.autobuyers.supernova={lastTick:player.playtime,disabled:false,ns:new Decimal(100)}
	player.buyinshopFeatures=[1,2,3,4,5,6]
}

function freeAutobuyerUpgrades() {
	player.autobuyers.interval=0.05
	if (player.autobuyers.gens!=undefined) player.autobuyers.gens.bulk=(player.breakLimit)?262144:256
}

function freeNeutronBoostUpgrades() {
	player.neutronBoosts.basePower=10
	player.neutronBoosts.ppPower=0.15
}