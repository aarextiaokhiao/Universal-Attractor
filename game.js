player={version:0.6008,
	playtime:0,
	lastUpdate:0,
	achievements:[],
	notation:'Standard',
	layout:1,
	stars:new Decimal(10),
	totalStars:new Decimal(10),
	generators:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}],
	prestiges:[0,0,0,0,0],
	prestigePeak:[new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
	highestTierPrestiges:[0,0,0],
	prestigePower:new Decimal(1),
	transferPlaytime:0,
	transferPoints:new Decimal(0),
	transferUpgrades:[],
	supernovaPlaytime:0,
	fastestSupernova:Number.MAX_VALUE,
	neutronStars:new Decimal(0),
	supernovaUpgrades:[],
	supernovaTabsUnlocked:0,
	currentChallenge:0,
	challengesUnlocked:0,
	challengesCompleted:{},
	autobuyers:[],
	neutrons:new Decimal(0),
	neutronTiers:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}],
	aliens:{unlocked:false,
		amount:0,
		interval:1000,
		chance:1},
	quarkStars:new Decimal(0),
	particles:new Decimal(0)}
lastSave=0
achList={names:{1:'Raise the stars!',2:'I wanna to be rich!',3:'Be powerful',4:'Bigger than you think',5:'Upgrade the game',6:'Upgrade completed!',7:'Destructive stars',8:'You totally need it.',9:'Speedrun',10:'Gonna go fast',
11:'Through a stellar mile',12:'Completely nerf',13:'Undead stars',14:'Daredevil',15:'Challenged',
bonus1:'We don\'t need many tiers',bonus2:'There is no 11th tier',bonus3:'Stellar pyramid',bonus4:'CRITICAL SYSTEM ERROR',bonus5:'So close...',bonus6:'That\'s a low tier',bonus7:'You don\'t need them anymore',bonus8:'Upgrades was distracting for me'},
requirements:{1:'Buy 1 T1 generator',2:'Buy 1 T10 generator',3:'Go prestige',4:'Reach 1e100 stars',5:'Go transfer',6:'Buy all transfer upgrades',7:'Go supernova',8:'Restart with 1Mx PP than the previous',9:'Supernova in a hour',10:'Supernova in a minute',
11:'Go supernova 1609 times',12:'Buy all supernova upgrades',13:'Supernova in a second',14:'Complete any challenge',15:'Complete all challenges',
bonus1:'Buy 300 tier 1 generators without buying others',bonus2:'Buy exactly 111 tier 10 generators',bonus3:'Buy most tier 10 generators to least tier 1 generators',bonus4:'Buy exactly 404 tier 10 generators',bonus5:'Transfer between 7990 to 7999 PP',bonus6:'Transfer without last 5 tiers',bonus7:'Supernova without tiers 9 & 10',bonus8:'Supernova without transfering'}}
tupgCosts=[1,2,3,5,10,20,50,100,200,500,1000,3000,5000,7000]
tpGainAchMult=1
maxValueLog=Math.log10(Number.MAX_VALUE)
snupgCosts=[1,100,100,1,1,2,3,5,7,10,15,20,30,50,75,100]
supernovaTabRequirements=[1000,1e6,1e9,1e100]
	
tab='gen'
oldTab=tab
lastTab=tab
SNTab='upgrades'
oldSNTab=SNTab
genTab='tiers'
oldGenTab=genTab
achTab='nonBonus'
oldAchTab=achTab
oldLayout=player.layout

tierCosts=[]
	
function updateElement(elementID,value) {
	document.getElementById(elementID).innerHTML=value
}
	
function updateClass(elementID,value) {
	document.getElementById(elementID).className=value
}
	
function moveElement(elementID,moveTo) {
	document.getElementById(moveTo).appendChild(document.getElementById(elementID))
}
	
function showElement(elementID,style) {
	document.getElementById(elementID).style.display=style
}
	
function hideElement(elementID) {
	document.getElementById(elementID).style.display='none'
}
	
function visibleElement(elementID) {
	document.getElementById(elementID).style.visibility='visible'
}
	
function invisibleElement(elementID) {
	document.getElementById(elementID).style.visibility='hidden'
}

function switchLayout() {
	player.layout=player.layout%2+1
}

function format(number, decimalPoints=0) {
	number = new Decimal(number)
	if (Number.isNaN(number.mantissa)) {
		return 'NaN'
	} else if (number.gte(Infinity)) {
		return 'Infinite'
	} else if (number.e>2&&player.notation=='Standard') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+abbreviation(BigInteger.subtract(label,1))
	} else if (number.e>2&&player.notation=='Letters') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+letter(label)
	} else if (number.e>2&&player.notation=='Scientific') {
		return number.div(Decimal.pow(10,number.e)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+'e'+number.e
	} else if (number.e>2&&player.notation=='Engineering') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+'e'+BigInteger.multiply(label,3)
	} else if (number.e>2&&player.notation=='Logarithm') {
		var precision=Math.pow(10,(decimalPoints>3)?decimalPoints:3)
		if (Math.round(Math.log10(number.mantissa)*precision)/precision==1) return 'e'+BigInteger.add(number.e,1)
		return 'e'+number.e+(Math.round(Math.log10(number.mantissa)*precision)/precision).toString().replace('0','')
	} else if (number.e>2&&player.notation=='Same-Letters') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+sameletter(label)
	} else {
		return number.toFixed(decimalPoints).toString()
	}
}

function formatTime(s) {
	if (s < 1) {
		return Math.floor(s*1000)+' milliseconds'
	} else if (s < 60) {
		return Math.floor(s*100)/100+' seconds'
	} else if (s < 3600) {
		return Math.floor(s/60)+' minutes and '+Math.floor(s%60)+' seconds'
	} else if (s < 86400) {
		return Math.floor(s/3600)+' hours, '+Math.floor(s/60%60)+' minutes, and '+Math.floor(s%60)+' seconds'
	} else if (s < 2629746) {
		return Math.floor(s/86400)+' days, '+Math.floor(s/3600%24)+' hours, '+Math.floor(s/60%60)+' minutes, and '+Math.floor(s%60)+' seconds'
	} else if (s < 31556952) {
		return Math.floor(s/2629746)+' months, '+Math.floor(s%2629746/86400)+' days, '+Math.floor(s%2629746/3600%24)+' hours, '+Math.floor(s%2629746/60%60)+' minutes, and '+Math.floor(s%2629746%60)+' seconds'
	} else if (s < Infinity) {
		return format(Math.floor(s/31556952))+' years, '+Math.floor(s/2629746%12)+' months, '+Math.floor(s%2629746/86400)+' days, '+Math.floor(s%2629746/3600%24)+' hours, '+Math.floor(s%2629746/60%60)+' minutes, and '+Math.floor(s%2629746%60)+' seconds'
	} else {
		return 'Infinite'
	}
}

function abbreviation(label) {
	var haListU = ['','U','D','T','Q','Qi','S','Sp','O','N']
	var haListT = ['','D','V','T','Q','Qi','S','Sp','O','N']
	var haListH = ['','C','Dn','Tn','Qn','Qin','Sn','Spn','On','Nn']
	abb=''
	abbFull=''
	step=0
	
	if (label==0) {
		return 'k'
	}
	if (label==1) {
		return 'M'
	}
	
	do {
		var u = BigInteger.remainder(label,10)
		var t = BigInteger.remainder(BigInteger.divide(label,10),10)
		var h = BigInteger.remainder(BigInteger.divide(label,100),10)
		abb=''
		
		if (u>0 && !(u==1 && t==0 && h==0 && step>0)) {
			if (u==2 && t==0) {
				abb='B'
			} else {
				abb=haListU[u]
			}
		}
		if (t>0) {
			abb=abb+haListT[t]
			if (u==0 && t>1) {
				abb=abb+'g'
			}
		}
		if (h>0) {
			abb=abb+haListH[h]
		}
		if (u>0 || t>0 || h>0) {
			if (abbFull=='') {
				abbFull=abb+abbreviation2(step)+abbFull
			} else {
				abbFull=abb+abbreviation2(step)+'-'+abbFull
			}
		}
		label=BigInteger.divide(label,1000)
		step++
	} while (label>0)
	
	return abbFull
}

function abbreviation2(step) {
	var haListB = ['','MI','MC','NA','PC','FM','AT','ZP','YC','XN','WC','VN','UA']
	var haListS = ['','u','d','t','q','p','x','h','o','n',
	'da','ud','dd','td','qd','pd','xd','hd','od','nd',
	'vg','uc','dv','tc','qv','pc','xc','hc','oc','nc',
	'ta','ut','dt','tt','qt','pt','xt','ht','ot','nt',
	'sa','us','ds','ts','qs','ps','xs','hs','os','ns',
	'pa','up','dp','tp','qp','pp','xp','hp','op','np',
	'xa','ux','dx','tx','qx','px','xx','hx','ox','nx',
	'ha','uh','dh','th','qh','ph','xh','hh','oh','nh',
	'oa','uo','do','to','qo','po','xo','ho','oo','no',
	'na','un','dn','tn','qn','pn','xn','hn','on','nn']
	abb2=haListS[step%100]
	ha=''
	
	if (step==0) {
		return ''
	}
	if (haListB[step]) {
		return haListB[step]
	}
	if (step>99) {
		if (step<200) {
			var ha = 'c'
		} else {
			var ha = haListS[Math.floor(step/100)]
		}
		if (step%100<10) {
			var ha = 'e'+ha
		}
	}
	return abb2+ha
}

function letter(label) {
	var letters='abcdefghijklmnopqrstuvwxyz'
	var result=''
	do {
		var id=BigInteger.remainder(BigInteger.subtract(label,1),26)
		result=letters.slice(id,id+1)+result
		label=BigInteger.divide(BigInteger.subtract(label,1),26)
	} while (label>0)
	return result
}

function sameletter(label) {
	var letters='abcdefghijklmnopqrstuvwxyz'
	var result=''
	var id=BigInteger.remainder(BigInteger.subtract(label,1),26)
	result=letters.slice(id,id+1)
	var length=BigInteger.add(BigInteger.divide(BigInteger.subtract(label,1),26),1)
	if (length>20) {
		result=result+'<sup>'+length+'</sup>'
	} else {
		result=result.repeat(length)
	}
	return result
}

function switchNotation() {
	if (player.notation=='Standard') {
		player.notation='Letters'
	} else if (player.notation=='Letters') {
		player.notation='Scientific'
	} else if (player.notation=='Scientific') {
		player.notation='Engineering'
	} else if (player.notation=='Engineering') {
		player.notation='Logarithm'
	} else if (player.notation=='Logarithm') {
		player.notation='Same-Letters'
	} else {
		player.notation='Standard'
	} 
}

function save() {
	try {
		if (oldDesign) {
			localStorage.setItem('save',btoa(JSON.stringify(player)))
		} else {
			localStorage.setItem('save2',btoa(JSON.stringify(player)))
		}
		console.log('Game saved!')
		lastSave=new Date().getTime()/1000
	
		var saveNotice=document.getElementById('saveNotice')
		saveNotice.style.opacity=1
		
		if (snHide) clearTimeout(snHide)
		var snHide=setTimeout(function(){saveNotice.style.opacity=0;},6000)
	} catch (e) {
		console.log('Well, we tried.')
	}
}

function load(save) {
	try {
		var savefile=JSON.parse(atob(save))
		
		if (savefile.playTime) {
			savefile.playtime=savefile.playTime
			delete savefile.playTime
		}
		if (!savefile.playtime) savefile.playtime=0
		if (!savefile.achievements) savefile.achievements=[]
		if (savefile.scientific!=undefined) {
			savefile.notation=(savefile.scientific)?'Scientific':'Standard'
			delete savefile.scientific	
		}
		if (!savefile.notation) savefile.notation='Standard'
		if (!savefile.stars) savefile.stars=10
		if (!savefile.totalStars) savefile.totalStars=savefile.stars
		if (!savefile.prestigePower) savefile.prestigePower=1
		if (!savefile.transferPlaytime) savefile.transferPlaytime=savefile.playtime
		if (!savefile.transferPoints) savefile.transferPoints=0
		if (savefile.version == undefined) {
			savefile.prestigePeak[2]=0
			savefile.highestTierTransfer=0
			savefile.neutronStars=0
			savefile.supernovaPlaytime=savefile.playtime
			savefile.fastestSupernova=Number.MAX_VALUE
			savefile.lastTransferPlaytime=0
			savefile.supernovaUpgrades=[]
			savefile.supernovaTabsUnlocked=0
			savefile.version=0.6
		}
		if (savefile.version<0.6001) {
			savefile.challengesUnlocked=0
			savefile.challengesCompleted=[]
			savefile.autobuyers=[]
			savefile.neutrons=new Decimal(0)
			savefile.neutronTiers={t1:{amount:new Decimal(0),bought:0},
			t2:{amount:new Decimal(0),bought:0},
			t3:{amount:new Decimal(0),bought:0},
			t4:{amount:new Decimal(0),bought:0},
			t5:{amount:new Decimal(0),bought:0},
			t6:{amount:new Decimal(0),bought:0},
			t7:{amount:new Decimal(0),bought:0},
			t8:{amount:new Decimal(0),bought:0},
			t9:{amount:new Decimal(0),bought:0},
			t10:0}
		}
		if (savefile.version<0.6002) {
			savefile.currentChallenge=0
		}
		if (savefile.version<0.6003) {
			savefile.prestiges[3]=0
			savefile.prestiges[4]=0
			savefile.prestigePeak[3]=0
			savefile.prestigePeak[4]=0
			savefile.quarkStars=0
			savefile.particles=0
		}
		if (savefile.version<0.6004) {
			savefile.stars=savefile.points
			var temp = []
			for (i=1;i<10;i++) {
				temp.push(savefile.generators['t'+i])
			}
			temp.push({amount:savefile.generators.t10,bought:savefile.generators.t10})
			savefile.generators=temp
			
			delete savefile.points
		}
		if (savefile.version<0.6005) {
			savefile.playtime=savefile.playtime/1000
			savefile.totalStars=savefile.totalPoints
			savefile.transferPlaytime=savefile.transferPlaytime/1000
			savefile.transferPoints=savefile.prestigePoints
			savefile.transferUpgrades=savefile.prestigeUpgrades
			savefile.layout=1
			
			delete savefile.totalPoints
			delete savefile.prestigePoints
			delete savefile.prestigeUpgrades
		}
		if (savefile.version<0.6006) {
			savefile.supernovaPlaytime=savefile.supernovaPlaytime/1000
			savefile.fastestSupernova=savefile.fastestSupernova/1000
			
			var temp = []
			for (i=1;i<10;i++) {
				temp.push(savefile.neutronTiers['t'+i])
			}
			temp.push({amount:savefile.neutronTiers.t10,bought:savefile.neutronTiers.t10})
			savefile.neutronTiers=temp
			
			savefile.aliens={unlocked:false,amount:0,interval:0,chance:0}
		}
		if (savefile.version<0.6007) {
			var newAchievements=[]
			for (i in savefile.achievements) {
				if (savefile.achievements[i]==12) {
					newAchievements.push(13)
				} else if (savefile.achievements[i]==13) {
					newAchievements.push(12)
				} else {
					newAchievements.push(savefile.achievements[i])
				}
			}
			savefile.achievements=newAchievements
			savefile.highestTierPrestiges=[0,savefile.highestTransferTier,0]
			
			delete savefile.highestTransferTier
		}
		if (savefile.version<0.6008) {
			var oldCC=savefile.challengesCompleted
			savefile.challengesCompleted={}
			for (i in oldCC) {
				if (oldCC[Number(i)]!=undefined) {
					if (oldCC[Number(i)]>0) savefile.challengesCompleted[Number(i)]=oldCC[Number(i)]
				}
			}
		}
		
		savefile.stars=new Decimal(savefile.stars)
		savefile.totalStars=new Decimal(savefile.totalStars)
		for (i=0;i<10;i++) {
			savefile.generators[i].amount=new Decimal(savefile.generators[i].amount)
			savefile.neutronTiers[i].amount=new Decimal(savefile.neutronTiers[i].amount)
		}
		for (i=0;i<savefile.prestigePeak.length;i++) {
			savefile.prestigePeak[i]=new Decimal(savefile.prestigePeak[i])
		}
		savefile.prestigePower=new Decimal(savefile.prestigePower)
		savefile.transferPoints=new Decimal(savefile.transferPoints)
		savefile.neutronStars=new Decimal(savefile.neutronStars)
		savefile.quarkStars=new Decimal(savefile.quarkStars)
		savefile.particles=new Decimal(savefile.particles)
		
		savefile.version=player.version
		player=savefile
		console.log('Game loaded!')
		updateCosts()
		updateTPGainAchMult()
		return false //return false if loads
	} catch (e) {
		console.log('Your save failed to load:\n'+e)
		return true //return true if there is a error
	}
}

function exportSave() {
	var savefile=btoa(JSON.stringify(player))
	showElement('exportSave','block')
	document.getElementById("exportText").value=btoa(JSON.stringify(player))
}

function importSave() {
	var input=prompt('Copy and paste in your exported file and press enter.')
	if (load(input)) {
		if (input!=null) {
			alert('Your save was invalid or caused a game-breaking bug. :(')
		}
	}
}

function reset(tier) {
	if (tier==Infinity?confirm('Are you sure to reset your game? You will lose everything you have!'):true) {
		if (tier==Infinity) {
			// Highest tier - reset
			player.playtime=0
			player.lastUpdate=0
			player.layout=1
			player.achievements=[]
			player.notation='Standard'
			player.totalStars=new Decimal(0)
			player.prestigePeak=[new Decimal(1),new Decimal(0),new Decimal(0)]
			localStorage.clear('save2')
		}
		if (tier>3) {
			//Tier 4 - Hypernova
			SNTab='upgrades'
			if (achTab=='bonus') {
				achTab='nonBonus'
			}
			if (genTab=='neutronTiers') {
				genTab='tiers'
			}
			if (tab=='supernova') {
				tab='gen'
			}
		}
		if (tier>2) {
			//Tier 3 - Supernova
			if (tab=='toomuch') {
				tab=lastTab
			}
			if (tab=='transfer'&&!player.supernovaUpgrades.includes(3)) {
				tab='gen'
			}
			player.lastTransferPlaytime=player.transferPlaytime
			player.prestiges[2]=(tier==3)?player.prestiges[2]+1:0
			if (tier==3&&player.highestTierPrestiges[1]<9) getBonusAch(7)
			player.highestTierPrestiges[2]=0
			player.fastestSupernova=(tier==Infinity)?Number.MAX_VALUE:(player.fastestSupernova>player.supernovaPlaytime)?player.supernovaPlaytime:player.fastestSupernova
			player.supernovaPlaytime=0
			player.neutronStars=(tier==3)?player.neutronStars.add(getPostPrestigePoints(3)):new Decimal(0)
			player.supernovaUpgrades=(tier==3)?player.supernovaUpgrades:[]
			player.supernovaTabsUnlocked=(tier==3)?player.supernovaTabsUnlocked:0
			if (tier==3&&player.currentChallenge>0) {
				if (player.challengesCompleted[player.currentChallenge]==undefined) {
					player.challengesCompleted[player.currentChallenge]=1
				} else {
					player.challengesCompleted[player.currentChallenge]++
				}
			}
			player.currentChallenge=0
			player.challengesUnlocked=(tier==3)?player.challengesUnlocked:0
			player.challengesCompleted=(tier==3)?player.challengesCompleted:{}
			player.autobuyers=(tier==3)?player.autobuyers:[]
			player.neutrons=new Decimal(0)
			player.neutronTiers=[{amount:(tier==3)?new Decimal(player.neutronTiers[0].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[0].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[1].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[1].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[2].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[2].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[3].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[3].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[4].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[4].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[5].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[5].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[6].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[6].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[7].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[7].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[8].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[8].bought:0},
			{amount:(tier==3)?new Decimal(player.neutronTiers[9].bought):new Decimal(0),bought:(tier==3)?player.neutronTiers[9].bought:0}],
			player.aliens={unlocked:(tier==3)?player.aliens.unlocked:false,
				amount:(tier==3)?((player.aliens.unlocked)?1:0):0,
				interval:(tier==3)?player.aliens.interval:1000,
				chance:(tier==3)?player.aliens.chance:1}
			player.prestigePeak[2]=(tier==Infinity)?new Decimal(0):(player.neutronStars.gt(player.prestigePeak[2]))?player.neutronStars:player.prestigePeak[2]
			if (tier==3) getAch(7)
			if (player.fastestSupernova<3600) getAch(9)
			if (player.fastestSupernova<60) getAch(10)
			if (player.prestiges[2]>1608) getAch(11)
			if (player.fastestSupernova<1) getAch(13)
			var acc=amountChallengeCompleted()
			if (acc>0) getAch(14)
			if (acc>12) getAch(15)
			if (tier==3&&player.prestiges[1]==0) getBonusAch(8)
		}
		if (tier>1) {
			//Tier 2 - transfer
			player.prestiges[1]=(tier==2)?player.prestiges[1]+1:0
			if (tier==2&&player.highestTierPrestiges[1]<6) getBonusAch(6)
			player.highestTierPrestiges[1]=0
			player.transferPlaytime=0
			player.transferPoints=(tier==2)?player.transferPoints.add(getTransferPoints()):(player.supernovaUpgrades.includes(2)&&player.currentChallenge==0)?player.neutronStars:new Decimal(0)
			player.transferUpgrades=(tier==2)?player.transferUpgrades:[]
			player.prestigePeak[1]=(tier==Infinity)?new Decimal(0):(player.transferPoints.gt(player.prestigePeak[1]))?player.transferPoints:player.prestigePeak[1]
			if (tier==2) getAch(5)
			if (tier==2&&player.prestigePower.gt(7989)&&player.prestigePower.lt(8000)) getBonusAch(5)
		}
		//Tier 1 - prestige
		player.prestiges[0]=(tier==1)?player.prestiges[0]+1:0
		player.highestTierPrestiges[0]=0
		if (tier==1&&getPrestigePower().div(player.prestigePower).gte(1e6)) getAch(8)
		player.prestigePower=(tier==1)?getPrestigePower():(player.supernovaUpgrades.includes(3)&&player.currentChallenge==0)?player.neutronStars.add(1).pow(3):new Decimal(1)
		player.prestigePeak[0]=(tier==Infinity)?new Decimal(1):(player.prestigePower.gt(player.prestigePeak[0]))?player.prestigePower:player.prestigePeak[0]
		if (tier==1) getAch(3)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		updateCosts()
	}
}

function getAch(achId) {
	if (!player.achievements.includes(achId)) {
		player.achievements.push(achId)
	
		var achBox=document.getElementById('achievement')
		var requirement=(achId==4)?'Reach '+format(1e100)+' stars':achList.requirements[achId]
		achBox.innerHTML='<b>Achievement unlocked!</b><br>'+achList.names[achId]+'<br>'+achList.requirements[achId]
		achBox.style.opacity=1
		
		if (achHide) clearTimeout(achHide)
		var achHide=setTimeout(function(){achBox.style.opacity=0;},6000)
	}
}

function getBonusAch(achId) {
	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		getAch('bonus'+achId)
		updateTPGainAchMult()
	}
}
	
function switchTab(tabName) {
	tab=tabName
}
	
function getCost(tier,bulk=1) {
	var multiplier=getCostMultiplier(tier)
	return Decimal.pow(multiplier,bulk).sub(1).div(multiplier-1).times(tierCosts[tier-1])
}
	
function updateCosts() {
	for (i=1;i<11;i++) {
		var multiplier=getCostMultiplier(i)
		var cost=Decimal.pow(10,(player.currentChallenge==4&&i>1)?1:i*(0.9+0.1*i)).times(Decimal.pow(multiplier,player.generators[i-1].bought)).div(Decimal.pow(multiplier,(player.supernovaUpgrades.includes(11)&&player.currentChallenge==0)?player.prestigePower.log10()/15:0))
		tierCosts[i-1]=cost
	}
}

function getCostMultiplier(tier) {
	return Math.pow((player.currentChallenge==2)?2:1.5,(player.currentChallenge==4&&tier>1)?1.3:(tier*(0.9+0.1*tier)-((tier==10&&player.transferUpgrades.includes(8))?0.3:0)))
}

function isWorthIt(tier) {
	var cost=tierCosts[tier-1]
	if (player.currentChallenge==4&&tier>1) return player.generators[tier-2].amount.gte(cost)
	return player.stars.gte(cost)
}
	
function buyGen(tier,bulk=1) {
	var multiplier=getCostMultiplier(tier)
	var resource=(player.currentChallenge==4&&tier>1)?player.generators[tier-2].amount:player.stars
	var maxBulk=Math.floor(resource.div(tierCosts[tier-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
	if (bulk>maxBulk) {
		bulk=maxBulk
	}
	if (bulk>0&&tier>player.highestTierPrestiges[0]) {
		player.highestTierPrestiges[0]=tier
	}
	if (bulk>0&&tier>player.highestTierPrestiges[1]) {
		player.highestTierPrestiges[1]=tier
	}
	if (bulk>0&&tier>player.highestTierPrestiges[2]) {
		player.highestTierPrestiges[2]=tier
	}
	
	var spentAmount=getCost(tier,bulk)
	if (player.currentChallenge==4&&tier>1) {
		player.generators[tier-2].amount=player.generators[tier-2].amount.sub(spentAmount)
	} else {
		player.stars=player.stars.sub(spentAmount)
	}
	player.generators[tier-1].bought+=bulk
	player.generators[tier-1].amount=player.generators[tier-1].amount.add(bulk)
	updateCosts()
	
	if (tier==1&&bulk>0) getAch(1)
	if (tier==10&&bulk>0) getAch(2)
	if (player.generators[0].bought==300&&player.generators[1].bought==player.generators[1].bought==player.generators[2].bought==player.generators[3].bought==player.generators[4].bought==player.generators[5].bought==player.generators[6].bought==player.generators[8].bought==player.generators[9].bought==0) getBonusAch(1)
	if (player.generators[9].bought==111) getBonusAch(2)
	if (player.generators[9].bought>player.generators[8].bought>player.generators[7].bought>player.generators[6].bought>player.generators[5].bought>player.generators[4].bought>player.generators[3].bought>player.generators[2].bought>player.generators[1].bought>player.generators[0].bought) getBonusAch(3)
	if (player.generators[9].bought==404) getBonusAch(4)
	
	if (bulk>0&&player.currentChallenge==7) {
		for (j=0;j<tier-1;j++) {
			player.generators[j].amount=new Decimal(0)
		}
	}
}
	
function maxAll() {
	var buyTiers=[]
	for (i=1;i<((player.currentChallenge==3)?10:11);i++) {
		if (isWorthIt(i)) {
			buyTiers.push(i)
		}
	}
	for (j=buyTiers.length;j>0;j--) {
		var tierNum=buyTiers[j-1]
		var multiplier=getCostMultiplier(tierNum)
		var resource=(player.currentChallenge==4&&tierNum>1)?player.generators[tierNum-2].amount:player.stars
		var bulk=Math.floor(resource.div((player.currentChallenge==4)?1:j).div(tierCosts[tierNum-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
		if (bulk>0&&tierNum>player.highestTierPrestiges[0]) {
			player.highestTierPrestiges[0]=tierNum
		}
		if (bulk>0&&tierNum>player.highestTierPrestiges[1]) {
			player.highestTierPrestiges[1]=tierNum
		}
		if (bulk>0&&tierNum>player.highestTierPrestiges[2]) {
			player.highestTierPrestiges[2]=tierNum
		}
		
		var spentAmount=getCost(tierNum,bulk)
		if (player.currentChallenge==4&&tierNum>1) {
			player.generators[tierNum-2].amount=player.generators[tierNum-2].amount.sub(spentAmount)
		} else {
			player.stars=player.stars.sub(spentAmount)
		}
		player.generators[tierNum-1].bought+=bulk
		player.generators[tierNum-1].amount=player.generators[tierNum-1].amount.add(bulk)
	
		if (tierNum==1&&bulk>0) getAch(1)
		if (tierNum==10&&bulk>0) getAch(2)
		if (player.generators[0].bought==300&&player.generators[1].bought==player.generators[1].bought==player.generators[2].bought==player.generators[3].bought==player.generators[4].bought==player.generators[5].bought==player.generators[6].bought==player.generators[8].bought==player.generators[9].bought==0) getBonusAch(1)
		if (player.generators[9].bought==111) getBonusAch(2)
		if (player.generators[9].bought>player.generators[8].bought>player.generators[7].bought>player.generators[6].bought>player.generators[5].bought>player.generators[4].bought>player.generators[3].bought>player.generators[2].bought>player.generators[1].bought>player.generators[0].bought) getBonusAch(3)
		if (player.generators[9].bought==404) getBonusAch(4)
	
		if (bulk>0&&player.currentChallenge==7) {
			for (k=0;k<j-1;k++) {
				player.generators[k].amount=new Decimal(0)
			}
		}
	}
	updateCosts()
}
	
function getGeneratorMultiplier(tier) {
	var multi=Decimal.pow((tier==9&&player.supernovaUpgrades.includes(9))?1.11:(tier==9&&player.transferUpgrades.includes(10))?1.1:(player.currentChallenge==1)?1.03:(player.transferUpgrades.includes(7))?1.05:1.04,player.generators[tier].bought)
	multi=multi.times(player.prestigePower)
	if (player.transferUpgrades.includes(1)&&player.generators[tier].amount.gte(10)) multi=multi.times(Decimal.pow(1.04,player.generators[tier].amount.log10()*((player.currentChallenge==6)?0.9:1)))
	if (player.transferUpgrades.includes(2)) multi=multi.times(getUpgradeMultiplier('tupg2'))
	if (player.transferUpgrades.includes(3)) multi=multi.times(getUpgradeMultiplier('tupg3'))
	if (player.transferUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('tupg4'))
	if (player.transferUpgrades.includes(5)) multi=multi.times(getUpgradeMultiplier('tupg5'))
	if (player.transferUpgrades.includes(12)) multi=multi.times(Math.pow(5,(player.currentChallenge==6)?0.9:1))
		
	if (player.supernovaUpgrades.includes(1)) multi=multi.times(getUpgradeMultiplier('snupg1'))
	if (player.supernovaUpgrades.includes(4)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg4'))
	if (player.supernovaUpgrades.includes(5)) multi=multi.times(Math.max(90/(player.supernovaPlaytime+60),1))
	if (player.supernovaUpgrades.includes(10)) multi=multi.times(getUpgradeMultiplier('snupg10'))
	if (player.supernovaUpgrades.includes(12)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg12'))
	if (player.supernovaUpgrades.includes(13)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg13'))
	if (player.supernovaUpgrades.includes(14)&&player.currentChallenge==0) multi=multi.times(100)
	if (player.supernovaUpgrades.includes(15)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg15'))
	if (player.supernovaUpgrades.includes(16)&&tier==0) multi=multi.times(Decimal.pow(1.4,player.generators[9].amount))
		
	if (player.currentChallenge==5&&tier==0) {
		for (j=1;j<10;j++) {
			multi=multi.times(getGeneratorMultiplier(j).times(player.generators[j].bought+1))
		}
	}
		
	return multi
}

function getPrestigePower() {
	multi=player.stars.div('1e40').pow(0.05).times(3.55655882)
	if (player.transferUpgrades.includes(6)) multi=multi.times(Math.pow(multi.log10(),(player.currentChallenge==6)?0.45:0.5))
	if (player.transferUpgrades.includes(9)) multi=multi.times(Math.pow(2,(player.currentChallenge==6)?0.9:1))
	if (player.transferUpgrades.includes(11)) multi=multi.times(Math.pow(1+1/(1+player.transferPlaytime/600),(player.currentChallenge==6)?0.9:1))
	if (player.transferUpgrades.includes(14)) multi=multi.times(player.transferPoints.add(1).pow((player.currentChallenge==6)?0.09:0.1))

	if (player.supernovaUpgrades.includes(6)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg6'))
	if (player.supernovaUpgrades.includes(8)&&player.currentChallenge==0) multi=multi.times(3)
		
	return multi
}

function getTransferPoints() {
	multi=player.prestigePower.div(1000).cbrt().floor()
	if (player.transferUpgrades.includes(13)) multi=multi.times(Math.pow(3,(player.currentChallenge==6)?0.9:1))

	if (tpGainAchMult>1) multi=multi.times(tpGainAchMult)
	if (player.supernovaUpgrades.includes(7)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg7'))
		
	return multi
}

function buyTransferUpgrade(num) {
	if (player.transferPoints.gte(tupgCosts[num-1])&&!player.transferUpgrades.includes(num)&&(num<13||player.transferUpgrades.length>11)) {
		player.transferPoints=player.transferPoints.sub(tupgCosts[num-1])
		player.transferUpgrades.push(num)
		if (num==8) updateCosts()
		if (player.transferUpgrades.length==14) getAch(6)
	}
}

function getUpgradeMultiplier(name) {
	if (name=='tupg2') return Decimal.pow(1+player.playtime/18000,(player.currentChallenge==6)?0.45:0.5)
	if (name=='tupg3') return Decimal.pow(1+player.transferPlaytime/3600,(player.currentChallenge==6)?0.45:0.5)
	if (name=='tupg4') return Math.pow(player.prestigePeak[0].log10(),(player.currentChallenge==6)?0.9:1)
	if (name=='tupg5') return Math.pow(player.prestigePeak[1].log10(),(player.currentChallenge==6)?1.8:2)
		
	if (name=='snupg1') return Math.sqrt(1+(player.generators[0].bought+player.generators[1].bought+player.generators[2].bought+player.generators[3].bought+player.generators[4].bought+player.generators[5].bought+player.generators[6].bought+player.generators[7].bought+player.generators[8].bought+player.generators[9].bought)/4247*99)
	if (name=='snupg4') return Math.pow(player.totalStars.log10(),0.40178235)
	if (name=='snupg6') return Decimal.pow(player.prestiges[2],2/3)
	if (name=='snupg7') return Decimal.pow(player.neutronStars.add(1),0.666570219)
	if (name=='snupg10') return Math.pow(1+player.transferUpgrades.length,1.70054831)
	if (name=='snupg12') return Math.pow(1+49995/player.fastestSupernova,0.5)
	if (name=='snupg13') return Math.pow(1+149985/player.lastTransferPlaytime,0.5)
	if (name=='snupg15') return Math.pow(1+player.achievements.length,1.48984372)
}

function getPostPrestigePoints(tier) {
	var pointsList = [player.stars,player.neutronStars,player.quarkStars]
	var log = pointsList[tier-3].log10()
	var base = new Decimal(1)
	var progressTillMax = (log-maxValueLog)/(maxValueLog)
	return base.pow(Math.max(1-progressTillMax,0)).times(Decimal.pow(10,log/maxValueLog*Math.min(progressTillMax,1)))
}
	
function switchSNTab(tabName) {
	SNTab=tabName
}
	
function switchAchTab(tabName) {
	achTab=tabName
}
	
function switchGenTab(tabName) {
	genTab=tabName
}

function updateTPGainAchMult() {
	tpGainAchMult=1
	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		for (i=0;i<player.achievements.length;i++) {
			var achid=player.achievements[i].toString()
			if (achid.search('bonus')>-1) {
				tpGainAchMult*=5
			}
		}
	}
}

function buySupernovaUpgrade(num) {
	if (player.neutronStars.gte(snupgCosts[num-1])&&!player.supernovaUpgrades.includes(num)) {
		player.neutronStars=player.neutronStars.sub(snupgCosts[num-1])
		player.supernovaUpgrades.push(num)
		if (num==2||player.transferPoints.lt(player.neutronStars)) player.transferPoints=player.neutronStars
		if (num==3||player.prestigePower.lt(player.neutronStars.pow(3))) player.prestigePower=player.neutronStars.add(1).pow(3)
		if (player.supernovaUpgrades.length>15) getAch(12)
	}
}

function startChall(challId) {
	if ((player.currentChallenge==challId)?false:(challId>0)?confirm('You have to go supernova with special conditions before getting a reward. Some upgrades will be no longer working till the challenge ends.'):true) {
		//Tier 3 - Supernova
		player.lastTransferPlaytime=player.transferPlaytime
		player.highestTierPrestiges[2]=0
		player.supernovaPlaytime=0
		player.currentChallenge=challId
		player.neutrons=new Decimal(0)
		player.neutronTiers=[{amount:new Decimal(player.neutronTiers[0].bought),bought:player.neutronTiers[0].bought},
		{amount:new Decimal(player.neutronTiers[1].bought),bought:player.neutronTiers[1].bought},
		{amount:new Decimal(player.neutronTiers[2].bought),bought:player.neutronTiers[2].bought},
		{amount:new Decimal(player.neutronTiers[3].bought),bought:player.neutronTiers[3].bought},
		{amount:new Decimal(player.neutronTiers[4].bought),bought:player.neutronTiers[4].bought},
		{amount:new Decimal(player.neutronTiers[5].bought),bought:player.neutronTiers[5].bought},
		{amount:new Decimal(player.neutronTiers[6].bought),bought:player.neutronTiers[6].bought},
		{amount:new Decimal(player.neutronTiers[7].bought),bought:player.neutronTiers[7].bought},
		{amount:new Decimal(player.neutronTiers[8].bought),bought:player.neutronTiers[8].bought},
		{amount:new Decimal(player.neutronTiers[9].bought),bought:player.neutronTiers[9].bought}],
		player.aliens={unlocked:player.aliens.unlocked,
			amount:(player.aliens.unlocked)?1:0,
			interval:player.aliens.interval,
			chance:player.aliens.chance}
				
		//Tier 2 - transfer
		player.prestiges[1]=0
		player.highestTierPrestiges[1]=0
		player.transferPlaytime=0
		player.transferPoints=(challId==0&&player.supernovaUpgrades.includes(2))?player.neutronStars:new Decimal(0)
		player.transferUpgrades=[]

		//Tier 1 - prestige
		player.prestiges[0]=0
		player.highestTierPrestiges[0]=0
		player.prestigePower=(challId==0&&player.supernovaUpgrades.includes(3))?player.neutronStars.add(1).pow(3):new Decimal(1)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		updateCosts()
		tab='gen'
	}
}

function losereset() {
	player.prestigePower=player.prestigePower.div(2).max(1)
	
	player.stars=new Decimal(10)
	player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
	
	updateCosts()
}

function amountChallengeCompleted() {
	var amount=0
	for (i in player.challengesCompleted) {
		amount++
	}
	return amount
}

//to cheat
function doubleStars() {
	player.stars=player.stars.times(2)
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

function respec() {
	player.supernovaUpgrades=[]
}

function unlockAll() {
	player.supernovaTabsUnlocked=4
}

function breakLimit() {
	player.neutronTiers[0].bought=(player.neutronTiers[0].bought+1)%2
	if (player.stars.gt(Number.MAX_VALUE)) reset(3)
}

function gameTick() {
	var currentTime = new Date().getTime()
	if (player.lastUpdate>0) {
		if (currentTime/1000-lastSave>=60) {
			save()
		}
		
		var diff=(currentTime-player.lastUpdate)/1000
		player.playtime+=diff
		player.transferPlaytime+=diff
		player.supernovaPlaytime+=diff
		for (i=0;i<10;i++) {
			var addAmount=player.generators[i].amount.times(getGeneratorMultiplier(i)).times(diff)
			if (i==0) {
				player.stars=player.stars.add(addAmount)
				player.totalStars=player.totalStars.add(addAmount)
			} else if (player.currentChallenge!=5) {
				player.generators[i-1].amount=player.generators[i-1].amount.add(addAmount)
			}
		}
		
		if (player.stars.gte(1e100)) getAch(4)
		if (player.stars.gte(Number.MAX_VALUE)&&(player.neutronTiers[0].bought==0||player.currentChallenge>0)) {
			player.stars=new Decimal(Number.MAX_VALUE)
			player.generators[0].amount=new Decimal(0)
			if (player.supernovaPlaytime>60) {
				if (tab!='toomuch') {
					lastTab=tab
				}
				tab='toomuch'
			} else {
				reset(3)
			}
		}
		
		if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
			while (supernovaTabRequirements.length>player.supernovaTabsUnlocked && player.neutronStars.gte(supernovaTabRequirements[player.supernovaTabsUnlocked])) {
				player.supernovaTabsUnlocked++
			}
		}
	}
	player.lastUpdate=currentTime
	
	updateElement('stars',format(player.stars))
	updateElement('sPS',format(player.generators[0].amount.times(getGeneratorMultiplier(0))))
	if (player.prestiges[1]>0||player.transferPoints.gt(0)) {
		showElement('transferTabButton','inline-block')
	} else {
		hideElement('transferTabButton')
	}
	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		showElement('supernovaTabButton','inline-block')
		if (player.supernovaTabsUnlocked==supernovaTabRequirements.length) {
			hideElement('requirement')
		} else {
			showElement('requirement','inline-block')
			moveElement('requirement',(player.supernovaTabsUnlocked==2)?'genTabs':'supernovaTabs')
			updateElement('requirement','Next at '+format(supernovaTabRequirements[player.supernovaTabsUnlocked])+' NS')
		}
		for (i=1;i<=supernovaTabRequirements.length;i++) {
			if (player.supernovaTabsUnlocked>=i) {
				showElement('supernovaLockedTab'+i,'inline-block')
			} else {
				hideElement('supernovaLockedTab'+i)
			}
		}
		if (player.supernovaTabsUnlocked>0) {
			showElement('autobuyerTab','inline-block')
		} else {
			hideElement('autobuyerTab')
		}
	} else {
		hideElement('supernovaTabButton')
	}
	
	if (tab!=oldTab) {
		showElement('tab'+tab,'block')
		hideElement('tab'+oldTab)
		oldTab=tab
	}
	if (player.layout!=oldLayout) {
		showElement('layout'+player.layout,'table')
		hideElement('layout'+oldLayout)
		oldLayout=player.layout
	}
	if (tab=='toomuch') {
		hideElement('tabs')
	} else {
		showElement('tabs','block')
	}
	
	if (tab=='gen') {
		if (player.supernovaTabsUnlocked>1) {
			showElement('genTabs','block')
		} else {
			hideElement('genTabs')
		}
		
		if (genTab!=oldGenTab) {
			showElement('gen'+genTab,'block')
			hideElement('gen'+oldGenTab)
			oldGenTab=genTab
		}
		if (genTab=='tiers') {
			var highestTierGot=0
			for (i=0;i<9;i++) {
				if (player.generators[i].amount.gt(0) || player.generators[i].bought>0) {
					highestTierGot=i+1
				}
			}
			for (i=0;i<10;i++) {
				if (!oldDesign) {
					if (i>0&&player.layout==1) {
						if (highestTierGot>=i&&(i<9||player.currentChallenge!=3)) {
							showElement('t'+(i+1)+'GenRow','table-row')
						} else {
							hideElement('t'+(i+1)+'GenRow')
						}
					}
					if (i>0&&player.layout==2) {
						if (highestTierGot>=i&&(i<9||player.currentChallenge!=3)) {
							visibleElement('t'+(i+1)+'GenCell')
						} else {
							invisibleElement('t'+(i+1)+'GenCell')
						}
					}
				}
				var name='t'+(i+1)+'Gen'+((player.layout==2&&!oldDesign)?'2':'')
				if (player.generators[i].amount.eq(player.generators[i].bought)) {
					updateElement(name,'<b>Tier '+(i+1)+' generator</b><br>'+format(player.generators[i].bought)+((oldDesign)?'<br>Cost: '+format(tierCosts[i]):''))
				} else {
					updateElement(name,'<b>Tier '+(i+1)+' generator</b><br>'+format(player.generators[i].amount)+', '+format(player.generators[i].bought)+' bought'+((oldDesign)?'<br>Cost: '+format(tierCosts[i]):''))
				}
				if (!oldDesign) {
					var name='t'+(i+1)+'GenButton'+((player.layout==2)?'2':'')
					updateElement(name,'Cost: '+format(tierCosts[i]))
				}
				if (isWorthIt(i+1)) {
					if (oldDesign) {
						updateClass(name,'shopButton')
					} else {
						updateClass(name,'longButton')
					}
				} else {
					updateClass(name,'shopUnafford')
				}
			}
			if (player.prestigePower.gt(1)) {
				showElement('prestigePower','block')
				updateElement('prestigePower','<b>x'+format(player.prestigePower,3)+'</b> for all production')
			} else {
				hideElement('prestigePower')
			}
			if (player.stars.gte('1e40')&&player.prestigePower.lt(getPrestigePower())) {
				if (oldDesign) {
					showElement('prestige1','inline')
				} else {
					showElement('prestige1','table-cell')
				}
				updateElement('prestige1','Reset this game and get the boost.<br>x'+format(getPrestigePower(),3)+' production')
				hideElement('losereset')
			} else {
				hideElement('prestige1')
				if (false) {
					if (oldDesign) {
						showElement('losereset','inline')
					} else {
						showElement('losereset','table-cell')
					}
				} else {
					hideElement('losereset')
				}
			}
			if (player.prestigePower.gte(1000)) {
				if (oldDesign) {
					showElement('prestige2','inline')
				} else {
					showElement('prestige2','table-cell')
				}
				updateElement('prestige2','Transfer your power and upgrade this game.<br>+'+format(getTransferPoints())+' TP')
			} else {
				hideElement('prestige2')
			}
			if (player.stars.gte(Number.MAX_VALUE)) {
				if (oldDesign) {
					showElement('prestige3bl','inline')
				} else {
					showElement('prestige3bl','table-cell')
				}
				updateElement('prestige3bl','Explode your stars and get undead stars.<br>+'+format(getPostPrestigePoints(3))+' NS')
			} else {
				hideElement('prestige3bl')
			}
		}
	}
	if (tab=='stats') {
		updateElement('statsPlaytime','You have played for '+formatTime(player.playtime)+'.')
		updateElement('statsFPS','You are running this game in '+format(1000/tickspeed)+' FPS.')
		updateElement('statsTotal','You have gained '+format(player.totalStars)+' stars in total.')
		if (player.prestiges[0]>0) {
			showElement('statsPrestige','block')
			updateElement('statsPrestige','You have prestige '+format(player.prestiges[0])+' times.')
		} else {
			hideElement('statsPrestige')
		}
		if (player.prestiges[1]>0) {
			showElement('statsTransfer','block')
			showElement('statsTransferTime','block')
			updateElement('statsTransfer','You have transferred '+format(player.prestiges[1])+' times.')
			updateElement('statsTransferTime','Your time in this transfer is '+formatTime(player.transferPlaytime)+'.')
		} else {
			hideElement('statsTransfer')
			hideElement('statsTransferTime')
		}
		if (player.prestiges[2]>0) {
			showElement('statsSupernova','block')
			showElement('statsSupernovaTime','block')
			updateElement('statsSupernova','You have supernova '+format(player.prestiges[2])+' times.')
			updateElement('statsSupernovaTime','Your time in this supernova is '+formatTime(player.supernovaPlaytime)+'.')
		} else {
			hideElement('statsSupernova')
			hideElement('statsSupernovaTime')
		}
		if (player.fastestSupernova<Number.MAX_VALUE) {
			showElement('statsSupernovaFastest','block')
			updateElement('statsSupernovaFastest','Your fastest supernova is in '+formatTime(player.fastestSupernova)+'.')
		} else {
			hideElement('statsSupernovaFastest')
		}
	}
	if (tab=='achievements') {
		if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
			showElement('achTabs','block')
		} else {
			hideElement('achTabs')
		}
		
		if (achTab!=oldAchTab) {
			showElement('ach'+achTab,'block')
			hideElement('ach'+oldAchTab)
			oldAchTab=achTab
		}
		if (achTab=='nonBonus') {
			var temp=1
			do {
				if (oldDesign) {
					if (temp==4) {
						updateElement('ach4','Bigger than you think - Reach '+format(1e100)+' stars')
					} else {
						updateElement('ach'+temp,achList.names[temp]+' - '+achList.requirements[temp])
					}
				}
				if (player.achievements.includes(temp)) {
					if (!oldDesign) updateElement('ach'+temp,'Completed')
					updateClass('ach'+temp,'achCompleted')
				} else {
					if (!oldDesign) updateElement('ach'+temp,'Incomplete')
					updateClass('ach'+temp,'ach')
				}
				temp++
			} while (document.getElementById('ach'+temp))
		}
		if (achTab=='bonus') {
			updateElement('tpGainAchMult','<b>x'+format(tpGainAchMult)+'</b> for TP gain in bonus achievements')
			var temp=1
			do {
				if (oldDesign) {
					if (temp==5) {
						updateElement('achbonus5','So close... - Transfer between '+format(7990)+' to '+format(7999)+' PP')
					} else {
						updateElement('achbonus'+temp,achList.names['bonus'+temp]+' - '+achList.requirements['bonus'+temp])
					}
				}
				if (player.achievements.includes('bonus'+temp)) {
					if (!oldDesign) updateElement('achbonus'+temp,'Completed')
					updateClass('achbonus'+temp,'achCompleted')
				} else {
					if (!oldDesign) updateElement('achbonus'+temp,'Incomplete')
					updateClass('achbonus'+temp,'ach')
				}
				temp++
			} while (document.getElementById('achbonus'+temp))
		}
	}
	if (tab=='options') {
		updateElement('notationOption','Notation:<br>'+player.notation)
	}
	if (tab=='transfer') {
		updateElement('transferPoints','You have <b>'+format(player.transferPoints)+'</b> transfer points')
		var descriptions={2:'Production increase over your playtime',3:'Production increase over your transfer playtime',4:'Production increase over your highest prestige power',5:'Production increase over your highest transfer points'}
		for (i in descriptions) {
			updateElement('tupg'+i+((oldDesign)?'button':''),descriptions[i]+'<br>'+((!oldDesign||player.transferUpgrades.includes(Number(i)))?'Current: '+format(getUpgradeMultiplier('tupg'+i),(i==2)?3:(i==3)?2:0)+'x':'Cost: '+tupgCosts[i-1]+' TP'))
		}
		descriptions={11:'Gain more prestige power when you transfer<br>',12:'Production increased by x10<br><br>',13:'You get more TP gain<br><br>',14:'You gain more prestige points over transfer points<br>'}
		for (i in descriptions) {
			updateElement('tupg'+i+'button',((oldDesign)?descriptions[i]:'')+'Cost: '+format(tupgCosts[i-1])+' TP')
		}
		for (i=1;i<15;i++) {
			if (player.transferUpgrades.includes(i)) {
				updateClass('tupg'+i+'button','boughtUpgrade')
			} else if (i>12&&player.transferUpgrades.length<12) {
				updateClass('tupg'+i+'button','lockedUpgrade')
			} else if (player.transferPoints.gte(tupgCosts[i-1])) {
				updateClass('tupg'+i+'button',(oldDesign)?'upgradeButton':'longButton')
			} else {
				updateClass('tupg'+i+'button',(oldDesign)?'unaffordUpgrade':'shopUnafford')
			}
		}
	}
	if (tab=='supernova') {
		updateElement('neutronStars','You have <b>'+format(player.neutronStars)+'</b> neutron stars')
		if (SNTab!=oldSNTab) {
			showElement('supernova'+SNTab,'block')
			hideElement('supernova'+oldSNTab)
			oldSNTab=SNTab
		}
		if (SNTab=='upgrades') {
			var descriptions={1:'Total bought increases production',4:'Production increase over total stars',6:'PP gain increase over supernovas',7:'TP gain increase over neutron stars',10:'Transfer upgrades affect production',12:'Production increase over fastest supernova',13:'Production increase over last transfer time',15:'Production increase over achievements'}
			var odbrValues={1:2,4:2,6:2,7:2,10:2,12:1,13:1,15:1}
			for (i in descriptions) {
				updateElement('snupg'+i+((oldDesign)?'button':''),descriptions[i]+'<br>'.repeat((oldDesign)?odbrValues[i]:1)+((!oldDesign||player.supernovaUpgrades.includes(Number(i)))?'Current: x'+format(getUpgradeMultiplier('snupg'+i),(i==6)?2:0):'Cost: '+snupgCosts[i-1]+' NS'))
			}
			for (i=1;i<17;i++) {
				if (player.supernovaUpgrades.includes(i)) {
					updateClass('snupg'+i+'button','boughtUpgrade')
				} else if (player.neutronStars.gte(snupgCosts[i-1])) {
					updateClass('snupg'+i+'button',(oldDesign)?'supernovaUpgrade':'supernovaButton')
				} else {
					updateClass('snupg'+i+'button',(oldDesign)?'unaffordUpgrade':'shopUnafford')
				}
			}
		}
		if (SNTab=='challenges') {
			if (player.currentChallenge==0) {
				hideElement('exitChall')
			} else {
				showElement('exitChall','inline-block')
			}
			for (i=1;i<14;i++) {
				var timesCompleted=(player.challengesCompleted[i]==undefined)?0:player.challengesCompleted[i]
				if (player.currentChallenge==i) {
					updateElement('chall'+i+'button','Running')
					updateClass('chall'+i+'button',(oldDesign)?'challRunning':'shopUnafford')
				} else if (timesCompleted>0) {
					updateElement('chall'+i+'button','Completed')
					updateClass('chall'+i+'button',(oldDesign)?'challCompleted':'boughtUpgrade')
				} else {
					updateElement('chall'+i+'button','Start')
					updateClass('chall'+i+'button',(oldDesign)?'tabButton':'longButton')
				}
				updateElement('chall'+i+'comp','Reward: Coming soon<br>Completed '+format(timesCompleted)+' time'+((timesCompleted==1)?'':'s'))
			}
		}
	}
	if (tab=='cheat') {
		if (player.neutronTiers[0].bought==1) {
			updateElement('breakLimit','Fix limit')
		} else {
			updateElement('breakLimit','Break limit')
		}
	}
}

if (oldDesign) console.log('You\'re playing in old design. Some are doesn\'t work unless you play in new design.')

var tempSave=localStorage.getItem('save2')
if (tempSave==null||oldDesign) {
	tempSave=localStorage.getItem('save')
}
load(tempSave)

updated=true
tickspeed=0

updateCosts()
setInterval(function(){
	if (updated) {
		updated=false
		setTimeout(function(){
			var startTime=new Date().getTime()
			try {
				gameTick()
			} catch (e) {
				console.log('A game error has been occured: '+e)
			}
			tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
			updated=true
		},tickspeed)
	}
},0)