player={version:0.65,
	build:14,
	playtime:0,
	lastUpdate:0,
	achievements:[],
	notation:'Standard',
	layout:1,
	lightTheme:false,
	showProgress:false,
	story:0,
	stars:new Decimal(10),
	totalStars:new Decimal(10),
	generators:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}],
	prestiges:[0,0,0,0,0,0],
	prestigePeak:[new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
	highestTierPrestiges:[0,0,0,0,0,0],
	prestigePower:new Decimal(1),
	transferPlaytime:0,
	transferPoints:new Decimal(0),
	transferUpgrades:[],
	supernovaPlaytime:0,
	fastestSupernova:Number.MAX_VALUE,
	lastSupernovas:[],
	neutronStars:new Decimal(0),
	supernovaUpgrades:[],
	supernovaTabsUnlocked:0,
	currentChallenge:0,
	challPow:new Decimal(1),
	challengesCompleted:{},
	challConfirm:true,
	autobuyers:{},
	buyinshopFeatures:[],
	autobuyerPriorities:[1,2,3,4,5,6,7,8,9,10],
	neutronBoosts:{basePower:0,powers:[0,0,0],ppPower:0},
	neutrons:new Decimal(0),
	neutronTiers:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}],
	aliens:{unlocked:false,
		amount:0,
		interval:1000,
		chance:1},
	quarkStars:new Decimal(0),
	particles:new Decimal(0),
	strings:new Decimal(0)}
ordinals=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th']
				
lastSave=0
achList={names:{1:'Star creator',2:'Star rich',3:'Star entity',4:'Star god',5:'Upgrading...',6:'Upgraded',7:'Destructive stars',8:'Ridiculous boost',9:'Speedrun',10:'Gonna go fast',
	11:'Through a stellar mile',12:'Completely nerf',13:'Undead stars',14:'Daredevil',15:'Challenged',16:'Machinery',17:'Overpacked',18:'Automation',19:'Boosted',20:'Powered',
	21:'11th tier doesn\'t exist',22:'Prestige superpower',
bonus1:'We don\'t need many tiers',bonus2:'There is no 11th tier',bonus3:'Stellar pyramid',bonus4:'CRITICAL SYSTEM ERROR',bonus5:'So close...',bonus6:'That\'s a low tier',bonus7:'You don\'t need them anymore',bonus8:'Upgrades was distracting for me'},
requirements:{1:'Buy 1 T1 generator',2:'Buy 1 T10 generator',3:'Go prestige',4:'Reach 10.0DT stars',5:'Go transfer',6:'Buy all transfer upgrades',7:'Go supernova',8:'Restart with 1.00Mx PP than the previous',9:'Supernova in a hour',10:'Supernova in a minute',
	11:'Go supernova 1609 times',12:'Buy all supernova upgrades',13:'Supernova in a second',14:'Complete any challenge',15:'Complete all challenges',16:'Buy all interval upgrades',17:'Buy all bulk buy upgrades',18:'Buy 4 buyinshop features',19:'Buy your first neutron boost',20:'Reach 20 neutron boost power',
	21:'Start producing neutrons',22:'Max neutron boost PP gain upgrade',
	bonus1:'Buy 300 tier 1 generators without buying others',bonus2:'Buy exactly 111 tier 10 generators',bonus3:'Buy most tier 10 generators to least tier 1 generators',bonus4:'Buy exactly 404 tier 10 generators',bonus5:'Transfer between 7.990k to 7.999k PP',bonus6:'Transfer without last 5 tiers',bonus7:'Supernova without tiers 9 & 10',bonus8:'Supernova without transfering'}}
tpGainAchMult=1
maxValueLog=Math.log10(Number.MAX_VALUE)
supernovaTabRequirements=[1000,10000,100000,1e20,1e200]
neutronBoost=new Decimal(1)
neutronBoostPP=new Decimal(1)
neutronPower=new Decimal(1)
	
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

costs={tiers:[],tupgs:[1,1,1,1,2,8,20,50,100,250,300,500,750,3000],snupgs:[1,15,20,1,1,1,2,2,3,4,5,6,8,9,10,12,300],intReduceCost:1,bisfeatures:[10000,20000,20000,30000,1e5,1e6],bbCost:1000,neutronBoosts:[0,0,0,0,0],neutronTiers:[]}
	
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

function format(number,decimalPoints=0,offset=0) {
	number = new Decimal(number)
	var precision=((decimalPoints>3)?decimalPoints:3)+offset*3
	if (Number.isNaN(number.mantissa)) {
		return 'NaN'
	} else if (number.abs().gte(Infinity)) {
		return (number.abs().eq(number)?'':'-')+'Infinite'
	} else if (number.e>(2+offset*3)&&(player.notation=='Standard'||(player.notation=='Original'&&number.lt(1e306))||(player.notation=='Hybrid'&&number.lt(1e15)))) {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+abbreviation(label-1)
	} else if (number.e>(2+offset*3)&&(player.notation=='Letters'||(player.notation=='Original'&&number.gte(1e306)))) {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+letter(label)
	} else if (number.e>(2+offset*3)&&player.notation=='Scientific') {
		return number.div(Decimal.pow(10,number.e-offset*3)).toPrecision(precision).toString()+'e'+number.e
	} else if (number.e>(2+offset*3)&&player.notation=='Engineering') {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+'e'+label*3
	} else if (number.e>(2+offset*3)&&player.notation=='Logarithm') {
		var log=number.e
		var mantissaLog=Math.round(Math.log10(number.mantissa)*Math.pow(10,precision))/Math.pow(10,precision)
		if (mantissaLog==1) return 'e'+(log+1)
		return 'e'+log+mantissaLog.toString().replace('0','')
	} else if (number.e>(2+offset*3)&&player.notation=='Same-Letters') {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+sameletter(label)
	} else if (number.e>(2+offset*3)&&(player.notation=='Hybrid'&&number.gte(1e15))) {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+letter(label+22)
	} else if (number.e>(2+offset*3)&&player.notation=='Color') {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+getColor(label)
	} else if (number.e>(2+offset*3)&&player.notation=='Megacolor') {
		var label=Math.max(Math.floor(number.e/3)-offset,0)
		return number.div(Decimal.pow(1000,label)).toPrecision(precision).toString()+getMegacolor(label)
	} else {
		return number.toFixed(decimalPoints).toString()
	}
}

function formatTime(s) {
	if (s == 0.001) {
		return '1 millisecond'
	} else if (s < 0.0011) {
		return Math.floor(s*100000)/100+' milliseconds'
	} else if (s < 0.01) {
		return Math.floor(s*10000)/10+' milliseconds'
	} else if (s < 1) {
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

function formatCosts(number) {
	number=new Decimal(number)
	if (number.gte(Number.MAX_VALUE)&&(!player.breakLimit||player.currentChallenge>0)) {
		return 'Infinite'
	} else {
		return format(number)
	}
}

function formatNSCosts(number) {
	number=new Decimal(number)
	if (number.gte(Number.MAX_VALUE)) {
		return 'Infinite'
	} else {
		return format(number)+' NS'
	}
}

function abbreviation(label) {
	var haListU=['','U','D','T','Q','Qi','S','Sp','O','N']
	var haListT=['','D','V','T','Q','Qi','S','Sp','O','N']
	var haListH=['','C','Dn','Tn','Qn','Qin','Sn','Spn','On','Nn']
	var haListS=['','MI','MC','NA','PC','FM']
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
		var u=label%10
		var t=Math.floor(label/10)%10
		var h=Math.floor(label/100)%10
		abb=''
		
		if (u>0&&!(u==1&&t==0&&h==0&&step>0)) {
			if (u==2&&t==0) {
				abb='B'
			} else {
				abb=haListU[u]
			}
		}
		if (t>0) {
			abb=abb+haListT[t]
			if (u==0&&t>1) {
				abb=abb+'g'
			}
		}
		if (h>0) {
			abb=abb+haListH[h]
		}
		if (u>0||t>0||h>0) {
			if (abbFull=='') {
				abbFull=abb+haListS[step]+abbFull
			} else {
				abbFull=abb+haListS[step]+'-'+abbFull
			}
		}
		label=Math.floor(label/1000)
		step++
	} while (label>0)
	
	return abbFull
}

/*function abbreviation2(step) {
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
}*/

function letter(label) {
	var letters='abcdefghijklmnopqrstuvwxyz'
	var result=''
	do {
		var id=(label-1)%26
		result=letters.slice(id,id+1)+result
		label=Math.floor((label-1)/26)
	} while (label>0)
	return result
}

function sameletter(label) {
	var letters='abcdefghijklmnopqrstuvwxyz'
	var result=''
	var id=(label-1)%26
	result=letters.slice(id,id+1)
	var length=Math.floor((label-1)/26)+1
	if (length>5) {
		result=result+'<span style="font-size:75%">'+length+'</span>'
	} else {
		result=result.repeat(length)
	}
	return result
}

function getColor(label) {		
	var colors=[[0.9,0,0],[0,0.9,0],[0,0,0.9],[0.9,0.9,0],[0,0.9,0.9],[0.9,0,0.9],[0.45,0.45,0.45],[0.9,0.9,0.9],[0.1,0.1,0.1],[0.9,0.45,0]]		
	var result=''
	do {
		var id=(label-1)%500
		var colorid=Math.floor(id/50)		
		var fade=(id/50)%1		
		var red=Math.floor((colors[(colorid+1)%colors.length][0]*fade+colors[colorid%colors.length][0]*(1-fade))*255)		
		var green=Math.floor((colors[(colorid+1)%colors.length][1]*fade+colors[colorid%colors.length][1]*(1-fade))*255)		
		var blue=Math.floor((colors[(colorid+1)%colors.length][2]*fade+colors[colorid%colors.length][2]*(1-fade))*255)		
		result='<span style="width:1em;height:1em;font-size:50%;background-color:rgb('+red+','+green+','+blue+');display:inline-block"></span>'+result
		label=Math.floor((label-1)/500)
	} while (label>0)
	return result
}

function getMegacolor(label) {	
	var result=''
	do {
		var id=(label-1)%16777216
		result='<span style="width:1em;height:1em;font-size:50%;background-color:rgb('+(Math.floor(id/65536)%256)+','+(Math.floor(id/256)%256)+','+(id%256)+');display:inline-block"></span>'+result
		label=Math.floor((label-1)/16777216)
	} while (label>0)
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
	} else if (player.notation=='Same-Letters') {
		player.notation='Original'
	} else if (player.notation=='Original') {
		player.notation='Hybrid'
	} else if (player.notation=='Hybrid') {
		player.notation='Color'
	} else if (player.notation=='Color') {
		player.notation='Megacolor'
	} else {
		player.notation='Standard'
	} 
	updateAchNames()
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
		if (savefile.version==undefined) {
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
		if (savefile.build==undefined) {
			var tempVersion=savefile.version
			savefile.version=0.6
			
			if (tempVersion<0.6001) {
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
			if (tempVersion<0.6002) {
				savefile.currentChallenge=0
			}
			if (tempVersion<0.6003) {
				savefile.prestiges[3]=0
				savefile.prestiges[4]=0
				savefile.prestigePeak[3]=0
				savefile.prestigePeak[4]=0
				savefile.quarkStars=0
				savefile.particles=0
			}
			if (tempVersion<0.6004) {
				savefile.stars=savefile.points
				var temp = []
				for (i=1;i<10;i++) {
					temp.push(savefile.generators['t'+i])
				}
				temp.push({amount:savefile.generators.t10,bought:savefile.generators.t10})
				savefile.generators=temp
				
				delete savefile.points
			}
			if (tempVersion<0.6005) {
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
			if (tempVersion<0.6006) {
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
			if (tempVersion<0.6007) {
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
			if (tempVersion<0.6008) {
				var oldCC=savefile.challengesCompleted
				savefile.challengesCompleted={}
				for (i in oldCC) {
					if (oldCC[parseInt(i)]!=undefined) {
						if (oldCC[parseInt(i)]>0) savefile.challengesCompleted[parseInt(i)]=oldCC[parseInt(i)]
					}
				}
			}
			if (tempVersion<0.6009) {
				savefile.chall8pow=1
				delete savefile.challengesUnlocked
			}
			if (tempVersion<0.601) {
				savefile.showProgress=false
			}
			if (tempVersion<0.6011) {
				savefile.challPow=savefile.chall8pow
				
				delete savefile.chall8pow
			}
			if (tempVersion<0.6012) {
				savefile.challConfirm=true
			}
			savefile.build=0
		}
		if (savefile.version<=0.6) {
			if (savefile.build<14) {
				savefile.lightTheme=false
			}
			if (savefile.build<15) {
				if (savefile.prestiges[2]==undefined) savefile.prestiges[2]=0
			}
			savefile.build=0
		}
		if (savefile.version<=0.65) {
			if (savefile.build<1) {
				savefile.autobuyers={}
				if (savefile.prestiges[2]>0||amountChallengeCompleted()>0) savefile.autobuyers.interval=10
				if (savefile.prestiges[2]>0) savefile.autobuyers.upgrade={lastTick:savefile.playtime+(new Date().getTime()-savefile.lastUpdate)/1000}
				if (savefile.challengesCompleted[1]?savefile.challengesCompleted[1]>0:false) savefile.autobuyers.transfer={lastTick:savefile.playtime+(new Date().getTime()-savefile.lastUpdate)/1000}
				if (savefile.challengesCompleted[2]?savefile.challengesCompleted[2]>0:false) savefile.autobuyers.prestige={lastTick:savefile.playtime+(new Date().getTime()-savefile.lastUpdate)/1000}
				for (i=3;i<13;i++) {
					if (savefile.challengesCompleted[i]?savefile.challengesCompleted[i]>0:false) {
						if (savefile.autobuyers.gens==undefined) {
							savefile.autobuyers.gens={lastTick:savefile.playtime+(new Date().getTime()-savefile.lastUpdate)/1000,tiers:{}}
						}
						savefile.autobuyers.gens.tiers[13-i]=true
					}
				}
			}
			if (savefile.build<2) {
				if (savefile.autobuyers.upgrade!=undefined) savefile.autobuyers.upgrade.disabled=false
				if (savefile.autobuyers.transfer!=undefined) {
					savefile.autobuyers.transfer.times=2
					savefile.autobuyers.transfer.disabled=false
				}
				if (savefile.autobuyers.prestige!=undefined) {
					savefile.autobuyers.prestige.times=3
					savefile.autobuyers.prestige.disabled=false
				}
				if (savefile.autobuyers.gens!=undefined) savefile.autobuyers.gens.bulk=1
			}
			if (savefile.build<3) {
				savefile.lastSupernovas=[]
				savefile.buyinshopFeatures=[]
				savefile.autobuyerPriorities=[1,2,3,4,5,6,7,8,9,10]
			}
			if (savefile.build<4) {
				savefile.strings=0
				savefile.prestiges[5]=0
				savefile.prestigePeak[5]=0
				savefile.highestTierPrestiges[3]=0
				savefile.highestTierPrestiges[4]=0
				savefile.highestTierPrestiges[5]=0
				savefile.breakLimit=(savefile.neutronTiers.bought>0)
			}
			if (savefile.build<5) {
				savefile.story=0
				savefile.neutronBoosts={basePower:1,powers:[0,0,0],ppPower:0}
			}
			if (savefile.build<6) {
				savefile.neutronBoosts.basePower=10
			}
			if (savefile.build<7) {
				if (savefile.neutronBoosts.ppPower>0.05) savefile.neutronBoosts.ppPower=0.05
			}
			if (savefile.build<8) {
				if (savefile.neutronBoosts.basePower>18) savefile.neutronBoosts.basePower=18
				savefile.neutronBoosts.ppPower=Math.round(savefile.neutronBoosts.ppPower*20/5*50)/50
			}
			if (savefile.build<9) {
				if (savefile.neutronBoosts.basePower>15) savefile.neutronBoosts.basePower=15
				savefile.neutronBoosts.ppPower=Math.round(savefile.neutronBoosts.ppPower*5/2*20)/20
			}
			if (savefile.build<11) {
				savefile.neutronBoosts.basePower-=10
				savefile.neutronBoosts.ppPower=Math.round(savefile.neutronBoosts.ppPower*2/5*50)/50
			}
			if (savefile.build<12) {
				if (savefile.notation=='Color') savefile.notation='Standard'
			}
			if (savefile.build<14) {
				savefile.neutronBoosts.ppPower=Math.round(savefile.neutronBoosts.ppPower*3/4*200)/200
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
		for (i=0;i<savefile.lastSupernovas.length;i++) {
			savefile.lastSupernovas[i][1]=new Decimal(savefile.lastSupernovas[i][1])
			savefile.lastSupernovas[i][2]=new Decimal(savefile.lastSupernovas[i][2])
		}
		savefile.neutronStars=new Decimal(savefile.neutronStars)
		savefile.challPow=new Decimal(savefile.challPow)
		if (savefile.autobuyers.transfer!=undefined) savefile.autobuyers.transfer.times=new Decimal(savefile.autobuyers.transfer.times)
		if (savefile.autobuyers.prestige!=undefined) savefile.autobuyers.prestige.times=new Decimal(savefile.autobuyers.prestige.times)
		savefile.neutrons=new Decimal(savefile.neutrons)
					
		savefile.quarkStars=new Decimal(savefile.quarkStars)
		savefile.particles=new Decimal(savefile.particles)
		savefile.strings=new Decimal(savefile.strings)
		
		savefile.version=player.version
		savefile.build=player.build
		player=savefile
		updateTheme(player.lightTheme?'light':'dark')
		if (player.stars.gte(Number.MAX_VALUE)&&!player.breakLimit) reset(3)
		if (player.neutronStars.gte(Number.MAX_VALUE)) reset(4)
		updateCosts()
		updateTPGainAchMult()
		updateAutobuyers()
		updateAchNames()
		console.log('Game loaded!')
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
			player.lightTheme=false
			player.showProgress=false
			player.totalStars=new Decimal(0)
			player.prestigePeak=[new Decimal(1),new Decimal(0),new Decimal(0)]
			player.challConfirm=true
			localStorage.clear('save2')
			
			updateAchNames()
			updateTheme('dark')
		}
		if (tier>5) {
			//Tier 6 - Quantum
			player.prestiges[5]=(tier==6)?player.prestiges[5]+1:0
			player.strings=(tier==6)?player.strings.add(getPostPrestigePoints(6)):new Decimal(0)
			player.prestigePeak[5]=(tier==Infinity)?new Decimal(0):(player.strings.gt(player.prestigePeak[5]))?player.strings:player.prestigePeak[5]
		}
		if (tier>4) {
			//Tier 5 - Exotic
			player.prestiges[4]=(tier==5)?player.prestiges[4]+1:0
			player.particles=(tier==5)?player.particles.add(getPostPrestigePoints(5)):new Decimal(0)
			player.prestigePeak[4]=(tier==Infinity)?new Decimal(0):(player.particles.gt(player.prestigePeak[4]))?player.particles:player.prestigePeak[4]
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
			updateTPGainAchMult()
			
			player.prestiges[3]=(tier==4)?player.prestiges[3]+1:0
			player.quarkStars=(tier==4)?player.quarkStars.add(getPostPrestigePoints(4)):new Decimal(0)
			player.prestigePeak[3]=(tier==Infinity)?new Decimal(0):(player.quarkStars.gt(player.prestigePeak[3]))?player.quarkStars:player.prestigePeak[3]
		}
		if (tier>2) {
			//Tier 3 - Supernova
			if (tab=='toomuch') {
				tab=lastTab
			}
			if (tab=='transfer'&&!player.supernovaUpgrades.includes(2)&&!(player.supernovaUpgrades.includes(3)||player.neutronStars.gt(3))) {
				tab='gen'
			}
			player.lastTransferPlaytime=player.transferPlaytime
			player.prestiges[2]=(tier==3)?player.prestiges[2]+1:0
			if (tier==3&&player.highestTierPrestiges[2]<9) getBonusAch(7)
			player.highestTierPrestiges[2]=0
			player.fastestSupernova=(tier==Infinity)?Number.MAX_VALUE:(player.fastestSupernova>player.supernovaPlaytime)?player.supernovaPlaytime:player.fastestSupernova
			if ((tier==3)?player.lastSupernovas.unshift([player.supernovaPlaytime,player.stars,getPostPrestigePoints(3)])>10:false) {
				player.lastSupernovas.pop()
			} else if (tier==Infinity) {
				player.lastSupernovas=[]
			}
			player.supernovaPlaytime=0
			player.neutronStars=(tier==3)?player.neutronStars.add(getPostPrestigePoints(3)):new Decimal(0)
			player.supernovaUpgrades=(tier==3)?player.supernovaUpgrades:[]
			player.supernovaTabsUnlocked=(tier==3)?player.supernovaTabsUnlocked:0
			if (tier==3&&player.currentChallenge>0) {
				if (player.challengesCompleted[player.currentChallenge]==undefined) {
					player.challengesCompleted[player.currentChallenge]=1
					if (player.currentChallenge>2) {
						if (player.autobuyers.gens==undefined) {
							player.autobuyers.gens={lastTick:player.playtime,tiers:{},bulk:1}
						}
						player.autobuyers.gens.tiers[13-player.currentChallenge]=true
					} else if (player.currentChallenge==2) {
						player.autobuyers.prestige={lastTick:player.playtime,disabled:false,times:new Decimal(3)}
					} else {
						player.autobuyers.transfer={lastTick:player.playtime,disabled:false,times:new Decimal(2)}
					}
				} else {
					player.challengesCompleted[player.currentChallenge]++
				}
			}
			player.currentChallenge=0
			player.challengesCompleted=(tier==3)?player.challengesCompleted:{}
			player.autobuyers=(tier==3)?player.autobuyers:{}
			if (tier==3&&player.autobuyers.interval==undefined) player.autobuyers.interval=10
			if (tier==3&&player.autobuyers.upgrade==undefined) player.autobuyers.upgrade={lastTick:player.playtime,disabled:false}
			player.buyinshopFeatures=(tier==3)?player.buyinshopFeatures:[]
			player.autobuyerPriorities=(tier==3)?player.autobuyerPriorities:[1,2,3,4,5,6,7,8,9,10]
			player.breakLimit=(tier==3)?player.breakLimit:false
			player.neutronBoosts=(tier==3)?player.neutronBoosts:{basePower:0,powers:[0,0,0],ppPower:0}
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
			if (acc>11) getAch(15)
			if (tier==3&&player.prestiges[1]==0) getBonusAch(8)
			
			updateAutobuyers()
		}
		if (tier>1) {
			//Tier 2 - transfer
			player.prestiges[1]=(tier==2)?player.prestiges[1]+1:0
			if (tier==2&&player.highestTierPrestiges[1]<6) getBonusAch(6)
			player.highestTierPrestiges[1]=0
			player.transferPlaytime=0
			player.transferPoints=(tier==2)?player.transferPoints.add(getTransferPoints()):new Decimal(0)
			player.transferUpgrades=(tier==2)?player.transferUpgrades:(player.supernovaUpgrades.includes(2))?[1,2,3,4,5,6,7,8,9,10,11,12,13,14]:[]
			player.prestigePeak[1]=(tier==Infinity)?new Decimal(0):(player.transferPoints.gt(player.prestigePeak[1]))?player.transferPoints:player.prestigePeak[1]
			if (tier==2) getAch(5)
			if (tier==2&&player.prestigePower.gt(7989)&&player.prestigePower.lt(8000)) getBonusAch(5)
		}
		//Tier 1 - prestige
		player.prestiges[0]=(tier==1)?player.prestiges[0]+1:0
		player.highestTierPrestiges[0]=0
		if (tier==1&&getPrestigePower().div(player.prestigePower).gte(1e6)) getAch(8)
		player.prestigePower=(tier==1)?getPrestigePower():(player.supernovaUpgrades.includes(3)&&player.currentChallenge==0)?player.neutronStars.pow(Math.min(5+Math.max(player.neutronStars.log10()-5,0)*2,15)).min((player.breakLimit)?player.prestigePeak[0]:1e16):new Decimal(1)
		player.prestigePeak[0]=(tier==Infinity)?new Decimal(1):(player.prestigePower.gt(player.prestigePeak[0]))?player.prestigePower:player.prestigePeak[0]
		if (tier==1) getAch(3)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		player.challPow=(player.currentChallenge==11)?new Decimal(0.1):new Decimal(1)
		
		updateCosts()
	}
}

function checkToReset(tier) {
	if (tier==1&&player.stars.gte(player.transferUpgrades.includes(7)?1e39:1e40)&&getPrestigePower().gt(player.prestigePower)&&tab!='toomuch') reset(1)
	if (tier==2&&player.prestigePower.gte(100)&&tab!='toomuch') reset(2)
	if (tier==3&&player.stars.gte(Number.MAX_VALUE)) reset(3)
}

function toggleShowProgress() {
	player.showProgress=!(player.showProgress)
}

function updateAchNames() {
	achList.requirements[4]='Reach '+format(1e100)+' stars'
	achList.requirements[8]='Prestige with '+format(1e6)+'x PP than the previous'
	achList.requirements['bonus5']='Transfer between '+format(7990,3)+' to '+format(7999,3)+' PP'
}

function getAch(achId) {
	if (!player.achievements.includes(achId)) {
		player.achievements.push(achId)
	
		var achBox=document.getElementById('achievement')
		achBox.innerHTML='<b>Achievement unlocked!</b><br>'+achList.names[achId]+'<br>'+achList.requirements[achId]
		achBox.style.opacity=1
		
		if (achHide) clearTimeout(achHide)
		var achHide=setTimeout(function(){achBox.style.opacity=0;},6000)
	}
}
	
function switchTab(tabName) {
	tab=tabName
}

function switchTheme() {
	player.lightTheme=!player.lightTheme
	updateTheme(player.lightTheme?'light':'dark')
}

function updateTheme(id) {
	if (!oldDesign) {
		if (id=='dark') {
			document.body.style.backgroundColor='#191919'
			document.body.style.color='#e5e5e5'	
		} else {
			document.body.style.backgroundColor='#e5e5e5'
			document.body.style.color='#191919'	
		}
	}
}
	
function getCost(tier,bulk=1) {
	var multiplier=getCostMultiplier(tier)
	return Decimal.pow(multiplier,bulk).sub(1).div(multiplier-1).times(costs.tiers[tier-1])
}
	
function updateCosts() {
	for (i=1;i<11;i++) {
		var multiplier=getCostMultiplier(i)
		var cost=Decimal.pow(10,(player.currentChallenge==4&&i>1)?1:i*(0.9+0.1*i)).times(Decimal.pow(multiplier,player.generators[i-1].bought))
		if (player.supernovaUpgrades.includes(11)&&player.currentChallenge==0) cost=cost.div(Decimal.pow(multiplier,player.prestigePower.log10()/10))
		if (player.currentChallenge==12) cost=cost.times(Decimal.pow(multiplier,(player.generators[0].bought+player.generators[1].bought+player.generators[2].bought+player.generators[3].bought+player.generators[4].bought+player.generators[5].bought+player.generators[6].bought+player.generators[7].bought+player.generators[8].bought+player.generators[9].bought)/250))
		if (neutronPower.gt(1)) cost=cost.div(neutronPower)
		costs.tiers[i-1]=cost
	}
	if (player.autobuyers.interval!=undefined) costs.intReduceCost=Math.floor(Math.pow((player.autobuyers.interval==undefined)?Infinity:10/player.autobuyers.interval,1.43458799))
	if (player.autobuyers.gens!=undefined) {
		if (player.autobuyers.gens.bulk>255) {
			costs.bbCost=Decimal.times(32e3,Decimal.pow(2,player.autobuyers.gens.bulk/256))
		} else {
			costs.bbCost=player.autobuyers.gens.bulk*250
		}
	}
	costs.neutronBoosts=[Decimal.pow(Number.MAX_VALUE,2+player.neutronBoosts.powers[0]*2),Decimal.pow(Number.MAX_VALUE,(2+player.neutronBoosts.powers[1]*2)/60),Decimal.pow(10,5+player.neutronBoosts.powers[2]),Decimal.pow(10,player.neutronBoosts.basePower+8),Decimal.pow(10,player.neutronBoosts.ppPower/0.015+10)]
	for (i=0;i<10;i++) {
		var baseCosts=[1e20,1e30,1e40,1e50,1e60,1e70,1e80,1e90,1e100,1e110]
		costs.neutronTiers[i]=Decimal.times(baseCosts[i],Decimal.pow(Math.pow(10,i+1),player.neutronTiers[i].bought))
	}
}

function getCostMultiplier(tier) {
	return Math.pow((player.currentChallenge==2)?2.5:1.5,((player.currentChallenge==4)?(tier+2)/3:tier)*(tier+9)/10-((tier==10&&player.transferUpgrades.includes(8))?1:0))
}

function isWorthIt(tier) {
	var cost=costs.tiers[tier-1]
	if (player.currentChallenge==4&&tier>1) return player.generators[tier-2].amount.gte(cost)
	return player.stars.gte(cost)
}
	
function buyGen(tier,bulk=1) {
	var multiplier=getCostMultiplier(tier)
	var resource=(player.currentChallenge==4&&tier>1)?player.generators[tier-2].amount:player.stars
	var maxBulk=Math.floor(resource.div(costs.tiers[tier-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier)+1e-12)
	if (bulk>maxBulk) {
		bulk=maxBulk
	}
	for (i=0;i<6;i++) {
		if (bulk>0&&tier>player.highestTierPrestiges[i]) {
			player.highestTierPrestiges[i]=tier
		}
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
	if (player.generators[0].bought==300&&player.generators[1].bought==0&&
	player.generators[2].bought==0&&player.generators[3].bought==0&&
	player.generators[4].bought==0&&player.generators[5].bought==0&&
	player.generators[6].bought==0&&player.generators[7].bought==0&&
	player.generators[8].bought==0&&player.generators[9].bought==0) getBonusAch(1)
	if (player.generators[9].bought==111) getBonusAch(2)
	if (player.generators[9].bought>player.generators[8].bought&&player.generators[8].bought>player.generators[7].bought&&
		player.generators[7].bought>player.generators[6].bought&&player.generators[6].bought>player.generators[5].bought&&
		player.generators[5].bought>player.generators[4].bought&&player.generators[4].bought>player.generators[3].bought&&
		player.generators[3].bought>player.generators[2].bought&&player.generators[2].bought>player.generators[1].bought&&
		player.generators[1].bought>player.generators[0].bought) getBonusAch(3)
	if (player.generators[9].bought==404) getBonusAch(4)
	
	if (bulk>0&&player.currentChallenge==7) {
		for (j=0;j<tier-1;j++) {
			player.generators[j].amount=new Decimal(0)
		}
	}
	if (bulk>0&&player.currentChallenge==8) player.challPow=new Decimal(1)
	if (bulk>0&&player.currentChallenge==11) player.challPow=new Decimal(0.1)
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
		var bulk=Math.floor(resource.div((player.currentChallenge==4)?1:j).div(costs.tiers[tierNum-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier)+1e-12)
		for (k=0;k<6;k++) {
			if (bulk>0&&j>player.highestTierPrestiges[k]) {
				player.highestTierPrestiges[k]=j
			}
		}
		
		var spentAmount=getCost(tierNum,bulk)
		if (player.currentChallenge==4&&tierNum>1) {
			player.generators[tierNum-2].amount=player.generators[tierNum-2].amount.sub(spentAmount)
		} else {
			player.stars=player.stars.sub(spentAmount)
		}
		player.generators[tierNum-1].bought+=bulk
		player.generators[tierNum-1].amount=player.generators[tierNum-1].amount.add(bulk)
		updateCosts()
	
		if (tierNum==1&&bulk>0) getAch(1)
		if (tierNum==10&&bulk>0) getAch(2)
		if (player.generators[0].bought==300&&player.generators[1].bought==0&&
		player.generators[2].bought==0&&player.generators[3].bought==0&&
		player.generators[4].bought==0&&player.generators[5].bought==0&&
		player.generators[6].bought==0&&player.generators[7].bought==0&&
		player.generators[8].bought==0&&player.generators[9].bought==0) getBonusAch(1)
		if (player.generators[9].bought==111) getBonusAch(2)
		if (player.generators[9].bought>player.generators[8].bought&&player.generators[8].bought>player.generators[7].bought&&
			player.generators[7].bought>player.generators[6].bought&&player.generators[6].bought>player.generators[5].bought&&
			player.generators[5].bought>player.generators[4].bought&&player.generators[4].bought>player.generators[3].bought&&
			player.generators[3].bought>player.generators[2].bought&&player.generators[2].bought>player.generators[1].bought&&
			player.generators[1].bought>player.generators[0].bought) getBonusAch(3)
		if (player.generators[9].bought==404) getBonusAch(4)
	
		if (bulk>0&&player.currentChallenge==7) {
			for (k=0;k<j-1;k++) {
				player.generators[k].amount=new Decimal(0)
			}
		}
		if (bulk>0&&player.currentChallenge==8) player.challPow=new Decimal(1)
		if (bulk>0&&player.currentChallenge==11) player.challPow=new Decimal(0.1)
	}
}
	
function getGeneratorMultiplier(tier) {
	var multi=Decimal.pow((tier==9&&player.supernovaUpgrades.includes(9)&&player.currentChallenge==0)?1.13:(tier==9&&player.transferUpgrades.includes(10))?1.1:(player.currentChallenge==1)?1.03:1.05,player.generators[tier].bought)
	multi=multi.times(player.prestigePower)
	if (player.transferUpgrades.includes(1)&&player.generators[tier].amount.gte(10)) multi=multi.times(Decimal.pow(1.05,Math.floor(player.generators[tier].amount.log10())*((player.currentChallenge==6)?0.9:1)))
	if (player.transferUpgrades.includes(2)) multi=multi.times(getUpgradeMultiplier('tupg2'))
	if (player.transferUpgrades.includes(3)) multi=multi.times(getUpgradeMultiplier('tupg3'))
	if (player.transferUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('tupg4'))
	if (player.transferUpgrades.includes(5)) multi=multi.times(getUpgradeMultiplier('tupg5'))
	if (player.transferUpgrades.includes(12)) multi=multi.times(Math.pow(3,(player.currentChallenge==6)?0.9:1))
		
	if (player.supernovaUpgrades.includes(1)) multi=multi.times(getUpgradeMultiplier('snupg1'))
	if (player.supernovaUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('snupg4'))
	if (player.supernovaUpgrades.includes(5)) multi=multi.times(1+1/(0.2+player.supernovaPlaytime/60))
	if (player.supernovaUpgrades.includes(10)) multi=multi.times(getUpgradeMultiplier('snupg10'))
	if (player.supernovaUpgrades.includes(12)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg12'))
	if (player.supernovaUpgrades.includes(13)) multi=multi.times(getUpgradeMultiplier('snupg13'))
	if (player.supernovaUpgrades.includes(14)&&player.currentChallenge==0) multi=multi.times(10)
	if (player.supernovaUpgrades.includes(15)) multi=multi.times(getUpgradeMultiplier('snupg15'))
	if (player.supernovaUpgrades.includes(16)&&tier==0) multi=multi.times(Decimal.pow(1.05,player.generators[9].amount))
		
	if (player.currentChallenge==5&&tier==0) {
		for (j=1;j<10;j++) {
			multi=multi.times(getGeneratorMultiplier(j).pow(1.01).times(player.generators[j].bought+1))
		}
	}
	if (player.currentChallenge==8||player.currentChallenge==11) multi=multi.times(player.challPow)
	if (player.currentChallenge==10&&tier==9) multi=multi.pow(0.9)
		
	if (neutronBoost.gt(1)) multi=multi.times(neutronBoost)
		
	return multi
}

function getPrestigePower(stars) {
	if (stars==undefined) stars=player.stars
	multi=Decimal.times(stars,player.transferUpgrades.includes(7)?10:1).pow(0.05).times(0.0282842712)
	if (player.transferUpgrades.includes(6)) multi=multi.times(Math.pow(multi.lt(10)?1:multi.log10(),(player.currentChallenge==6)?0.23693598:0.2632622))
	if (player.transferUpgrades.includes(9)) multi=multi.times(Math.pow(2,(player.currentChallenge==6)?0.9:1))
	if (player.transferUpgrades.includes(11)) multi=multi.times(Math.max(Math.pow(2/(1+player.transferPlaytime/120),(player.currentChallenge==6)?0.9:1),1))
	if (player.transferUpgrades.includes(14)) multi=multi.times(Math.pow(player.transferPoints.lt(10)?1:player.transferPoints.log10(),(player.currentChallenge==6)?0.339848464:0.377609405))

	if (player.supernovaUpgrades.includes(6)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg6'))
	if (player.supernovaUpgrades.includes(8)&&player.currentChallenge==0) multi=multi.times(3)
	if (player.currentChallenge==9) multi=multi.pow(0.85)
		
	if (neutronBoostPP.gt(1)) multi=multi.times(neutronBoostPP)
		
	return multi
}

function getTransferPoints() {
	multi=player.prestigePower.div(100).cbrt()
	if (player.transferUpgrades.includes(13)) multi=multi.times(Math.pow(player.prestigePower.log10(),(player.currentChallenge==6)?0.369588574:0.410653971))
	if (player.currentChallenge==9) multi=multi.pow(1.17)

	if (tpGainAchMult>1) multi=multi.times(tpGainAchMult)
	if (player.supernovaUpgrades.includes(7)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg7'))
		
	return multi.floor()
}

function buyTransferUpgrade(num) {
	if (player.transferPoints.gte(costs.tupgs[num-1])&&!player.transferUpgrades.includes(num)&&(num<13||player.transferUpgrades.length>11)) {
		player.transferPoints=player.transferPoints.sub(costs.tupgs[num-1])
		player.transferUpgrades.push(num)
		if (num==8) updateCosts()
		if (player.transferUpgrades.length==14) getAch(6)
	}
}

function getUpgradeMultiplier(name) {
	if (name=='tupg2') return Math.pow(player.playtime/3600,(player.currentChallenge==6)?0.196293863:0.218104292)+1
	if (name=='tupg3') return Math.pow(player.transferPlaytime/60,(player.currentChallenge==6)?0.130304656:0.144782951)+1
	if (name=='tupg4') return Math.pow(player.prestigePeak[0].log10(),(player.currentChallenge==6)?0.0359573356:0.415011197)
	if (name=='tupg5') return Math.pow(player.prestigePeak[1].log10()+1,(player.currentChallenge==6)?0.498457649:0.553841832)
	if (name=='tupg6') return Math.pow(player.stars.times(player.transferUpgrades.includes(7)?10:1).pow(0.05).times(0.0282842712).max(10).log10(),(player.currentChallenge==6)?0.23693598:0.2632622)
		
	if (name=='snupg1') return Math.pow(player.generators[0].bought+player.generators[1].bought+player.generators[2].bought+player.generators[3].bought+player.generators[4].bought+player.generators[5].bought+player.generators[6].bought+player.generators[7].bought+player.generators[8].bought+player.generators[9].bought,0.163123814)+1
	if (name=='snupg4') return Math.pow(player.totalStars.log10(),0.120948539)*2.5
	if (name=='snupg6') return Math.log10(player.prestiges[2])+1
	if (name=='snupg7') return Math.pow((player.neutronStars.lt(1))?1:player.neutronStars.log10()+1,0.5)
	if (name=='snupg10') return Math.pow(1+player.transferUpgrades.length,0.405683871)
	if (name=='snupg12') return Math.min(Math.pow(1+1/player.fastestSupernova,2.32192809),5)
	if (name=='snupg13') return Math.min(Math.pow(1+1/player.lastTransferPlaytime,2.32192809),5)
	if (name=='snupg15') return Math.pow(1+player.achievements.length,0.74492186)
}

function getPostPrestigePoints(tier) {
	var pointsList = [player.stars,player.neutronStars,player.quarkStars,player.particles]
	var log = pointsList[tier-3].log10()
	var progressTillMax = (log-maxValueLog)/(maxValueLog)
	var multi=new Decimal(1)
	return Decimal.pow(10,log/maxValueLog*Math.min(progressTillMax,1)).times(multi).floor()
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
				tpGainAchMult*=1.5
			}
		}
	}
}

function buySupernovaUpgrade(num) {
	if (player.neutronStars.gte(costs.snupgs[num-1])&&!player.supernovaUpgrades.includes(num)) {
		player.neutronStars=player.neutronStars.sub(costs.snupgs[num-1])
		player.supernovaUpgrades.push(num)
		if (num==2&&player.currentChallenge==0) player.transferUpgrades=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
		if (num==3&&player.prestigePower.lt(player.neutronStars.pow(Math.min(5+Math.max(player.neutronStars.log10()-5,0)*2,15)).min((player.breakLimit)?1/0:1e16))&&player.currentChallenge==0) player.prestigePower=player.neutronStars.pow(Math.min(5+Math.max(player.neutronStars.log10()-5,0)*2,15)).min((player.breakLimit)?1/0:1e16)
		if (player.supernovaUpgrades.length>15) getAch(12)
	}
}

function getBonusAch(achId) {
	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		getAch('bonus'+achId)
		updateTPGainAchMult()
	}
}

function startChall(challId) {
	if ((player.currentChallenge==challId)?false:(challId>0&&player.challConfirm)?confirm('You have to go supernova with special conditions before getting a reward. Some upgrades will be no longer working till the challenge ends.'):true) {
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
		player.transferPoints=new Decimal(0)
		player.transferUpgrades=(challId==0&&player.supernovaUpgrades.includes(2))?[1,2,3,4,5,6,7,8,9,10,11,12,13,14]:[]

		//Tier 1 - prestige
		player.prestiges[0]=0
		player.highestTierPrestiges[0]=0
		player.prestigePower=(challId==0&&player.supernovaUpgrades.includes(3))?player.neutronStars.pow(Math.min(5+Math.max(player.neutronStars.log10()-5,0)*2,15)).min((player.breakLimit)?player.prestigePeak[0]:1e16):new Decimal(1)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		player.challPow=(player.currentChallenge==11)?new Decimal(0.1):new Decimal(1)
		
		updateCosts()
		tab='gen'
	}
}

function losereset() {
	player.prestigePower=player.prestigePower.div(2).max(1)
	
	player.stars=new Decimal(10)
	player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
	
	player.challPow=new Decimal(1)
	
	updateCosts()
}

function amountChallengeCompleted() {
	var amount=0
	for (i in player.challengesCompleted) {
		amount++
	}
	return amount
}

function toggleChallConfirm() {
	player.challConfirm=!(player.challConfirm)
}

function updateAutobuyers() {
	if (player.autobuyers.upgrade!=undefined) document.getElementById('toggleAutoupgrade').checked=player.autobuyers.upgrade.disabled
	if (player.autobuyers.transfer!=undefined) {
		document.getElementById('autotransferTimes').value=player.autobuyers.transfer.times.toString()
		document.getElementById('toggleAutotransfer').checked=player.autobuyers.transfer.disabled
	}
	if (player.autobuyers.prestige!=undefined) {
		document.getElementById('autoprestigeTimes').value=player.autobuyers.prestige.times.toString()
		document.getElementById('toggleAutoprestige').checked=player.autobuyers.prestige.disabled
	}
	if (player.autobuyers.gens!=undefined) {
		for (i=1;i<11;i++) {
			document.getElementById('toggleAutogen'+i).disabled=(player.autobuyers.gens.tiers[i]==undefined)
			document.getElementById('toggleAutogen'+i).checked=(player.autobuyers.gens.tiers[i]!=undefined?player.autobuyers.gens.tiers[i]:false)
		}
		for (i=0;i<10;i++) {
			document.getElementById('t'+(i+1)+'priority').value=player.autobuyerPriorities[i]
		}
	}
}

function toggleAutobuyer(id,genId) {
	if (id=='gens') {
		player.autobuyers.gens.tiers[genId]=!player.autobuyers.gens.tiers[genId]
	} else {
		player.autobuyers[id].disabled=!player.autobuyers[id].disabled
	}
}

function reduceInt() {
	if (player.neutronStars.gte(costs.intReduceCost)) {
		player.neutronStars=player.neutronStars.sub(costs.intReduceCost)
		player.autobuyers.interval=Math.max(player.autobuyers.interval*0.8,0.05)
		updateCosts()
		
		if (player.autobuyers.interval==0.05) getAch(16)
	}
}

function buyAutobuyerFeature(num) {
	if (player.neutronStars.gte(costs.bisfeatures[num-1])&&!player.buyinshopFeatures.includes(num)) {
		player.neutronStars=player.neutronStars.sub(costs.bisfeatures[num-1])
		player.buyinshopFeatures.push(num)
		
		if (player.buyinshopFeatures.length>3) getAch(18)
	}
}

function changePriority(id) {
	var value1=document.getElementById('t'+id+'priority').value
	var index1=player.autobuyerPriorities.findIndex(function(c){return c==value1})
	var value2=player.autobuyerPriorities[id-1]
	player.autobuyerPriorities[index1]=value2
	player.autobuyerPriorities[id-1]=value1
	updateAutobuyers()
}

function buyBulk() {
	if (player.neutronStars.gte(costs.bbCost)) {
		player.neutronStars=player.neutronStars.sub(costs.bbCost)
		player.autobuyers.gens.bulk*=2
		updateCosts()
		
		if (player.autobuyers.gens.bulk==256) getAch(17)
	}
}

function changeTimes(id) {
	player.autobuyers[id].times=new Decimal(document.getElementById('auto'+id+'Times').value)
}

function breakLimit() {
	player.breakLimit=!player.breakLimit
	if (player.stars.gt(Number.MAX_VALUE)&&!player.breakLimit) reset(3)
}

function buyBoost(id) {
	switch (id) {
		case 1: 
			if (player.stars.gte(costs.neutronBoosts[0])) {
				player.stars=player.stars.sub(costs.neutronBoosts[0])
				player.neutronBoosts.powers[0]+=1
			}
		break
		
		case 2: 
			if (player.transferPoints.gte(costs.neutronBoosts[1])) {
				player.transferPoints=player.transferPoints.sub(costs.neutronBoosts[2])
				player.neutronBoosts.powers[1]+=1
			}
		break
		
		case 3:
			if (player.neutronStars.gte(costs.neutronBoosts[2])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[2])
				player.neutronBoosts.powers[2]+=1
			}
		break
		
		case 4: 
			if (player.neutronStars.gte(costs.neutronBoosts[3])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[3])
				player.neutronBoosts.basePower+=1
			}
		break
		
		case 5: 
			if (player.neutronStars.gte(costs.neutronBoosts[4])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[4])
				player.neutronBoosts.ppPower=Math.round((player.neutronBoosts.ppPower+0.015)*200)/200
				if (player.neutronBoosts.ppPower==0.15) getAch(22)
			}
		break
	}
	updateCosts()
	
	if (player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2]>0) getAch(19)
	if (player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2]>19) getAch(20)
}
	
function buyNeutronGen(tier) {
	if (player.neutronStars.gte(costs.neutronTiers[tier-1])) {
		player.neutronStars=player.neutronStars.sub(costs.neutronTiers[tier-1])
		player.neutronTiers[tier-1].amount=player.neutronTiers[tier-1].amount.add(1)
		player.neutronTiers[tier-1].bought+=1
		updateCosts()
		
		if (tier==1) getAch(21)
	}
}
	
function getNeutronTierMultiplier(tier) {
	var multi=Decimal.pow(2,player.neutronTiers[tier].bought-1)
	
	return multi
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
			addAmount=player.neutronTiers[i].amount.times(getNeutronTierMultiplier(i)).times(diff)
			if (i==0) {
				player.neutrons=player.neutrons.add(addAmount)
			} else {
				player.neutronTiers[i-1].amount=player.neutronTiers[i-1].amount.add(addAmount)
			}
		}
		
		if (player.currentChallenge==8&&!(player.generators[0].bought==0)) player.challPow=player.challPow.times(Decimal.pow(0.99,diff*2))
		if (player.currentChallenge==11) player.challPow=player.challPow.times(Decimal.pow(1.03,diff)).min(1)
		if (player.stars.gte(1e100)) getAch(4)
		if ((player.stars.gte(Number.MAX_VALUE)||tab=='toomuch')&&(!player.breakLimit||player.currentChallenge>0)) {
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
		if (player.neutronStars.gte(Number.MAX_VALUE)) {
			player.neutronStars=new Decimal(Number.MAX_VALUE)
			reset(4)
		}
		
		if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
			while (supernovaTabRequirements.length>player.supernovaTabsUnlocked && player.neutronStars.gte(supernovaTabRequirements[player.supernovaTabsUnlocked])) {
				player.supernovaTabsUnlocked++
			}
		}
		
		if (player.autobuyers.interval!=undefined) {
			var occurrences=0
			if (!player.autobuyers.upgrade.disabled) {
				occurrences=Math.floor((player.playtime-player.autobuyers.upgrade.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.upgrade.lastTick+=occurrences*player.autobuyers.interval
					var i=0
					while (i<14&&occurrences>0) {
						if (!player.transferUpgrades.includes(i+1)) {
							if (player.transferPoints.gte(costs.tupgs[i])) {
								buyTransferUpgrade(i+1)
								occurrences-=1
							} else {
								occurrences=0
							}
						}
						i+=1
					}
				}
			}
			if (player.autobuyers.transfer!=undefined?!player.autobuyers.transfer.disabled:false) {
				occurrences=Math.floor((player.playtime-player.autobuyers.transfer.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.transfer.lastTick+=occurrences*player.autobuyers.interval
					if (getTransferPoints().div(player.transferPoints.max(1)).gte(player.autobuyers.transfer.times.sub(1))) checkToReset(2)
				}
			}
			if (player.autobuyers.prestige!=undefined?!player.autobuyers.prestige.disabled:false) {
				occurrences=Math.floor((player.playtime-player.autobuyers.prestige.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.prestige.lastTick+=occurrences*player.autobuyers.interval
					if (getPrestigePower().div(player.prestigePower).gte(player.autobuyers.prestige.times)) checkToReset(1)
				}
			}
			if (player.autobuyers.gens!=undefined) {
				occurrences=Math.floor((player.playtime-player.autobuyers.gens.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.gens.lastTick+=occurrences*player.autobuyers.interval
					for (i=0;i<10;i++) {
						var genTier=player.autobuyerPriorities[i]
						if (player.autobuyers.gens.tiers[genTier]!=undefined?player.autobuyers.gens.tiers[genTier]:false) {
							buyGen(genTier,occurrences*player.autobuyers.gens.bulk)
						}
					}
				}
			}
		}
		neutronBoost=Decimal.pow(10-1/(player.neutronBoosts.basePower+1),player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2])
		neutronBoostPP=neutronBoost.pow(player.neutronBoosts.ppPower)
		neutronPower=Decimal.pow(player.neutrons.add(1),player.neutrons.add(1).log10()*15/(player.neutrons.add(1).log10()+15)*10)
		if (neutronPower.gt(1)) updateCosts()
	}
	player.lastUpdate=currentTime
	
	updateElement('stars',formatCosts(player.stars))
	updateElement('sPS',formatCosts(player.generators[0].amount.times(getGeneratorMultiplier(0))))
	if (player.prestiges[1]>0||player.transferPoints.gt(0)||player.transferUpgrades.length>0) {
		showElement('transferTabButton',(oldDesign)?'inline-block':'table-cell')
	} else {
		hideElement('transferTabButton')
	}
	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		showElement('supernovaTabButton',(oldDesign)?'inline-block':'table-cell')
		if (player.supernovaTabsUnlocked==supernovaTabRequirements.length) {
			hideElement('requirement'+((oldDesign)?'':'Child'))
		} else {
			showElement('requirement'+((oldDesign)?'':'Child'),(oldDesign)?'table-cell':'inline-block')
			moveElement('requirement'+((oldDesign)?'':'Child'),((player.supernovaTabsUnlocked==3)?'genTabs':'supernovaTabs')+((oldDesign)?'':'Row'))
			updateElement('requirement','Next at '+format(supernovaTabRequirements[player.supernovaTabsUnlocked])+' NS')
		}
		for (i=1;i<=supernovaTabRequirements.length;i++) {
			if (player.supernovaTabsUnlocked>=i) {
				showElement('supernovaLockedTab'+i,(oldDesign)?'inline-block':'table-cell')
			} else {
				hideElement('supernovaLockedTab'+i)
			}
		}
	} else {
		hideElement('supernovaTabButton')
	}
	if (player.prestiges[3]>0||player.quarkStars.gt(0)) {
		showElement('hypernovaTabButton',(oldDesign)?'inline-block':'table-cell')
	} else {
		hideElement('hypernovaTabButton')
	}
	if (player.prestiges[4]>0||player.particles.gt(0)) {
		showElement('exoticTabButton',(oldDesign)?'inline-block':'table-cell')
	} else {
		hideElement('exoticTabButton')
	}
	if (player.prestiges[5]>0||player.strings.gt(0)) {
		showElement('quantumTabButton',(oldDesign)?'inline-block':'table-cell')
	} else {
		hideElement('quantumTabButton')
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
	if (player.stars.gte(Number.MAX_VALUE)&&tab!='toomuch') {
		if (oldDesign) {
			showElement('prestige3bl','inline')
		} else {
			showElement('prestige3bl','table-cell')
		}
		updateElement('prestige3bl','Explode your stars and get undead stars.<br>+'+format(getPostPrestigePoints(3))+' NS')
	} else {
		hideElement('prestige3bl')
	}
	if (tab=='toomuch') {
		hideElement('tabs')
	} else {
		showElement('tabs','block')
	}
	
	if (tab=='gen') {
		if (player.supernovaTabsUnlocked>2) {
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
				var currentText='<b>Tier '+(i+1)+' generator</b><br>'
				if (i<9?player.generators[i+1].amount.gt(0):false) currentText=currentText+'+'+format(getGeneratorMultiplier(i+1).times(player.generators[i+1].amount))+'/s, '
				if (player.generators[i].amount.eq(player.generators[i].bought)) {
					currentText=currentText+format(player.generators[i].amount,0,1)
				} else {
					currentText=currentText+format(player.generators[i].amount)+', '+format(player.generators[i].bought,0,1)+' bought'
				}
				updateElement(name,currentText+((oldDesign)?'<br>Cost: '+formatCosts(costs.tiers[i]):''))
				if (!oldDesign) {
					var name='t'+(i+1)+'GenButton'+((player.layout==2)?'2':'')
					updateElement(name,'Cost: '+formatCosts(costs.tiers[i]))
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
				updateElement('prestigePower','<b>x'+format(player.prestigePower,3)+'</b> (prestige power) for all production')
			} else {
				hideElement('prestigePower')
			}
			if (player.stars.gte(player.transferUpgrades.includes(7)?1e39:1e40)&&player.prestigePower.lt(getPrestigePower())) {
				if (oldDesign) {
					showElement('prestige1','inline')
				} else {
					showElement('prestige1','table-cell')
				}
				updateElement('prestige1','Reset this game and get the boost.<br>x'+format(getPrestigePower(),3)+' production')
				hideElement('losereset')
			} else {
				hideElement('prestige1')
				if (player.currentChallenge==8) {
					if (oldDesign) {
						showElement('losereset','inline')
					} else {
						showElement('losereset','table-cell')
					}
				} else {
					hideElement('losereset')
				}
			}
			if (player.prestigePower.gte(100)) {
				if (oldDesign) {
					showElement('prestige2','inline')
				} else {
					showElement('prestige2','table-cell')
				}
				updateElement('prestige2','Transfer your power and upgrade this game.<br>+'+format(getTransferPoints())+' TP')
			} else {
				hideElement('prestige2')
			}
			if (player.challPow.lt(1)||player.challenge==1) {
				showElement('challPow','block')
				updateElement('challPow','Challenge '+player.currentChallenge+' power: <b>x'+format(player.challPow,3)+'</b>')
			} else {
				hideElement('challPow')
			}
			if (player.showProgress&&(player.stars.lt(player.transferUpgrades.includes(7)?1e39:1e40)||player.prestigePower.gt(getPrestigePower()))) {
				if (player.prestigePower.gt(1)) {
					var percentage=(getPrestigePower().log10()-getPrestigePower(10).log10())/(player.prestigePower.log10()-getPrestigePower(10).log10())
				} else {
					var percentage=player.stars.add(1).log10()/(player.transferUpgrades.includes(7)?39:40)
				}
				percentage=Math.floor(percentage*10000)/100
				showElement('prestigeProgress','block')
				updateElement('prestigeProgress','<b>Progress till prestige</b>: '+percentage+'%')
			} else {
				hideElement('prestigeProgress')
			}
			if (player.showProgress&&player.prestigePower.lt(100)) {
				showElement('transferProgress','block')
				updateElement('transferProgress','<b>Progress till transfer</b>: '+Math.floor(player.prestigePower.log10()*5000)/100+'%')
			} else {
				hideElement('transferProgress')
			}
			if (player.showProgress&&player.stars.lt(Number.MAX_VALUE)) {
				showElement('supernovaProgress','block')
				updateElement('supernovaProgress','<b>Progress till '+((player.currentChallenge>0)?'challenge goal':'supernova')+'</b>: '+Math.floor(player.stars.add(1).log10()/Math.log10(Number.MAX_VALUE)*10000)/100+'%')
			} else {
				hideElement('supernovaProgress')
			}
			if (player.showProgress&&player.breakLimit&&player.neutronStars.lt(Number.MAX_VALUE)) {
				showElement('hypernovaProgress','block')
				updateElement('hypernovaProgress','<b>Progress till hypernova</b>: '+Math.floor(player.neutronStars.add(1).log10()/Math.log10(Number.MAX_VALUE)*10000)/100+'%')
			} else {
				hideElement('hypernovaProgress')
			}
		}
		if (genTab=='neutronTiers') {
			updateElement('neutrons','You have <b>'+format(player.neutrons)+'</b> neutrons which reduced the cost by <b>'+format(neutronPower)+'x</b>')
			for (i=0;i<10;i++) {
				var currentText='<b>Neutron tier '+(i+1)+' generator</b><br>'
				if (i<9?player.neutronTiers[i+1].amount.gt(0):false) currentText=currentText+'+'+format(getNeutronTierMultiplier(i+1).times(player.neutronTiers[i+1].amount))+'/s, '
				if (player.neutronTiers[i].amount.eq(player.neutronTiers[i].bought)) {
					currentText=currentText+format(player.neutronTiers[i].amount,0,1)
				} else {
					currentText=currentText+format(player.neutronTiers[i].amount)+', '+format(player.neutronTiers[i].bought,0,1)+' bought'
				}
				updateElement('nt'+(i+1)+'Gen',currentText)
				updateElement('nt'+(i+1)+'GenButton','<b>Cost</b>: '+formatNSCosts(costs.neutronTiers[i]))
				if (player.neutronStars.gte(costs.neutronTiers[i])) {
					updateClass('nt'+(i+1)+'GenButton','supernovaButton')
				} else {
					updateClass('nt'+(i+1)+'GenButton','shopUnafford')
				}
			}
		}
	}
	if (tab=='stats') {
		updateElement('statsPlaytime','You have played for '+formatTime(player.playtime)+'.')
		updateElement('statsTPS','You are running this game in '+format(1000/tickspeed,0,1)+' ticks per second.')
		updateElement('statsTotal','You have gained '+format(player.totalStars)+' stars in total.')
		if (player.prestiges[0]>0) {
			showElement('statsPrestige','block')
			updateElement('statsPrestige','You have prestige '+format(player.prestiges[0],0,2)+' times.')
		} else {
			hideElement('statsPrestige')
		}
		if (player.prestiges[1]>0) {
			showElement('statsTransfer','block')
			showElement('statsTransferTime','block')
			updateElement('statsTransfer','You have transferred '+format(player.prestiges[1],0,2)+' times.')
			updateElement('statsTransferTime','Your time in this transfer is '+formatTime(player.transferPlaytime)+'.')
		} else {
			hideElement('statsTransfer')
			hideElement('statsTransferTime')
		}
		if (player.prestiges[2]>0) {
			showElement('statsSupernova','block')
			showElement('statsSupernovaTime','block')
			updateElement('statsSupernova','You have supernova '+format(player.prestiges[2],0,2)+' times.')
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
		for (i=0;i<10;i++) {
			if (player.lastSupernovas[i]==undefined) {
				hideElement('statsPrevSupernova'+(i+1))
			} else {
				showElement('statsPrevSupernova'+(i+1),'block')
				var message='The '+((i>0)?ordinals[i]+' ':'')+'previous supernova took '+formatTime(player.lastSupernovas[i][0])
				if (player.lastSupernovas[i][1].gt(Number.MAX_VALUE)) {
					var message=message+' with '+format(player.lastSupernovas[i][1])+' stars'
				}
				if (player.lastSupernovas[i][2].gt(1)) {
					var message=message+' and gained '+format(player.lastSupernovas[i][2])+' NS'
				}
				updateElement('statsPrevSupernova'+(i+1),message+'.')
			}
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
				if (player.achievements.includes(temp)) {
					if (!oldDesign) updateElement('ach'+temp,'Completed')
					updateClass('ach'+temp,'achCompleted')
				} else {
					if (!oldDesign) updateElement('ach'+temp,'Incomplete')
					updateClass('ach'+temp,'ach')
				}
				temp++
			} while (document.getElementById('ach'+temp))
			if (oldDesign) {
				updateElement('ach4',achList.names[4]+' - '+achList.requirements[4])
				updateElement('ach8',achList.names[8]+' - '+achList.requirements[8])
			} else {
				updateElement('ach4tip','<b>'+achList.names[4]+'</b><br>'+achList.requirements[4])
				updateElement('ach8tip','<b>'+achList.names[8]+'</b><br>'+achList.requirements[8])
			}
		}
		if (achTab=='bonus') {
			updateElement('tpGainAchMult','<b>x'+format(tpGainAchMult,1)+'</b> for TP gain in bonus achievements')
			var temp=1
			do {
				if (player.achievements.includes('bonus'+temp)) {
					if (!oldDesign) updateElement('achbonus'+temp,'Completed')
					updateClass('achbonus'+temp,'achCompleted')
				} else {
					if (!oldDesign) updateElement('achbonus'+temp,'Incomplete')
					updateClass('achbonus'+temp,'ach')
				}
				temp++
			} while (document.getElementById('achbonus'+temp))
			if (oldDesign) {
				updateElement('achbonus5',achList.names['bonus5']+' - '+achList.requirements['bonus5'])
			} else {
				updateElement('achbonus5tip','<b>'+achList.names['bonus5']+'</b><br>'+achList.requirements['bonus5'])
			}
		}
	}
	if (tab=='options') {
		updateElement('notationOption','Notation:<br>'+player.notation)
		updateElement('spOption','Show progress:<br>'+(player.showProgress?'On':'Off'))
		updateElement('ccOption','Challenge confirmation:<br>'+(player.challConfirm?'On':'Off'))
		if (!oldDesign) updateElement('stOption','Light theme:<br>'+(player.lightTheme?'On':'Off'))
	}
	if (tab=='transfer') {
		updateElement('transferPoints','You have <b>'+format(player.transferPoints)+'</b> transfer points')
		var descriptions={2:'Production increase over your playtime',3:'Production increase over your transfer playtime',4:'Production increase over your highest prestige power',5:'Production increase over your highest transfer points',6:'Prestige power gain increase over it\'s exponent'}
		for (i in descriptions) {
			updateElement('tupg'+i+((oldDesign)?'button':''),descriptions[i]+'<br>'+((!oldDesign||player.transferUpgrades.includes(parseInt(i)))?'Current: '+format(getUpgradeMultiplier('tupg'+i),(i>1&&i<7)?2:0)+'x':'Cost: '+costs.tupgs[i-1]+' TP'))
		}
		updateElement('tupg14button',((oldDesign)?'You gain more prestige power over transfer points<br>':'')+'Cost: '+format(3000)+' TP')
		for (i=1;i<15;i++) {
			if (player.transferUpgrades.includes(i)) {
				updateClass('tupg'+i+'button','boughtUpgrade')
			} else if (i>12&&player.transferUpgrades.length<12) {
				updateClass('tupg'+i+'button','lockedUpgrade')
			} else if (player.transferPoints.gte(costs.tupgs[i-1])) {
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
			var descriptions={1:'Production increase over total bought',4:'Production increase over total stars',6:'PP gain increase over supernovas',7:'TP gain increase over neutron stars',10:'Transfer upgrades affect production',12:'Production increase over fastest supernova',13:'Production increase over last transfer time',15:'Production increase over achievements'}
			var odbrValues={1:2,4:2,6:2,7:2,10:2,12:1,13:1,15:1}
			var disabledUpgrades=[2,3,6,7,8,9,11,12,14]
			for (i in descriptions) {
				updateElement('snupg'+i+((oldDesign)?'button':''),descriptions[i]+'<br>'.repeat((oldDesign)?odbrValues[i]:1)+((!oldDesign||player.supernovaUpgrades.includes(parseInt(i)))?'Current: x'+format(getUpgradeMultiplier('snupg'+i),(i==1||i==6||i==7||i==9||i==10)?2:0):'Cost: '+costs.snupgs[i-1]+' NS'))
			}
			for (i=1;i<17;i++) {
				if (player.supernovaUpgrades.includes(i)) {
					if (disabledUpgrades.includes(i)&&player.currentChallenge>0) {
						updateClass('snupg'+i+'button','lockedUpgrade')
					} else {
						updateClass('snupg'+i+'button','boughtUpgrade')
					}
				} else if (player.neutronStars.gte(costs.snupgs[i-1])) {
					updateClass('snupg'+i+'button',(oldDesign)?'supernovaUpgrade':'supernovaButton')
				} else {
					updateClass('snupg'+i+'button',(oldDesign)?'unaffordUpgrade':'shopUnafford')
				}
			}
		}
		if (SNTab=='challenges') {
			var firstRewards=['Autotransfer','Autoprestige']
			if (player.currentChallenge==0) {
				hideElement('exitChall')
			} else {
				showElement('exitChall','inline-block')
			}
			for (i=1;i<13;i++) {
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
				updateElement('chall'+i+'comp','Reward: '+((i>2)?'Tier '+(13-i)+' in autogenerator':firstRewards[i-1])+'<br>Completed '+format(timesCompleted)+' time'+((timesCompleted==1)?'':'s'))
			}
		}
		if (SNTab=='autobuyers') {
			var currentText='Interval: '+formatTime(player.autobuyers.interval)+'<br>'
			updateElement((oldDesign)?'intReduceCost':'interval',currentText)
			if (!oldDesign) currentText=''
			if (player.autobuyers.interval>0.05||oldDesign) {
				if (!oldDesign) showElement('intervalReduction','block')
				updateElement('intReduceCost',currentText+((player.autobuyers.interval==0.05)?'':((oldDesign)?'Reduce the interval by 20%<br>':'')+'Cost: '+formatNSCosts(costs.intReduceCost)))
				if (player.autobuyers.interval==0.05) {
					updateClass('intReduceCost','boughtUpgrade')
				} else if (player.neutronStars.gte(costs.intReduceCost)) {
					updateClass('intReduceCost',(oldDesign)?'supernovaUpgrade':'supernovaButton')
				} else {
					updateClass('intReduceCost',(oldDesign)?'unaffordUpgrade':'shopUnafford')
				}
			} else {
				if (!oldDesign) hideElement('intervalReduction',currentText)
			}
			if (player.autobuyers.transfer==undefined) {
				hideElement('autotransfer')
			} else {
				showElement('autotransfer','table-cell')
			}
			if (player.autobuyers.prestige==undefined) {
				hideElement('autoprestige')
			} else {
				showElement('autoprestige','table-cell')
			}
			if (player.autobuyers.gens==undefined) {
				hideElement('autogenerator')
			} else {
				showElement('autogenerator','table-cell')
			}
			if (!player.buyinshopFeatures.includes(1)) {
				if (!oldDesign) hideElement('bisBulkBuy')
			} else {
				if (!oldDesign) showElement('bisBulkBuy','table-cell')
				currentText='Bulk: '+player.autobuyers.gens.bulk+'x<br>'
				updateElement((oldDesign)?'bbIncreaseCost':'bulkBuy',currentText)
				if (!oldDesign) currentText=''
				if (player.autobuyers.gens.bulk==256&&!player.breakLimit) {
					hideElement('bulkBuyIncrease')
				} else {
					showElement('bulkBuyIncrease','block')
					updateElement('bbIncreaseCost',currentText+((player.autobuyers.gens.bulk==256&&!player.breakLimit)?'':((oldDesign)?'Increase the bulk by 2x.<br>':'')+'Cost: '+formatNSCosts(costs.bbCost)))
					if (player.neutronStars.gte(costs.bbCost)) {
						updateClass('bbIncreaseCost',(oldDesign)?'supernovaUpgrade':'supernovaButton')
					} else {
						updateClass('bbIncreaseCost',(oldDesign)?'unaffordUpgrade':'shopUnafford')
					}
				}
			}
			if (!player.buyinshopFeatures.includes(2)) {
				hideElement('bisPriorities')
			} else {
				showElement('bisPriorities','table-cell')
			}
			if (!player.buyinshopFeatures.includes(3)) {
				invisibleElement('bisPrestigeOptions')
			} else {
				visibleElement('bisPrestigeOptions')
			}
			if (!player.buyinshopFeatures.includes(4)) {
				invisibleElement('bisTransferOptions')
			} else {
				visibleElement('bisTransferOptions')
			}
		}
		if (SNTab=='buyinshop') {
			var descriptions={1:'Autogenerator bulk buy',2:'Autogenerator priorities',3:'Autoprestige options',4:'Autotransfer options',5:'Autotransfer options II',6:'Autonova'}
			var odbrValues={1:2,2:2,3:2,4:2,5:2,6:2}
			for (i in descriptions) {
				updateElement('bisfeature'+i,((oldDesign)?descriptions[i]+'<br>'.repeat(odbrValues[i]):'')+'Cost: '+formatNSCosts(costs.bisfeatures[i-1]))
			}
			for (i=1;i<7;i++) {
				if (player.buyinshopFeatures.includes(i)) {
					updateClass('bisfeature'+i,'boughtUpgrade')
				} else if (player.neutronStars.gte(costs.bisfeatures[i-1])) {
					updateClass('bisfeature'+i,(oldDesign)?'supernovaUpgrade':'supernovaButton')
				} else {
					updateClass('bisfeature'+i,(oldDesign)?'unaffordUpgrade':'shopUnafford')
				}
			}
		}
		if (SNTab=='neutronboosts') {
			if (player.breakLimit) {
				updateElement('breakLimit','Fix limit')
			} else {
				updateElement('breakLimit','Break limit')
			}
			updateElement('neutronboost','x'+(Math.round(1e3-100/(player.neutronBoosts.basePower+1))/100)+'<sup>'+(player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2])+'</sup> = <b>x'+format(neutronBoost)+'</b> for all production')
			
			var items=['powerStars','powerTP','powerNS','basePower','ppPower']
			var boostType=['stars','transfer points','neutron stars']
			
			for (i=0;i<5;i++) {
				var currentText=''
				switch (i) {
					case 0:
					case 1:
					case 2: currentText='Power ('+boostType[i]+'): +'+player.neutronBoosts.powers[i]+' (+1)'+((oldDesign)?'<br><br>':'')
					break
					
					case 3: currentText='Base: '+(Math.round(1e3-100/(player.neutronBoosts.basePower+1))/100)+((player.neutronBoosts.basePower<10)?' (+'+(Math.round(100*((player.neutronBoosts.basePower+1)/(player.neutronBoosts.basePower+2)-player.neutronBoosts.basePower/(player.neutronBoosts.basePower+1)))/100)+')'+((oldDesign)?'<br><br>':''):'')
					break
					
					case 4: currentText='<b>x'+format(neutronBoostPP)+'</b> for PP gain increase<br>Power (prestige): '+player.neutronBoosts.ppPower+((player.neutronBoosts.ppPower<0.15)?' (+0.015)'+((oldDesign)?'<br>':''):'')
					break
				}
				updateElement(items[i]+((oldDesign)?'Cost':''),currentText)
				if (!oldDesign) currentText=''
				if (oldDesign||((i==3)?(player.neutronBoosts.basePower<10):(i==4)?(player.neutronBoosts.ppPower<0.15):true)) {
					showElement(items[i]+'Cost','inline-block')
					if ((i==3)?(player.neutronBoosts.basePower<10):(i==4)?(player.neutronBoosts.ppPower<0.15):true) currentText=currentText+'Cost: '+((i==0)?formatCosts(costs.neutronBoosts[i]):(i==1)?(format(costs.neutronBoosts[i])+' TP'):formatNSCosts(costs.neutronBoosts[i]))
					updateElement(items[i]+'Cost',currentText)
					if ((i==3)?(player.neutronBoosts.basePower==10):(i==4)?(player.neutronBoosts.ppPower==0.15):false) {
						updateClass(items[i]+'Cost','boughtUpgrade')
					} else if ((i==0)?player.stars.gte(costs.neutronBoosts[0]):(i==1)?player.transferPoints.gte(costs.neutronBoosts[1]):player.neutronStars.gte(costs.neutronBoosts[i])) {
						updateClass(items[i]+'Cost',(oldDesign)?'supernovaUpgrade':'supernovaButton')
					} else {
						updateClass(items[i]+'Cost',(oldDesign)?'unaffordUpgrade':'shopUnafford')
					}
				} else {
					hideElement(items[i]+'Cost','block')
				}
			}
		}
	}
	if (tab=='hypernova') {
		updateElement('quarkStars','You have <b>'+format(player.quarkStars)+'</b> quark stars')
	}
	if (tab=='cheat') {
		if (player.breakLimit) {
			updateElement('breakLimitCheat','Fix limit')
		} else {
			updateElement('breakLimitCheat','Break limit')
		}
	}
}

function gameInit() {
	if (oldDesign) console.log('You\'re playing in old design. Some are doesn\'t work unless you play in new design.')

	var tempSave=localStorage.getItem('save2')
	if (tempSave==null||oldDesign) {
		tempSave=localStorage.getItem('save')
	}
	load(tempSave)

	updated=true
	tickspeed=0

	initTooltips()
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
}