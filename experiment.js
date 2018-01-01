player={version:0.6006,
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
	prestigePower:new Decimal(1),
	transferPlaytime:0,
	highestTransferTier:0,
	transferPoints:new Decimal(0),
	transferUpgrades:[],
	supernovaPlaytime:0,
	fastestSupernova:Number.MAX_VALUE,
	neutronStars:new Decimal(0),
	supernovaUpgrades:[],
	supernovaTabsUnlocked:0,
	currentChallenge:0,
	challengesUnlocked:0,
	challengesCompleted:[],
	autobuyers:[],
	neutrons:new Decimal(0),
	neutronTiers:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}],
	aliens:{unlocked:false,
		amount:0,
		interval:0,
		chance:0},
	quarkStars:new Decimal(0),
	particles:new Decimal(0)}
achList={names:['Raise the stars!','I wanna to be rich!','Be powerful','Bigger than you think','Upgrade the game','Upgrade completed!'],
requirements:['Buy 1 T1 generator','Buy 1 T10 generator','Go prestige','Reach 1e100 stars','Go transfer','Buy all transfer upgrades']}
tupgCosts=[1,2,5,10,20,50,100,300,600,1000,1500,4000,8000,12000]
snupgCosts=[1,1,1,1,3,3,5,7,10,15,15,20,30,50,75,100]
	
tab='gen'
oldTab=tab
oldLayout=player.layout

tierCosts=[]
	
function updateElement(elementID,value) {
	document.getElementById(elementID).innerHTML=value
}
	
function updateClass(elementID,value) {
	document.getElementById(elementID).className=value
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
	if (number.gte(Infinity)) {
		return 'Infinite'
	} else if (number.e>2&&player.notation=='Standard') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+abbreviation(BigInteger.subtract(label,1))
	} else if (number.e>2&&player.notation=='Letters') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+letter(label)
	} else if (number.e>2&&player.notation=='Scientific') {
		return number.div(Decimal.pow(10,number.e)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+'e'+number.e
	} else if (number.e>2&&player.notation=='Logarithm') {
		if (Math.round(Math.log10(number.mantissa)*1000)/1000==1) return 'e'+BigInteger.add(number.e,1)
		return 'e'+number.e+(Math.round(Math.log10(number.mantissa)*1000)/1000).toString().replace('0','')
	} else if (number.e>2&&player.notation=='Engineering') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+'e'+BigInteger.multiply(label,3)
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

function switchNotation() {
	if (player.notation=='Standard') {
		player.notation='Letters'
	} else if (player.notation=='Letters') {
		player.notation='Scientific'
	} else if (player.notation=='Scientific') {
		player.notation='Logarithm'
	} else if (player.notation=='Logarithm') {
		player.notation='Engineering'
	} else {
		player.notation='Standard'
	} 
}

function save() {
	try {
		localStorage.setItem('save2',btoa(JSON.stringify(player)))
		console.log('Game saved!')
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
			localStorage.clear('save2')
		}
		if (tier>2) {
			//Tier 3 - Supernova
			if (tab=='toomuch') {
				tab='gen'
			}
			player.lastTransferPlaytime=player.transferPlaytime
			player.prestiges[2]=(tier==3)?player.prestiges[2]+1:0
			player.fastestSupernova=(tier==Infinity)?Number.MAX_VALUE:(player.fastestSupernova>player.supernovaPlaytime)?player.supernovaPlaytime:player.fastestSupernova
			player.supernovaPlaytime=0
			player.neutronStars=(tier==3)?player.neutronStars.add(getPostPrestigePoints(3)):new Decimal(0)
			player.supernovaUpgrades=(tier==3)?player.supernovaUpgrades:[]
			player.prestigePeak[2]=(tier==Infinity)?new Decimal(0):(player.neutronStars.gt(player.prestigePeak[2]))?player.neutronStars:player.prestigePeak[2]
		}
		if (tier>1) {
			//Tier 2 - transfer
			player.prestiges[1]=(tier==2)?player.prestiges[1]+1:0
			player.transferPlaytime=0
			player.highestTransferTier=0
			player.transferPoints=(tier==2)?player.transferPoints.add(getTransferPoints()):(player.supernovaUpgrades.includes(2))?player.neutronStars:new Decimal(0)
			player.transferUpgrades=(tier==2)?player.transferUpgrades:[]
			player.prestigePeak[1]=(tier==Infinity)?new Decimal(0):(player.transferPoints.gt(player.prestigePeak[1]))?player.transferPoints:player.prestigePeak[1]
			if (tier==2) getAch(5)
		}
		//Tier 1 - prestige
		player.prestiges[0]=(tier==1)?player.prestiges[0]+1:0
		player.prestigePower=(tier==1)?getPrestigePower():(player.supernovaUpgrades.includes(3))?player.neutronStars.pow(2):new Decimal(1)
		player.prestigePeak[0]=(tier==Infinity)?new Decimal(1):(player.prestigePower.gt(player.prestigePeak[0]))?player.prestigePower:player.prestigePeak[0]
		if (tier==1) getAch(3)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		updateCosts()
	}
}

function updateAch() {
	var temp=1
	do {
		if (player.achievements.includes(temp)) {
			updateElement('ach'+temp,'Completed')
			updateClass('ach'+temp,'achCompleted')
		} else {
			updateElement('ach'+temp,'Incomplete')
			updateClass('ach'+temp,'ach')
		}
		temp++
	} while (document.getElementById('ach'+temp))
}

function getAch(achId) {
	if (!player.achievements.includes(achId)) {
		player.achievements.push(achId)
		
		var achBox = document.getElementById('achievement')
		achBox.innerHTML='<b>Achievement unlocked!</b><br>'+achList.names[achId-1]+'<br>'+achList.requirements[achId-1]
		achBox.style.opacity=1
		
		setTimeout(function(){achBox.style.opacity=0;},6000)
	}
}
	
function switchTab(tabName) {
	tab=tabName
}
	
function getCost(tier,bulk=1) {
	var multiplier=Math.pow(1.5,tier*(0.9+0.1*tier)-((tier==10&&player.transferUpgrades.includes(8))?0.5:0))
	return Decimal.pow(multiplier,bulk).sub(1).div(multiplier-1).times(tierCosts[tier-1])
}
	
function updateCosts() {
	for (i=1;i<11;i++) {
		var cost=Decimal.pow(10,i*(0.9+0.1*i)).times(Decimal.pow(Math.pow(1.5,i*(0.9+0.1*i)-((i==10&&player.transferUpgrades.includes(8))?0.5:0)),player.generators[i-1].bought))
		if (player.supernovaUpgrades.includes(11)) cost=cost.div(player.prestigePower)
		tierCosts[i-1]=cost
	}
}
	
function buyGen(tier,bulk=1) {
	var multiplier=Math.pow(1.5,tier*(0.9+0.1*tier)-((tier==10&&player.transferUpgrades.includes(8))?0.5:0))
	var maxBulk=Math.floor(player.stars.div(tierCosts[tier-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
	if (bulk>maxBulk) {
		bulk=maxBulk
	}
	if (bulk>0&&tier>player.highestTransferTier) {
		player.highestTransferTier=tier
	}
	
	player.stars=player.stars.sub(getCost(tier,bulk))
	player.generators[tier-1].bought+=bulk
	player.generators[tier-1].amount=player.generators[tier-1].amount.add(bulk)
	updateCosts()
	
	if (tier==1&&bulk>0) getAch(1)
	if (tier==10&&bulk>0) getAch(2)
}
	
function maxAll() {
	for (i=10;i>0;i--) {
		var multiplier=Math.pow(1.5,i*(0.9+0.1*i)-((i==10&&player.transferUpgrades.includes(8))?0.5:0))
		var bulk=Math.floor(player.stars.div(i).div(tierCosts[i-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
		if (bulk>0&&i>player.highestTransferTier) {
			player.highestTransferTier=i
		}
		
		player.stars=player.stars.sub(getCost(i,bulk))
		player.generators[i-1].bought+=bulk
		player.generators[i-1].amount=player.generators[i-1].amount.add(bulk)
	
		if (i==1&&bulk>0) getAch(1)
		if (i==10&&bulk>0) getAch(2)
	}
	updateCosts()
}
	
function getGeneratorMultiplier(tier) {
	var multi=Decimal.pow((tier==9&&player.supernovaUpgrades.includes(9))?1.15:(tier==9&&player.transferUpgrades.includes(10))?1.1:player.transferUpgrades.includes(7)?1.05:1.04,player.generators[tier].bought)
	multi=multi.times(player.prestigePower)
	if (player.transferUpgrades.includes(1)&&player.generators[tier].amount.gte(10)) multi=multi.times(Decimal.pow(1.04,player.generators[tier].amount.log10()))
	if (player.transferUpgrades.includes(2)) multi=multi.times(getUpgradeMultiplier('tupg2'))
	if (player.transferUpgrades.includes(3)) multi=multi.times(getUpgradeMultiplier('tupg3'))
	if (player.transferUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('tupg4'))
	if (player.transferUpgrades.includes(5)) multi=multi.times(getUpgradeMultiplier('tupg5'))
	if (player.transferUpgrades.includes(12)) multi=multi.times(10)
		
	if (player.supernovaUpgrades.includes(1)) multi=multi.times(player.generators[0].bought+player.generators[1].bought+player.generators[2].bought+player.generators[3].bought+player.generators[4].bought+player.generators[5].bought+player.generators[6].bought+player.generators[7].bought+player.generators[8].bought+player.generators[9].bought)
	if (player.supernovaUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('snupg4'))
	if (player.supernovaUpgrades.includes(5)) multi=multi.times(1+600/player.supernovaPlaytime)
	if (player.supernovaUpgrades.includes(7)) multi=multi.times(getUpgradeMultiplier('snupg7'))
	if (player.supernovaUpgrades.includes(10)) multi=multi.times(getUpgradeMultiplier('snupg10'))
	if (player.supernovaUpgrades.includes(12)) multi=multi.times(getUpgradeMultiplier('snupg12'))
	if (player.supernovaUpgrades.includes(13)) multi=multi.times(getUpgradeMultiplier('snupg13'))
	if (player.supernovaUpgrades.includes(14)) multi=multi.times(1e5)
	if (player.supernovaUpgrades.includes(15)) multi=multi.times(getUpgradeMultiplier('snupg15'))
	if (player.supernovaUpgrades.includes(16)&&tier==0) multi=multi.times(Decimal.pow(5,player.generators[9].amount))
		
	return multi
}

function getPrestigePower() {
	multi=player.stars.div('1e40').pow(0.05).times(3.55655882)
	if (player.transferUpgrades.includes(6)) multi=multi.times(Math.pow(multi.log10(),0.5))
	if (player.transferUpgrades.includes(9)) multi=multi.times(2)
	if (player.transferUpgrades.includes(11)) multi=multi.times(1+1/(1+player.transferPlaytime/600))
	if (player.transferUpgrades.includes(14)&&player.transferPoints.gt(4000)) multi=multi.times(player.transferPoints.div(4000).pow(0.2))

	if (player.supernovaUpgrades.includes(6)) multi=multi.times(getUpgradeMultiplier('snupg6'))
	if (player.supernovaUpgrades.includes(8)) multi=multi.times(10)
		
	return multi
}

function getTransferPoints() {
	multi=player.prestigePower.div(1000).cbrt().floor()
	if (player.transferUpgrades.includes(13)) multi=player.prestigePower.div(500).cbrt().floor()

	if (player.supernovaUpgrades.includes(7)) multi=multi.times(getUpgradeMultiplier('snupg7'))
		
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
	if (name=='tupg2') return Decimal.pow(1+player.playtime/18000,0.5)
	if (name=='tupg3') return Decimal.pow(1+player.transferPlaytime/3600,0.5)
	if (name=='tupg4') return player.prestigePeak[0].pow(1/6).add(1).pow(0.2)
	if (name=='tupg5') return player.prestigePeak[1].sqrt().add(1).pow(0.2)
		
	if (name=='snupg4') return Math.pow(player.totalStars.log10(),2)+1
	if (name=='snupg6') return Math.log10(player.prestiges[2])
	if (name=='snupg7') return 1+player.neutronStars
	if (name=='snupg10') return Math.pow(1+player.transferUpgrades.length,5)
	if (name=='snupg12') return Math.pow(1+600/player.fastestSupernova,5)
	if (name=='snupg13') return Math.pow(1+10/player.lastTransferPlaytime,4)
	if (name=='snupg15') return Math.pow(1+player.achievements.length,3)
}

function getPostPrestigePoints(tier) {
	var pointsList = [player.stars,player.neutronStars,player.quarkStars]
	var base = new Decimal.pow(10,pointsList[tier-3].log10()/Math.log10(Number.MAX_VALUE)).div(10)
	return base.times(Math.min(Math.pow(10,base.log10()/(Math.log10(Number.MAX_VALUE)-1)),10)).floor()
}

function buySupernovaUpgrade(num) {
	if (player.neutronStars.gte(snupgCosts[num-1])&&!player.supernovaUpgrades.includes(num)) {
		player.neutronStars=player.neutronStars.sub(snupgCosts[num-1])
		player.supernovaUpgrades.push(num)
	}
}
	
var tempSave=localStorage.getItem('save2')
if (tempSave==null) {
	tempSave=localStorage.getItem('save')
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

function breakLimit() {
	player.neutronTiers[0].bought=(player.neutronTiers[0].bought+1)%2
	if (player.stars.gt(Number.MAX_VALUE)) reset(3)
}

load(tempSave)
updateCosts()
setInterval(function(){
	var currentTime = new Date().getTime()
	if (player.lastUpdate>0) {
		var diff=(currentTime-player.lastUpdate)/1000
		player.playtime+=diff
		player.transferPlaytime+=diff
		player.supernovaPlaytime+=diff
		for (i=0;i<10;i++) {
			var addAmount=player.generators[i].amount.times(getGeneratorMultiplier(i)).times(diff)
			if (i==0) {
				player.stars=player.stars.add(addAmount)
				player.totalStars=player.totalStars.add(addAmount)
			} else {
				player.generators[i-1].amount=player.generators[i-1].amount.add(addAmount)
			}
		}
		
		if (player.stars.gte(1e100)) getAch(4)
		if (player.stars.gte(Number.MAX_VALUE)&&player.neutronTiers[0].bought==0) {
			player.stars=new Decimal(Number.MAX_VALUE)
			player.generators[0].amount=new Decimal(0)
			tab='toomuch'
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
		var highestTierGot=0
		for (i=0;i<9;i++) {
			if (player.generators[i].amount.gt(0) || player.generators[i].bought>0) {
				highestTierGot=i+1
			}
		}
		for (i=0;i<10;i++) {
			if (i>0&&player.layout==1) {
				if (highestTierGot>=i) {
					showElement('t'+(i+1)+'GenRow','table-row')
				} else {
					hideElement('t'+(i+1)+'GenRow')
				}
			}
			if (i>0&&player.layout==2) {
				if (highestTierGot>=i) {
					visibleElement('t'+(i+1)+'GenCell')
				} else {
					invisibleElement('t'+(i+1)+'GenCell')
				}
			}
			var name='t'+(i+1)+'Gen'+((player.layout==2)?'2':'')
			if (player.generators[i].amount.eq(player.generators[i].bought)) {
				updateElement(name,'<b>Tier '+(i+1)+' generator</b><br>'+format(player.generators[i].bought)+'')
			} else {
				updateElement(name,'<b>Tier '+(i+1)+' generator</b><br>'+format(player.generators[i].amount)+', '+format(player.generators[i].bought)+' bought')
			}
			var name='t'+(i+1)+'GenButton'+((player.layout==2)?'2':'')
			updateElement(name,'Cost: '+format(tierCosts[i]))
			if (player.stars.gte(tierCosts[i])) {
				updateClass(name,'longButton')
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
			showElement('prestige1','table-cell')
			updateElement('prestige1','Reset this game and get the boost.<br>x'+format(getPrestigePower(),3)+' production')
		} else {
			hideElement('prestige1')
		}
		if (player.prestigePower.gte(1000)) {
			showElement('prestige2','table-cell')
			updateElement('prestige2','Transfer your power and upgrade this game.<br>+'+format(getTransferPoints())+' TP')
		} else {
			hideElement('prestige2')
		}
	}
	if (tab=='stats') {
		updateElement('statsPlaytime','You have played for '+formatTime(player.playtime)+'.')
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
		updateAch()
		updateElement('ach4tip','<b>Bigger than you think</b><br>Reach '+format(1e100)+' stars')
	}
	if (tab=='options') {
		updateElement('notationOption','Notation:<br>'+player.notation)
	}
	if (tab=='transfer') {
		updateElement('transferPoints','You have <b>'+format(player.transferPoints)+'</b> transfer points')
		updateElement('tupg2','Production increase over your playtime<br>Current: x'+format(getUpgradeMultiplier('tupg2'),3))
		updateElement('tupg3','Production increase over your transfer playtime<br>Current: x'+format(getUpgradeMultiplier('tupg3'),2))
		updateElement('tupg4','Production increase over your highest prestige power<br>Current: x'+format(getUpgradeMultiplier('tupg4'),2))
		updateElement('tupg5','Production increase over your highest transfer points<br>Current: x'+format(getUpgradeMultiplier('tupg5'),3))
		for (i=1;i<15;i++) {
			if (player.transferUpgrades.includes(i)) {
				updateClass('tupg'+i+'button','boughtUpgrade')
			} else if (i>12&&player.transferUpgrades.length<12) {
				updateClass('tupg'+i+'button','lockedUpgrade')
			} else if (player.transferPoints.gte(tupgCosts[i-1])) {
				updateClass('tupg'+i+'button','longButton')
			} else {
				updateClass('tupg'+i+'button','shopUnafford')
			}
			if (i>9) {
				updateElement('tupg'+i+'button','Cost: '+format(tupgCosts[i-1]))
			}
		}
	}
	if (tab=='supernova') {
		updateElement('neutronStars','You have <b>'+format(player.neutronStars)+'</b> neutron stars')
		updateElement('snupg4','Production increase over total stars<br>Current: '+format(getUpgradeMultiplier('snupg4'))+'x')
		updateElement('snupg6','PP gain increase over supernovas<br>Current: '+format(getUpgradeMultiplier('snupg6'))+'x')
		updateElement('snupg7','TP gain increase over neutron stars<br>Current: '+format(getUpgradeMultiplier('snupg7'))+'x')
		updateElement('snupg10','Transfer upgrades affect production<br>Current: '+format(getUpgradeMultiplier('snupg10'))+'x')
		updateElement('snupg12','Production increase over fastest supernova<br>Current: '+format(getUpgradeMultiplier('snupg12'))+'x')
		updateElement('snupg13','Production increase over last transfer time<br>Current: '+format(getUpgradeMultiplier('snupg13'))+'x')
		updateElement('snupg15','Production increase over achievements<br>Current: '+format(getUpgradeMultiplier('snupg15'))+'x')
		for (i=1;i<17;i++) {
			if (player.supernovaUpgrades.includes(i)) {
				updateClass('snupg'+i+'button','boughtUpgrade')
			} else if (player.neutronStars.gte(snupgCosts[i-1])) {
				updateClass('snupg'+i+'button','supernovaButton')
			} else {
				updateClass('snupg'+i+'button','shopUnafford')
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
})

setInterval(save(),60000)