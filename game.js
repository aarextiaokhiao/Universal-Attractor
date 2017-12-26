version=0.6003

player={playtime:0,
points:new Decimal(10),
totalPoints:new Decimal(0),
lastUpdate:0,
achievements:[],
generators:{t1:{amount:new Decimal(0),bought:0},
t2:{amount:new Decimal(0),bought:0},
t3:{amount:new Decimal(0),bought:0},
t4:{amount:new Decimal(0),bought:0},
t5:{amount:new Decimal(0),bought:0},
t6:{amount:new Decimal(0),bought:0},
t7:{amount:new Decimal(0),bought:0},
t8:{amount:new Decimal(0),bought:0},
t9:{amount:new Decimal(0),bought:0},
t10:0},
prestiges:[0,0,0,0,0],
prestigePeak:[new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
prestigePower:new Decimal(1),
prestigePoints:new Decimal(0),
prestigeUpgrades:[],
transferPlaytime:0,
highestTierTransfer:0,
neutronStars:new Decimal(0),
supernovaPlaytime:0,
fastestSupernova:1e15,
lastTransferPlaytime:1,
supernovaUpgrades:[],
supernovaTabsUnlocked:0,
currentChallenge:0,
challengesUnlocked:0,
challengesCompleted:[],
autobuyers:[],
neutrons:new Decimal(0),
neutronTiers:{t1:{amount:new Decimal(0),bought:0},
t2:{amount:new Decimal(0),bought:0},
t3:{amount:new Decimal(0),bought:0},
t4:{amount:new Decimal(0),bought:0},
t5:{amount:new Decimal(0),bought:0},
t6:{amount:new Decimal(0),bought:0},
t7:{amount:new Decimal(0),bought:0},
t8:{amount:new Decimal(0),bought:0},
t9:{amount:new Decimal(0),bought:0},
t10:0},
quarkStars:new Decimal(0),
particles:new Decimal(0),
notation:'Standard',
version:version}
tab='generators'
genTab='Tiers'
achTab='NonBonus'
SNTab='upgrades'
achList={names:{1:'Raise the stars!',2:'Fractal generators',3:'Powerful as fast',4:'That\'s a lot, son.',5:'Transfer time!',6:'Upgrade completed!',7:'Star explosion',8:'This was ridiculous',9:'Fast supernova',10:'Sonic supernova',
11:'This took a mile.',12:'Neutron star generator?',13:'Challenge completed!',14:'Challenge mastermind!',15:'Robot builder',16:'Automation',17:'Shopkeeper',18:'Neutron star generator.',19:'That\'s a lots and lots.',
'bonus1':'Non-fractal generators','bonus2':'11th tier is a lie','bonus3':'Tier pyramid','bonus4':'Error, more tiers not found','bonus5':'Lucky transfer!','bonus6':'Low-tiered transfer','bonus7':'9th tier is a lie','bonus8':'Prestige reduction'},
requirements:{1:'Buy 1 T1 generator',2:'Buy 1 T10 generator',3:'Go prestige',4:'Reach googol points',5:'Go transfer',6:'Buy all 14 TP upgrades',7:'Go supernova',8:'Reach 1000:1 PP gain-PP',9:'Supernova in a hour',10:'Supernova in a minute',
11:'Reach 1609 supernovas',12:'Supernova in a second',13:'Complete a challenge',14:'Complete all challenges',15:'Max all one of autobuyers',16:'Max all autobuyers',17:'Buy all buyinshop upgrades',18:'Buy first neutron tier generator',19:'Reach 1e1000 points',
'bonus1':'Buy 100 T1 generators without buying others','bonus2':'Buy exactly 111 T10 generators','bonus3':'Buy T10 generator highest, T9 generator 2nd highest, etc.','bonus4':'Buy exactly 404 T10 generators','bonus5':'Transfer between 7990PP to 8000PP','bonus6':'Transfer while only buying tiers 1-5','bonus7':'Supernova with only 8 tiers','bonus8':'Supernova without transfer'}}
tierCosts=[]
prestigeCosts=[1,1,2,3,5,20,60,90,180,240,360,500,1000,1500]
SNUpgradesCosts=[1,1,2,3,5,8,13,21,34,55,89,144]
unlockRequirements=[1000,1e4,1e5,1e100,Infinity]
continued=false
resetting=false
alertAtInfinity=false
	
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

function letter(label) {
	var letters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	var result=''
	do {
		result=letters[BigInteger.remainder(BigInteger.subtract(label,1),26)]+result
		label=BigInteger.divide(BigInteger.subtract(label,1),26)
	} while (label>0)
	return result
}

function format(number, decimalPoints=0) {
	if (number.gte(Infinity)) {
		return 'Infinite'
	} else if (number.abs().gte(1000)&&player.notation=='Logarithm') {
		if (Math.round(Math.log10(number.mantissa)*1000)/1000==1) return 'e'+BigInteger.add(number.e,1)
		return 'e'+number.e+(Math.round(Math.log10(number.mantissa)*1000)/1000).toString().replace('0','')
	} else if (number.abs().gte(1000)&&player.notation=='Scientific') {
		return number.div(Decimal.pow(10,number.e)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+'e'+number.e
	} else if (number.abs().gte(1000)&&player.notation=='Letters') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+letter(label)
	} else if (number.abs().gte(1000)&&player.notation=='Standard') {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+abbreviation(BigInteger.subtract(label,1))
	} else if (number.abs().gte(1000)) {
		return 'You cheater'
	} else {
		return number.toFixed(decimalPoints).toString()
	}
}

function calcTPAchMult() {
	var multi=new Decimal(1)
	if (player.prestiges[2]>0) {
		for (i=0;i<player.achievements.length;i++) {
			if (player.achievements[i].toString().search('bonus')>-1) {
				multi=multi.times(1.5)
			}
		}
	}
	return multi
}

function getAch(achId) {
	if (!player.achievements.includes(achId)) {
		player.achievements.push(achId)
		
		var achBox = document.getElementById('achievement')
		achBox.innerHTML='<b>Achievement unlocked!</b><br>'+achList.names[achId]+'<br>'+achList.requirements[achId]
		achBox.style.opacity=1
		
		setTimeout(function(){achBox.style.opacity=0;},6000)
	}
}

function getBonusAch(achId) {
	if (player.prestiges[2]>0) getAch('bonus'+achId) 
}

function updateGeneratorCosts() {
	for (i = 1; i < 10; i++) { 
		tierCosts[i-1]=new Decimal(Math.pow(10,i*(0.9+0.1*i))).times(new Decimal.pow(1.5,player.generators['t'+i].bought*(0.1+(i*0.9))))
	}
	tierCosts[9]=new Decimal(1e19).times(new Decimal.pow(1.5,player.generators.t10*(player.prestigeUpgrades.includes(6)? 8.6 : 9.1)))
}

function buyGenerator(tier, bulk=1) {
	if (player.points.gte(tierCosts[tier-1])) {
		var baseMultiplier = Math.pow(1.5,(tier == 10 && player.prestigeUpgrades.includes(6))? 8.6 : 0.1+tier*0.9)
		var maxBulk=Math.floor(new Decimal.div(player.points,baseMultiplier/(baseMultiplier-1)).div(tierCosts[tier-1]).add(1).e/Math.log10(baseMultiplier))
		if (bulk>maxBulk) {
			bulk=maxBulk
		}
		if (bulk==0) {
			bulk=1
		}
		var nextN=bulk-1
		var totalCost=tierCosts[tier-1]
		var prevTC
		if (bulk>1) {
			do {
				prevTC=totalCost
                if (tier==10 && player.prestigeUpgrades.includes(6) && player.generators.t10 >= 15) totalCost = totalCost.plus(tierCosts[9].times(Decimal.pow(1.5,7*nextN)))
				else totalCost=totalCost.add(tierCosts[tier-1].times(Decimal.pow(1.5,(0.1+(tier*0.9))*nextN)))
				nextN-=1
			} while (!totalCost.eq(prevTC) && nextN>0)
		}
		if (!player.points.gte(totalCost)) {
			bulk-=1
            if (tier==10 && player.prestigeUpgrades.includes(6) && player.generators.t10 >= 15) totalCost = totalCost.sub(tierCosts[9].times(Decimal.pow(1.5,7*bulk)))
			else totalCost=totalCost.sub(tierCosts[tier-1].times(Decimal.pow(1.5,(0.1+(tier*0.9))*bulk)))
		}
		player.points=player.points.sub(totalCost)
		if (tier == 10) {
			player.generators.t10+=bulk
		} else {
			player.generators['t'+tier].amount=player.generators['t'+tier].amount.add(bulk)
			player.generators['t'+tier].bought+=bulk
		}
		updateGeneratorCosts()
		if (tier>player.highestTierTransfer) player.highestTierTransfer=tier
		
		if (player.generators.t1.bought>0) getAch(1)
		if (player.generators.t10>0) getAch(2)
		if (player.generators.t1.bought>99 && player.generators.t2.bought==player.generators.t3.bought==player.generators.t4.bought==player.generators.t5.bought==player.generators.t6.bought==player.generators.t7.bought==player.generators.t8.bought==player.generators.t9.bought==player.generators.t10==0) getBonusAch(1)
		if (player.generators.t10==111) getBonusAch(2)
		if (player.generators.t10>player.generators.t9.bought>player.generators.t8.bought>player.generators.t7.bought>player.generators.t6.bought>player.generators.t5.bought>player.generators.t4.bought>player.generators.t3.bought>player.generators.t2.bought>player.generators.t1.bought) getBonusAch(3)
		if (player.generators.t10==404) getBonusAch(4)
	}
}

function maxAll() {
	buyGenerator(1,Infinity)
	buyGenerator(2,Infinity)
	buyGenerator(3,Infinity)
	buyGenerator(4,Infinity)
	buyGenerator(5,Infinity)
	buyGenerator(6,Infinity)
	buyGenerator(7,Infinity)
	buyGenerator(8,Infinity)
	buyGenerator(9,Infinity)
	buyGenerator(10,Infinity)
}

function getGeneratorMultiplier(tier) {
	var multi=new Decimal(1)
	if (tier == 10) {
		multi=multi.times(Decimal.pow(player.prestigeUpgrades.includes(10) ? 1.1 : player.supernovaUpgrades.includes(2) ? 1.07 : 1.05,player.generators.t10))
	} else {
		multi=multi.times(Decimal.pow(player.supernovaUpgrades.includes(2) ? 1.07 : 1.05,player.generators['t'+tier].bought))
	}
	multi=multi.times(player.prestigePower)
    if (player.prestigeUpgrades.includes(1) && (tier<=9 || player.generators.t10>0)) multi = multi.times(new Decimal.pow(1.01,(tier == 10)? Math.floor(Math.log10(player.generators.t10)) : (player.generators['t'+tier].amount.gt(1)) ? player.generators['t'+tier].amount.e : 0))
    if (player.prestigeUpgrades.includes(2)) multi = multi.times(Math.pow(player.playtime/86400000+1,1.1))
    if (player.prestigeUpgrades.includes(3) && player.prestigePeak[0].gt(10)) multi = multi.times(new Decimal.pow(player.prestigePeak[0].log10()/10+1,2))
    if (player.prestigeUpgrades.includes(4) && player.prestigePeak[1].gt(10)) multi = multi.times(new Decimal.pow(player.prestigePeak[0].log10()/10+1,3))
    if (player.prestigeUpgrades.includes(6)) multi = multi.times(Math.pow(1+player.prestiges[1],0.1))
    if (player.prestigeUpgrades.includes(11)) multi = multi.times(2)
		
    if (player.supernovaUpgrades.includes(1)) multi = multi.times(Math.pow(player.generators.t1.bought+player.generators.t2.bought+player.generators.t3.bought+player.generators.t4.bought+player.generators.t5.bought+player.generators.t6.bought+player.generators.t7.bought+player.generators.t8.bought+player.generators.t9.bought+player.generators.t10,0.1))
    if (player.supernovaUpgrades.includes(3)) multi = multi.times(1/Math.pow(player.lastTransferPlaytime/172800000,1/3))
    if (player.supernovaUpgrades.includes(4) && player.points.gt(10)) multi = multi.times(new Decimal.sqrt(player.points.log(10)))
    if (player.supernovaUpgrades.includes(5)) multi = multi.times(player.achievements.length)		
    if (player.supernovaUpgrades.includes(6)) multi = multi.times(1/Math.pow(player.fastestSupernova/172800000,1/2))
    if (player.supernovaUpgrades.includes(7) && player.neutronStars.gt(10)) multi = multi.times(player.neutronStars.pow(1/3))
    if (player.supernovaUpgrades.includes(8)) multi = multi.pow(1.05)
    if (player.supernovaUpgrades.includes(11)) multi = multi.times(1000)
    
	return multi
}
   
function updatePrestigeUpgrades() {
	document.getElementById("pt2stats2").innerHTML='You have '+format(player.prestigePoints)+' transfer points.'
	var upgradesBought=0
	for (i=1;i<=14;i++) {
		if (i>12 && upgradesBought<12) {
			document.getElementById('pt2shop'+i).className='ptShopLocked'
		} else if (player.prestigeUpgrades.includes(i)) {
			upgradesBought++
			document.getElementById('pt2shop'+i).className='ptShopBought'
		} else if (player.prestigePoints.gte(prestigeCosts[i-1])) {
			document.getElementById('pt2shop'+i).className='ptShopButton'
		} else {
			document.getElementById('pt2shop'+i).className='ptShopUnaffordable'
		}
	}
	if (upgradesBought==14) getAch(6)
		
	document.getElementById("pt3stats").innerHTML='You have '+format(player.neutronStars)+' neutron stars.'
	var upgradesBought=0
	for (i=1;i<=12;i++) {
		if (player.supernovaUpgrades.includes(i)) {
			upgradesBought++
			document.getElementById('pt3shop'+i).className='ptShopBought'
		} else if (player.neutronStars.gte(SNUpgradesCosts[i-1])) {
			document.getElementById('pt3shop'+i).className='ptShopButton'
		} else {
			document.getElementById('pt3shop'+i).className='ptShopUnaffordable'
		}
	}
}

function buyUpgrade(tier) {
	var upgradesBought=0
	for (i=1;i<=14;i++) {
		if (player.prestigeUpgrades.includes(i)) {
			upgradesBought++
		}
	}
    if (!player.prestigeUpgrades.includes(tier) && player.prestigePoints.gte(prestigeCosts[tier-1]) && (tier<13 || upgradesBought>11)) {
        player.prestigePoints = player.prestigePoints.minus(prestigeCosts[tier-1])
        player.prestigeUpgrades.push(tier)
		updateGeneratorCosts()
		updatePrestigeUpgrades()
    }
}

function buySNUpgrade(tier) {
    if (!player.supernovaUpgrades.includes(tier) && player.neutronStars.gte(SNUpgradesCosts[tier-1])) {
        player.neutronStars = player.neutronStars.minus(SNUpgradesCosts[tier-1])
        player.supernovaUpgrades.push(tier)
		updateGeneratorCosts()
		updatePrestigeUpgrades()
    }
}

function getPrestigePower() {
	multi=player.points.div('1e40').pow(0.05).times(3.55655882)
    if (player.prestigeUpgrades.includes(5) && multi.log10()>1) multi=multi.times(Math.pow(multi.log10(),0.1))
    if (player.prestigeUpgrades.includes(8)) multi=multi.times(2)
    if (player.prestigeUpgrades.includes(12)) multi=multi.times(Math.pow(1+0.1/(1+player.transferPlaytime/3600000),0.1))
    if (player.prestigeUpgrades.includes(14) && player.prestigePoints.gte(1)) multi=multi.times(player.prestigePoints.pow(0.05))
    if (player.supernovaUpgrades.includes(9)) multi=multi.times(Math.pow(multi.log10(),0.2))
	multi=multi.times(calcTPAchMult())
	return multi
}

function getPrestigePoints() {
    if (player.prestigeUpgrades.includes(13)) return player.prestigePower.div(1000).cbrt().floor().times(2)
	return player.prestigePower.div(1000).cbrt().floor()
}

function getPostPrestigePoints(tier) {
	var pointsList = [player.points,player.neutronStars,player.quarkStars]
	var base = new Decimal.pow(10,pointsList[tier-3].log10()/Math.log10(Number.MAX_VALUE)).div(10)
	return base.times(Math.min(Math.pow(10,base.log10()/(Math.log10(Number.MAX_VALUE)-1)),10)).floor()
}

function save() {
	localStorage.setItem('save',btoa(JSON.stringify(player)))
}

function load(input='') {
	try {
		if (input=='') {
			savefile=JSON.parse(atob(localStorage.getItem('save')))
		} else {
			savefile=input
		}
		savefile.points=new Decimal(savefile.points)
		savefile.generators.t1.amount=new Decimal(savefile.generators.t1.amount)
		savefile.generators.t2.amount=new Decimal(savefile.generators.t2.amount)
		savefile.generators.t3.amount=new Decimal(savefile.generators.t3.amount)
		savefile.generators.t4.amount=new Decimal(savefile.generators.t4.amount)
		savefile.generators.t5.amount=new Decimal(savefile.generators.t5.amount)
		savefile.generators.t6.amount=new Decimal(savefile.generators.t6.amount)
		savefile.generators.t7.amount=new Decimal(savefile.generators.t7.amount)
		savefile.generators.t8.amount=new Decimal(savefile.generators.t8.amount)
		savefile.generators.t9.amount=new Decimal(savefile.generators.t9.amount)
		if (savefile.prestigePower!=undefined) {
			savefile.prestigePower=new Decimal(savefile.prestigePower)
			savefile.prestigePoints=new Decimal(savefile.prestigePoints)
		} else {
			savefile.prestigePower=new Decimal(1)
			savefile.prestigePoints=new Decimal(0)
		}
		if (savefile.playtime==undefined) {
			savefile.playtime=0
		}
		if (savefile.achievements==undefined) {
			savefile.achievements=[]
		}
		if (savefile.totalPoints!=undefined) {
			savefile.totalPoints=new Decimal(savefile.totalPoints)
		} else {
			savefile.totalPoints=new Decimal(0)
		}
		if (savefile.notation == undefined) {
			savefile.notation='Standard'
		}
        if (savefile.prestiges == undefined) {
			savefile.prestiges = [0,0]
		} else if (savefile.prestiges[2] == undefined) {
			savefile.prestiges[2] = 0
        }
        if (savefile.prestigeUpgrades == undefined) {
			savefile.prestigeUpgrades = []
        }
        if (savefile.prestigePeak != undefined) {
			savefile.prestigePeak = [new Decimal(savefile.prestigePeak[0]),new Decimal(savefile.prestigePeak[1]),new Decimal(savefile.prestigePeak[2]),new Decimal(savefile.prestigePeak[3]),new Decimal(savefile.prestigePeak[4])]
        } else {
            savefile.prestigePeak = [savefile.prestigePower,savefile.prestigePoints]
        }
		if (savefile.transferPlaytime == undefined) {
			savefile.transferPlaytime = savefile.playtime
		}
		if (savefile.version == undefined) {
			savefile.prestigePeak[2]=new Decimal(0)
			savefile.highestTierTransfer=0
			savefile.neutronStars=new Decimal(0)
			savefile.supernovaPlaytime=savefile.playtime
			savefile.fastestSupernova=1e15
			savefile.lastTransferPlaytime=1
			savefile.supernovaUpgrades=[]
			savefile.supernovaTabsUnlocked=0
			savefile.version=0.6
		}
		if (savefile.version<=0.6) {
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
			if (savefile.scientific) {
				savefile.notation=(savefile.scientific)? 'Scientific' : 'Standard'
			}
		}
		savefile.neutronStars=new Decimal(savefile.neutronStars)
		savefile.neutrons=new Decimal(savefile.neutrons)
		savefile.neutronTiers.t1.amount=new Decimal(savefile.neutronTiers.t1.amount)
		savefile.neutronTiers.t2.amount=new Decimal(savefile.neutronTiers.t2.amount)
		savefile.neutronTiers.t3.amount=new Decimal(savefile.neutronTiers.t3.amount)
		savefile.neutronTiers.t4.amount=new Decimal(savefile.neutronTiers.t4.amount)
		savefile.neutronTiers.t5.amount=new Decimal(savefile.neutronTiers.t5.amount)
		savefile.neutronTiers.t6.amount=new Decimal(savefile.neutronTiers.t6.amount)
		savefile.neutronTiers.t7.amount=new Decimal(savefile.neutronTiers.t7.amount)
		savefile.neutronTiers.t8.amount=new Decimal(savefile.neutronTiers.t8.amount)
		savefile.neutronTiers.t9.amount=new Decimal(savefile.neutronTiers.t9.amount)
		
		if (savefile.version<=0.6001) {
			savefile.currentChallenge=0
		}
		
		if (savefile.version<=0.6002) {
			savefile.prestiges[3]=0
			savefile.prestiges[4]=0
			savefile.prestigePeak[3]=new Decimal(0)
			savefile.prestigePeak[4]=new Decimal(0)
			savefile.quarkStars=new Decimal(0)
			savefile.particles=new Decimal(0)
		}
		savefile.quarkStars=new Decimal(savefile.quarkStars)
		savefile.particles=new Decimal(savefile.particles)
		
		savefile.version=version
		player=savefile
		updateGeneratorCosts()
	} catch(err) {
		console.log('Your save failed to load:\n'+err)
		if (input=='') {
			localStorage.clear('save')	
		}
	}
}

function exportSave() {
	document.getElementById("exportSave").style.display='inline'
	document.getElementById("exportText").value=btoa(JSON.stringify(player))
}

function importSave() {
	input=JSON.parse(atob(prompt('Copy and paste in your exported file and press enter.')))
	if (input!='') {
		try {
			load(input)
		} catch(err) {
			alert('Your save was invalid or caused a game-breaking bug. :(')
		}
	}
}

function switchTab(newTab) {
	document.getElementById('generatorsTab').style.display='none'
	document.getElementById('optionsTab').style.display='none'
	document.getElementById('statsTab').style.display='none'
	document.getElementById('achievementsTab').style.display='none'
	document.getElementById('transferTab').style.display='none'
	document.getElementById('tooMuchTab').style.display='none'
	document.getElementById('supernovaTab').style.display='none'
	document.getElementById('tooMuchNSTab').style.display='none'
	document.getElementById('tooMuchQSTab').style.display='none'
	document.getElementById('gameBeatTab').style.display='none'
	
	document.getElementById(newTab+'Tab').style.display='block'
	
	if (newTab=='tooMuch' || newTab=='tooMuchNS' || newTab=='tooMuchQS' || newTab=='gameBeat') {
		document.getElementById('tabs').style.display='none'
	} else {
		document.getElementById('tabs').style.display='block'
	}
	tab=newTab
}

function switchGenTab(newTab) {
	document.getElementById('genTiers').style.display='none'
	document.getElementById('genNeutronTiers').style.display='none'
	
	document.getElementById('gen'+newTab).style.display='block'
	
	genTab=newTab
}

function switchSNTab(newTab) {
	document.getElementById('SNupgrades').style.display='none'
	document.getElementById('SNautobuyers').style.display='none'
	document.getElementById('SNbuyinshop').style.display='none'
	document.getElementById('SNneutrontiers').style.display='none'
	document.getElementById('SNaliens').style.display='none'
	
	document.getElementById('SN'+newTab).style.display='block'
	
	SNTab=newTab
}

function continueGame() {
	continued=true
	switchTab('generators')
}

function switchAchTab(newTab) {
	document.getElementById('achNonBonus').style.display='none'
	document.getElementById('achBonus').style.display='none'
	
	document.getElementById('ach'+newTab).style.display='block'
	
	achTab=newTab
}

function switchNotation(tab) {
	if (player.notation=='Standard') {
		player.notation='Letters'
	} else if (player.notation=='Letters') {
		player.notation='Scientific'
	} else if (player.notation=='Scientific') {
		player.notation='Logarithm'
	} else {
		player.notation='Standard'
	} 
	updatePrestigeUpgrades()
}

function formatTime(ms) {
	if (ms < 999) {
		return ms+'ms'
	} else if (ms < 59999) {
		return Math.floor(ms/10)/100+' seconds'
	} else if (ms < 3599999) {
		return Math.floor(ms/60000)+' minutes, '+Math.floor(ms/1000)%60+' seconds'
	} else if (ms < 86399999) {
		return Math.floor(ms/3600000)+' hours, '+Math.floor(ms/60000)%60+' minutes, '+Math.floor(ms/1000)%60+' seconds'
	} else {
		return Math.floor(ms/86400000)+' days, '+Math.floor(ms/3600000)%10+' hours, '+Math.floor(ms/60000)%60+' minutes, '+Math.floor(ms/1000)%60+' seconds'
	}
}

function reset(tier) {
	if (tier==Infinity?confirm('Are you really sure to reset? You will lose everything you have!'):true) {
		resetting=true
		if (tier==Infinity) {
			//Hard reset
			localStorage.clear('save')
			player.playtime=0
			player.totalPoints=new Decimal(0)
			player.prestigePeak=[new Decimal(0),new Decimal(0)]
			player.scientific=0
			player.achievements=[]
			continued=false
		}
		if (tier>=5) {
			//Exotic
			if (tab=='tooMuchQS') {
				switchTab('generators')
			}
			player.particles=(tier==5)? player.particles.add(getPostPrestigePoints(5)) : new Decimal(0)
			player.prestiges[4]=(tier==5)? player.prestiges[4]+1 : 0
			player.prestigePeak[4]=(tier==Infinity)? new Decimal(0) : (player.particles.gte(player.prestigePeak[3]))? player.particles : player.prestigePeak[3]
		}
		if (tier>=4) {
			//Hypernova
			if (tab=='tooMuchNS') {
				switchTab('generators')
			}
			player.quarkStars=(tier==4)? player.quarkStars.add(getPostPrestigePoints(4)) : new Decimal(0)
			player.prestiges[3]=(tier==4)? player.prestiges[3]+1 : 0
			player.prestigePeak[3]=(tier==Infinity)? new Decimal(0) : (player.quarkStars.gte(player.prestigePeak[4]))? player.quarkStars : player.prestigePeak[4]
		}
		if (tier>=3) {
			//Supernova
			if (tab=='tooMuch') {
				switchTab('generators')
			}
			if (tier>3) {
				if (tab=='supernova') {
					switchTab('generators')
				}
				switchGenTab('Tiers')
				switchAchTab('NonBonus')
				switchSNTab('upgrades')
			}
			player.neutronStars=(tier==3)? player.neutronStars.add(getPostPrestigePoints(3)) : new Decimal(0)
			player.fastestSupernova=(tier==Infinity) ? 1e15 : (player.fastestSupernova>player.supernovaPlaytime)? (player.supernovaPlaytime>0 ? player.supernovaPlaytime : 1) : player.fastestSupernova
			player.lastTransferPlaytime=(tier==Infinity) ? 1 : (player.transferPlaytime>0) ? player.transferPlaytime : 1
			player.supernovaPlaytime=0
			player.supernovaUpgrades=(tier==3)? player.supernovaUpgrades : []
			player.supernovaTabsUnlocked=(tier==3)? player.supernovaTabsUnlocked : 0
			if (player.currentChallenge>0) getAch(13)
			player.currentChallenge=0
			player.challengesUnlocked=(tier==3)? player.challengesUnlocked : 0
			player.challengesCompleted=(tier==3)? player.challengesCompleted : []
			player.autobuyers=(tier==3)? player.autobuyers : []
			player.neutrons=new Decimal(0)
			player.neutronTiers={t1:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t1.bought},
			t2:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t2.bought},
			t3:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t3.bought},
			t4:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t4.bought},
			t5:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t5.bought},
			t6:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t6.bought},
			t7:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t7.bought},
			t8:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t8.bought},
			t9:{amount:new Decimal(0),bought:(tier>3)? 0 : player.neutronTiers.t9.bought},
			t10:(tier>3)? 0 : player.neutronTiers.t10}
			player.prestiges[2]=(tier==3)? player.prestiges[2]+1 : 0
			player.prestigePeak[2]=(tier==Infinity)? new Decimal(0) : (player.neutronStars.gte(player.prestigePeak[2]))? player.neutronStars : player.prestigePeak[2]
			if (player.prestiges[2]>0 && tier!=Infinity) getAch(7)
			if (tier==3 && player.fastestSupernova<3600000) getAch(9)
			if (tier==3 && player.fastestSupernova<60000) getAch(10)
			if (player.prestiges[2]>1608) getAch(11)
			if (tier==3 && player.fastestSupernova<1000) getAch(12)
			if (player.generators.t9.bought==player.generators.t10==0 && tier==3) getBonusAch(7)
			if (player.prestiges[1]==0 && tier==3) getBonusAch(8)
			document.getElementById("exportSave").style.display='none'
		}
		if (tier>=2) {
			//Transfer
			if (tier>2 && tab=='transfer') {
				switchTab('generators')
			}
			player.prestigePoints=(tier==2)? player.prestigePoints.add(getPrestigePoints()) : (player.supernovaUpgrades.includes(12))? player.neutronStars : new Decimal(0)
			player.prestigeUpgrades=(tier==2)? player.prestigeUpgrades : []
			player.transferPlaytime=0
			if (player.highestTierTransfer<=5 && tier==2) getBonusAch(6)
			player.highestTierTransfer=0
			player.prestiges[1]=(tier==2)? player.prestiges[1]+1 : 0
			player.prestigePeak[1]=(tier==Infinity)? new Decimal(0) : (player.prestigePoints.gte(player.prestigePeak[1]))? player.prestigePoints : player.prestigePeak[1]
			if (player.prestiges[1]>0 && tier!=Infinity) getAch(5)
			if (player.prestigePower.gt(7989) && player.prestigePower.lt(8001) && tier==2) getBonusAch(5)
		}
		//Prestige
		player.prestigePower=(tier==1)? getPrestigePower() : (tier==2 && player.prestigeUpgrades.includes(8) && player.prestigePower.gt(10))? new Decimal(player.prestigePower.log10()) : new Decimal(1)
		player.points=(player.prestigeUpgrades.includes(7) && player.prestigePeak[1].gte(10))? player.prestigePeak[1] : new Decimal(10)
		player.generators={t1:{amount:new Decimal(0),bought:0},
		t2:{amount:new Decimal(0),bought:0},
		t3:{amount:new Decimal(0),bought:0},
		t4:{amount:new Decimal(0),bought:0},
		t5:{amount:new Decimal(0),bought:0},
		t6:{amount:new Decimal(0),bought:0},
		t7:{amount:new Decimal(0),bought:0},
		t8:{amount:new Decimal(0),bought:0},
		t9:{amount:new Decimal(0),bought:0},
		t10:0}
		player.prestiges[0]=(tier==1)? player.prestiges[0]+1 : 0
		if (player.prestiges[0]>0 && tier!=Infinity) getAch(3)
		player.prestigePeak[0]=(tier==Infinity)? new Decimal(0) : (player.prestigePower.gte(player.prestigePeak[0]))? player.prestigePower : player.prestigePeak[0]
		player.lastUpdate=0
		
		updateGeneratorCosts()
		updatePrestigeUpgrades()
		resetting=false
	}
}

//Testing only, will removed later
brokeLimit=false
	
function freeSupernova() {
	if (player.points.lt(Number.MAX_VALUE)) player.points=new Decimal(Number.MAX_VALUE)
	reset(3)
}

function breakLimit() {
	brokeLimit = !brokeLimit
	if (!brokeLimit && player.points.gt(Number.MAX_VALUE)) reset(3)
}

function respec() {
	player.supernovaUpgrades=[]
	updatePrestigeUpgrades()
}

function infinity() {
	player.neutronStars=new Decimal(Number.MAX_VALUE)
	updatePrestigeUpgrades()
}

setTimeout(function(){
load()
if (player.points.gt(Number.MAX_VALUE*(brokeLimit ? 2 : 1))) {
	reset(3)
}
updateGeneratorCosts()
updatePrestigeUpgrades()
switchTab('generators')
setInterval(function(){
	date=new Date()
	time=date.getTime()
	if (!resetting) {
		if (player.lastUpdate > 0) {
			player.points=player.points.add(player.generators.t1.amount.mul((time-player.lastUpdate)/1000).mul(getGeneratorMultiplier(1)))
			if (player.points.gte('1e100')) getAch(4)
			if (player.points.gte('1e1000')) getAch(19)
			player.totalPoints=player.totalPoints.add(player.generators.t1.amount.mul((time-player.lastUpdate)/1000).mul(getGeneratorMultiplier(1)))
			for (i = 1; i < 9; i++) { 
				player.generators['t'+i].amount=player.generators['t'+i].amount.add(player.generators['t'+(i+1)].amount.mul((time-player.lastUpdate)/1000).mul(getGeneratorMultiplier(i+1)))
			}
			player.generators.t9.amount=player.generators.t9.amount.add(new Decimal(player.generators.t10*(time-player.lastUpdate)/1000).mul(getGeneratorMultiplier(10)))
			player.playtime+=time-player.lastUpdate
			player.transferPlaytime+=time-player.lastUpdate
			player.supernovaPlaytime+=time-player.lastUpdate
			
			if (player.points.gte(Number.MAX_VALUE*(brokeLimit ? 2 : 1))) {
				if (tab!='tooMuch') {
					switchTab('tooMuch')
				}
				player.points=new Decimal(Number.MAX_VALUE*(brokeLimit ? 2 : 1))
				player.generators.t1.amount=new Decimal(0)
			}
			
			if (player.neutronStars.gte(Number.MAX_VALUE)) {
				if (tab!='tooMuchNS') {
					switchTab('tooMuchNS')
				}
				player.neutronStars=new Decimal(Number.MAX_VALUE)
			}
			
			if (player.quarkStars.gte(Number.MAX_VALUE)) {
				if (tab!='tooMuchQS') {
					switchTab('tooMuchQS')
				}
				player.quarkStars=new Decimal(Number.MAX_VALUE)
			}
			
			if (player.particles.gte(Number.MAX_VALUE) && !continued) {
				if (tab!='gameBeat') {
					switchTab('gameBeat')
				}
				player.particles=new Decimal(Number.MAX_VALUE)
			}
		}
		player.lastUpdate=time
	}
	
	if (player.neutronStars.gte(unlockRequirements[player.supernovaTabsUnlocked])) {
		player.supernovaTabsUnlocked++
	}
	
	document.getElementById("points").innerHTML=format(player.points)+' stars'
	document.getElementById("pPS").innerHTML=format(player.generators.t1.amount.mul(getGeneratorMultiplier(1)))+' stars per second'
	if (tab=='generators') {
		if (player.supernovaTabsUnlocked>1) {
			document.getElementById("generatorTabs").style.display='inline'
		} else {
			document.getElementById("generatorTabs").style.display='none'
		}
		
		for (i = 1; i < 10; i++) { 
			document.getElementById("shop"+i).innerHTML='T'+i+' Generator x'+format(player.generators['t'+i].amount)+'<br>'+format(new Decimal(player.generators['t'+i].bought))+' bought<br>Cost: '+format(tierCosts[i-1])
			if (player.points.gte(tierCosts[i-1])) {
				document.getElementById("shop"+i).className='shopButton'
			} else {
				document.getElementById("shop"+i).className='shopUnaffordable'
			}
		}
		document.getElementById("shop10").innerHTML='T10 Generator x'+format(new Decimal(player.generators.t10))+'<br><br>Cost: '+format(tierCosts[9])
		
		if (getPrestigePower().div(player.prestigePower).gte(1000)) getAch(8)
		
		if (player.points.gte(tierCosts[9])) {
			document.getElementById("shop10").className='shopButton'
		} else {
		document.getElementById("shop10").className='shopUnaffordable'
			}
		if (player.points.gte(1e40) && getPrestigePower().gt(player.prestigePower)) {
			document.getElementById("pt1").style.display='inline'
			document.getElementById("pt1").innerHTML='Prestige now to get boost for all production<br><br>Current: '+format(player.prestigePower,3)+'x<br>After: '+format(getPrestigePower(),3)+'x<br>'
		} else {
			document.getElementById("pt1").style.display='none'
		}
		if (player.prestigePower.gt(1)) {
			document.getElementById("pt1stats").style.display='inline'
			document.getElementById("pt1stats").innerHTML='You have '+format(player.prestigePower,3)+'x prestige power for all production.<br>'
		} else {
			document.getElementById("pt1stats").style.display='none'
		}
		if (getPrestigePoints().gte(1)) {
			document.getElementById("pt2").style.display='inline'
			document.getElementById("pt2").innerHTML='Transfer your power to get transfer points.<br>+'+format(getPrestigePoints())+' TP.<br>'
		} else {
			document.getElementById("pt2").style.display='none'
		}
		if (player.prestiges[1]>0 || player.prestigePoints.gt(0)) {
			document.getElementById("pt2stats").style.display='inline'
			document.getElementById("pt2stats").innerHTML='You have '+format(player.prestigePoints)+' transfer points.'
		} else {
			document.getElementById("pt2stats").style.display='none'
		}
	}
	if (tab=='options') {
		document.getElementById("notationOption").innerHTML=player.notation
		if (brokeLimit) {
			document.getElementById("breakOption").innerHTML='Fix limit'	
		} else {
			document.getElementById("breakOption").innerHTML='Break limit'	
		}
	} else {
		document.getElementById("exportSave").style.display='none'
	}
	if (tab=='achievements') {
		var achId = 1
		if (achTab=='NonBonus') {
			do {
				if (player.achievements.includes(achId)) {
					document.getElementById("ach"+achId).className='achCompleted'
				} else {
					document.getElementById("ach"+achId).className='achLocked'
				}
				achId++
			} while (document.getElementById("ach"+achId))	
			document.getElementById("ach19").innerHTML='That\'s a lots and lots. - Reach '+format(new Decimal('1e1000'))+' points'
		} else {
			do {
				if (player.achievements.includes('bonus'+achId)) {
					document.getElementById("achBonus"+achId).className='achCompleted'
				} else {
					document.getElementById("achBonus"+achId).className='achLocked'
				}
				achId++
			} while (document.getElementById("achBonus"+achId))	
			document.getElementById("achBoost").innerHTML='Multiplier for TP gain: '+format(calcTPAchMult(),1)+'x'
		}
		if (player.prestiges[2]>0) {
			document.getElementById("achTabs").style.display='inline'
		} else {
			document.getElementById("achTabs").style.display='none'
		}
	}
	if (tab=='stats') {
		document.getElementById("statsPlaytime").innerHTML='You have played for '+formatTime(player.playtime)+'.'
		document.getElementById("statsTotal").innerHTML='You have gained '+format(player.totalPoints)+' stars in total.'
		document.getElementById("statsPrestige").innerHTML='You have prestige '+player.prestiges[0]+' times.'
		document.getElementById("statsTransfer").innerHTML='You have transferred '+player.prestiges[1]+' times.'
		if (player.prestiges[1]>0) {
			document.getElementById("statsTransferTime").style.display='block'
			document.getElementById("statsTransferTime").innerHTML='Your time in this transfer is '+formatTime(player.transferPlaytime)+'.'
		} else {
			document.getElementById("statsTransferTime").style.display='none'
		}
		if (player.prestiges[2]>0) {
			document.getElementById("statsSupernova").style.display='block'
			document.getElementById("statsSupernovaTime").style.display='block'
			document.getElementById("statsSupernovaFastest").style.display='block'
			document.getElementById("statsSupernova").innerHTML='You have supernova '+player.prestiges[2]+' times.'
			document.getElementById("statsSupernovaTime").innerHTML='Your time in this supernova is '+formatTime(player.supernovaPlaytime)+'.'
		} else {
			document.getElementById("statsSupernova").style.display='none'
			document.getElementById("statsSupernovaTime").style.display='none'
		}
		if (player.fastestSupernova<1e15) {
			document.getElementById("statsSupernovaFastest").style.display='block'
			document.getElementById("statsSupernovaFastest").innerHTML='Your fastest supernova time is '+formatTime(player.fastestSupernova)+'.'
		} else {
			document.getElementById("statsSupernovaFastest").style.display='none'
		}
	}
	if (tab=='transfer') {
		document.getElementById("pt2shop13").innerHTML='You get more TP gain<br><br>Cost: '+format(new Decimal(1000))+' TP'
		document.getElementById("pt2shop14").innerHTML='PP gain are multiplied by TP^0.05.<br><br>Cost: '+format(new Decimal(1500))+' TP'
	}
	if (tab=='supernova') {
		if (SNTab=='upgrades') {
			document.getElementById("pt3shop11").innerHTML='Production are multiplied by '+format(new Decimal(1000))+'x<br><br>Cost: 89 NS'	
		}
	}
	if (tab=='tooMuchNS') {
		if (player.prestiges[3]==0 && player.prestiges[4]==0) {
			document.getElementById('message').style.display='inline'
		} else {
			document.getElementById('message').style.display='none'
		}
	}
	if (tab=='tooMuchQS') {
		if (player.prestiges[4]==0) {
			document.getElementById('message2').style.display='inline'
		} else {
			document.getElementById('message2').style.display='none'
		}
	}
	if (player.prestiges[1]>0 || player.prestigePoints.gt(0)) {
		document.getElementById("transferTabButton").style.display='inline'
	} else {
		document.getElementById("transferTabButton").style.display='none'
	}
	if (player.prestiges[2]>0 || player.neutronStars.gt(0)) {
		document.getElementById("supernovaTabButton").style.display='inline'
	} else {
		document.getElementById("supernovaTabButton").style.display='none'
	}
	if (player.prestiges[3]>0 || player.quarkStars.gt(0)) {
		document.getElementById("hypernovaTabButton").style.display='inline'
	} else {
		document.getElementById("hypernovaTabButton").style.display='none'
	}
	if (player.prestiges[4]>0 || player.particles.gt(0)) {
		document.getElementById("exoticTabButton").style.display='inline'
	} else {
		document.getElementById("exoticTabButton").style.display='none'
	}
	
	var tabId = 1
	do {
		if (player.supernovaTabsUnlocked>=tabId) {
			document.getElementById("SNLockedTab"+tabId).style.display='inline'
		} else {
			document.getElementById("SNLockedTab"+tabId).style.display='none'
		}
		tabId++
	} while (document.getElementById("SNLockedTab"+tabId))
	document.getElementById("nextRequirement").style.display='none'
	document.getElementById("nextRequirementGen").style.display='none'
	if (player.supernovaTabsUnlocked==2) {
		document.getElementById("nextRequirementGen").style.display='inline'
		document.getElementById("nextRequirementGen").innerHTML='Requires '+format(new Decimal(unlockRequirements[player.supernovaTabsUnlocked]))+' NS'
	} else if (tabId-1>player.supernovaTabsUnlocked) {
		document.getElementById("nextRequirement").style.display='inline'
		document.getElementById("nextRequirement").innerHTML='Requires '+format(new Decimal(unlockRequirements[player.supernovaTabsUnlocked]))+' NS'
	}
},50)

setInterval(function(){
	save()
},60000)
},10)
