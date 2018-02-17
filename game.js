player={version:0.65,
	build:29,
	subbuild:2,
	playtime:0,
	lastUpdate:0,
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
	headstarts:true,
	supernovaTabsUnlocked:0,
	achievements:[],
	currentChallenge:0,
	challPow:new Decimal(1),
	challengesCompleted:{},
	challConfirm:true,
	rewardBoxes:[0,0,0],
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
	strings:new Decimal(0),
	cheatOptions:{breakLimitNS:false}}
ordinals=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th']
				
lastSave=0
story={messages:['Commander: We report that someone is making stars.','Scientist: Oh dear, seeing millions is impossible. How we speed up?','Researcher: It seems the production is going faster. We need an another plan.','Scientist: And there is another flaw similar we did it in the past.','Commander: It seems our stars is now producing exponentially. They block my way too.','Driver: Our plans never work. All of our ways we tried got blocked by the stars.','Helper: I hope the god know how to revert everything!','Sun god: Hello person. Could you give your magic and be your power of god?','Sun god: Thanks, but I had to clear your stars too so the spaceship will move again.','Scientist: Somebody just become more powerful than us. We need to try harder that we are right.',
	'Visitor: I seem that someone have become powerful than us.','Researcher: Let me see who become powerful. I see the light of power too.','Sun god: It seem you have enough power. You can now become spiritual and become more powerful.','Reseacher: Finally, spirits are real. Horray for us!','Scientist: Found out our universe is expanding with new stars.<br>Researcher: Oh yeah, we need to change the amount of stars.','Visitor: Wait a minute, spirits are upgrades...','Wishman: I wish our universe was bigger to have new generators stars.'/*New story messages coming soon.*/],
	requirements:['Buy the first generator','Reach 150 stars','Buy tier 2 generator','Buy tier 3 generator','Buy tier 5 generator','Buy tier 8 generator','Buy tier 10 generator','Reach 1.00DD stars','Go prestige','Reach 10x prestige power',
		'Reach 30x prestige power','Reach 50x prestige power','Reach 100x prestige power','Go transfer','Reach 1.00SV stars','Buy first 2 transfer upgrades','Reach 10.0DT stars','Buy all transfer upgrades','Go supernova','Supernova in a hour',
		'Supernova in a minute','Go supernova 1609 times','Buy all supernova upgrades','Supernova in a second','Complete any challenge','Complete all challenges','Buy all interval upgrades','Buy all bulk buy upgrades','Buy 4 buyinshop features','Buy your first neutron boost',
		'Reach 20 neutron boost power','Start producing neutrons','Max neutron boost PP gain upgrade']}
achList={names:['We don\'t need many tiers','There is no 11th tier','Stellar pyramid','CRITICAL SYSTEM ERROR','That was a good prestige','So close...','That\'s a low tier','You don\'t need them anymore','Upgrades was distracting for me'],
	rewards:[],
	requirements:['Buy 300 tier 1 generators without buying others','Buy exactly 111 tier 10 generators without buying others except tier 1','Buy most tier 10 generators to least tier 1 generators','Buy exactly 404 tier 10 generators without buying tier 9','Prestige with 10kx PP than the previous','Transfer between 7.990k to 7.999k PP','Transfer without last 5 tiers','Supernova without tiers 9 & 10','Supernova without transfering']}
maxValueLog=Math.log10(Number.MAX_VALUE)
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

keysPressed=[]
notOnFocus=true

costs={tiers:[],tupgs:[1,1,1,1,2,8,20,50,100,250,300,500,750,3000],snupgs:[1,15,300,1,1,1,2,2,3,4,5,6,8,9,10,12],intReduceCost:1,bisfeatures:[10000,20000,20000,30000,1e5,1e6],bbCost:1000,neutronBoosts:[0,0,0,0,0],neutronTiers:[]}
streqs=[1000,10000,100000,1e24,1e200]
challreqs=[200,300,500,750,1000,1200,1500,1750,2000,2200,2500,2750]
	
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

function onFocus() {
	notOnFocus=false
}

function onUnfocus() {
	notOnFocus=true
}

function switchLayout() {
	player.layout=player.layout%2+1
}

function format(number,decimalPoints=2,offset=0,rounded=true) {
	number = new Decimal(number)
	var precision=decimalPoints+offset*3
	if (Number.isNaN(number.mantissa)) return 'NaN'
	if (number.lte(Number.NEGATIVE_INFINITY)) return '-Infinite'
	if (number.gte(Number.POSITIVE_INFINITY)) return 'Infinite'
	if (number.lt(Math.pow(1000,offset+1))) {
		return number.toFixed(rounded?0:decimalPoints)
	}
	if (player.notation=='Standard') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+abbreviation(Decimal.sub(abbid,1))
	} else if (player.notation=='Letters') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+letter(abbid)
	} else if (player.notation=='Scientific') {
		if (Decimal.gt(number.exponent,99999)) {
			var exponent=new Decimal(number.exponent)
			return (number.mantissa*Math.pow(10,offset*3)).toFixed(precision)+'e'+exponent.mantissa.toFixed(decimalPoints)+'e'+exponent.exponent
		}
		return (number.mantissa*Math.pow(10,offset*3)).toFixed(precision)+'e'+number.exponent
	} else if (player.notation=='Engineering') {
		var remainder=BigInteger.remainder(number.exponent,3)
		if (Decimal.gt(number.exponent,100001)) {
			var exponent=Decimal.div(number.exponent,3).floor().times(3)
			var abbid2=BigInteger.divide(exponent.exponent,3)
			var remainder2=BigInteger.remainder(exponent.exponent,3)
			return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+'e'+exponent.mantissa.toFixed(decimalPoints)+'e'+abbid2*3
		}
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+'e'+Math.round(Decimal.div(number.exponent,3).floor().sub(offset).times(3).toNumber())
	} else if (player.notation=='Logarithm') {
		if (Decimal.gt(number.exponent,99999)) {
			return 'ee'+Decimal.log10(number.log10()).toFixed(precision)
		}
		return 'e'+number.log10().toFixed(precision)
	} else if (player.notation=='Same-Letters') {
		var abbid=BigInteger.divide(number.exponent,3)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+sameletter(abbid)
	} else if (player.notation=='Hyper-E') {
		if (Decimal.gt(number.exponent,99999)) {
			var exponent=new Decimal(number.exponent)
			return exponent.mantissa.toFixed(decimalPoints)+'E'+exponent.exponent+'#2'
		}
		return (number.mantissa*Math.pow(10,offset*3)).toFixed(precision)+'e'+number.exponent
	} else if (player.notation=='Original') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		if (Decimal.gt(abbid,300)) return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+letter(abbid)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+abbreviation(Decimal.sub(abbid,1))
	} else if (player.notation=='Hybrid') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		if (Decimal.gt(abbid,4)) return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+letter(Decimal.add(abbid,23))
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+abbreviation(Decimal.sub(abbid,1))
	} else if (player.notation=='Color') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+getColor(abbid)
	} else if (player.notation=='Megacolor') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+getMegacolor(abbid)
	} else if (player.notation=='Progress') {
		var abbid=Decimal.div(number.exponent,3).floor().sub(offset)
		var remainder=BigInteger.remainder(number.exponent,3)
		return (number.mantissa*Math.pow(10,remainder+offset*3)).toFixed(precision)+getProgress(abbid)
	} else {
		return '?'
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
	if (number.gte(Number.MAX_VALUE)&&!player.cheatOptions.breakLimitNS) {
		return 'Infinite'
	} else {
		return format(number)+' NS'
	}
}

function abbreviation(label) {
	var haListU=['','U','D','T','Q','Qi','S','Sp','O','N']
	var haListT=['','D','V','T','Q','Qi','S','Sp','O','N']
	var haListH=['','C','Dn','Tn','Qn','Qin','Sn','Spn','On','Nn']
	step=Math.max(Math.floor(Decimal.log(label,1000)-3),0)
	label=Decimal.div(label,Decimal.pow(1000,step))
	abb=''
	abbFull=(step==0)?'':'<span style="font-size:75%">...(+'+step+')</span>'
	
	if (label==0) {
		return 'k'
	}
	if (label==1) {
		return 'M'
	}
	do {
		var u=Math.floor(label.toNumber())%10
		var t=Math.floor(label.toNumber()/10)%10
		var h=Math.floor(label.toNumber()/100)%10
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
		highAbb=abbreviation2(step)
		if (u>0||t>0||h>0) {
			if (abbFull=='') {
				abbFull=abb+highAbb+abbFull
			} else {
				abbFull=abb+highAbb+'-'+abbFull
			}
		}
		label=Decimal.div(label,1000)
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
	var ha=''
	
	if (step==0) {
		return ''
	}
	if (haListB[step]) {
		return haListB[step]
	}
	if (step>99) {
		if (step<200) {
			ha = 'c'
		} else {
			ha = haListS[Math.floor(step/100)%100]
			var ha2=''
			if (step>9999) {
				if (step<20000) {
					ha2 = 'c'
				} else {
					ha2 = haListS[Math.floor(step/10000)]
				}
				if (step%10000<1000) {
					ha2 = 'e'+ha2
				}
			}
			ha = ha+ha2
		}
		if (step%100<10) {
			ha = 'e'+ha
		}
	}
	return abb2+ha
}

function letter(label) {
	var letters='abcdefghijklmnopqrstuvwxyz'
	var result=''
	label=new Decimal(label)
	var skip=Math.max(Math.floor(Decimal.times(label,25).add(1).log(26))-10,0)
	if (skip>0) {
		result='<span style="font-size:75%">...(+'+skip+')</span>'
		label=Decimal.div(label,Decimal.pow(26,skip))
	}
	label=Math.floor(Decimal.toNumber(label))
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
	var id=BigInteger.remainder(BigInteger.subtract(label,1),26)
	result=letters.slice(id,id+1)
	var length=BigInteger.divide(BigInteger.add(label,25),26)
	if (length>5) {
		result=result+'<span style="font-size:75%">'+format(length)+'</span>'
	} else {
		result=result.repeat(length)
	}
	return result
}

function getColor(label) {		
	var colors=[[0.9,0,0],[0,0.9,0],[0,0,0.9],[0.9,0.9,0],[0,0.9,0.9],[0.9,0,0.9],[0.45,0.45,0.45],[0.9,0.9,0.9],[0.1,0.1,0.1],[0.9,0.45,0]]		
	var result=''
	label=new Decimal(label)
	var skip=Math.max(Math.floor(Decimal.times(label,29).add(1).log(30))-10,0)
	if (skip>0) {
		result='<span style="font-size:75%">...(+'+skip+')</span>'
		label=Decimal.div(label,Decimal.pow(30,skip))
	}
	label=Math.floor(Decimal.toNumber(label))
	do {
		var id=(label-1)%30
		var colorid=Math.floor(id/3)%10		
		var fade=(id/3)%1		
		var red=Math.floor((colors[(colorid+1)%10][0]*fade+colors[colorid%10][0]*(1-fade))*255)		
		var green=Math.floor((colors[(colorid+1)%10][1]*fade+colors[colorid%10][1]*(1-fade))*255)		
		var blue=Math.floor((colors[(colorid+1)%10][2]*fade+colors[colorid%10][2]*(1-fade))*255)		
		result='<span style="width:1em;height:1em;font-size:50%;background-color:rgb('+red+','+green+','+blue+');display:inline-block"></span>'+result
		label=Math.floor((label-1)/30)
	} while (label>0)
	return result
}

function getMegacolor(label) {	
	var result=''
	label=new Decimal(label)
	var skip=Math.max(Math.floor(Decimal.times(label,16777215).add(1).log(16777216))-2,0)
	if (skip>0) {
		result='<span style="font-size:75%">...(+'+skip+')</span>'
		label=Decimal.div(label,Decimal.pow(16777216,skip))
	}
	label=Math.floor(Decimal.toNumber(label))
	do {
		var id=(label-1)%16777216
		result='<span style="width:1em;height:1em;font-size:50%;background-color:rgb('+(Math.floor(id/65536)%256)+','+(Math.floor(id/256)%256)+','+(id%256)+');display:inline-block"></span>'+result
		label=Math.floor((label-1)/16777216)
	} while (label>0)
	return result	
}

function getProgressColor(label) {
	var colors=[[0.9,0,0],[0,0.9,0],[0,0,0.9],[0.9,0.9,0],[0,0.9,0.9],[0.9,0,0.9],[0.45,0.45,0.45],[0.9,0.9,0.9],[0.1,0.1,0.1],[0.9,0.45,0]]		
	var colorid=label%10
	var fade=(Math.floor(label/10)/3+Math.floor(label/30)/2+Math.floor(label/60)/5+Math.floor(label/300)/7+Math.floor(label/2100)/11+Math.floor(label/23100)/13)%1
	var red=Math.floor((colors[(colorid+1)%10][0]*fade+colors[colorid%10][0]*(1-fade))*255)		
	var green=Math.floor((colors[(colorid+1)%10][1]*fade+colors[colorid%10][1]*(1-fade))*255)		
	var blue=Math.floor((colors[(colorid+1)%10][2]*fade+colors[colorid%10][2]*(1-fade))*255)		
	return 'rgb('+red+','+green+','+blue+')'
}

function getProgress(label) {
	var labellog=Math.max(Math.floor(Decimal.log(label,maxValueLog))-6,0)
	var boxes=''
	for (i=6;i>=0;i--) {
		boxes='<span style="position:absolute;width:'+Decimal.div(label,Decimal.pow(maxValueLog,labellog+i)).toNumber()*3%maxValueLog%1*100+'%;height:100%;background-color:'+getProgressColor(labellog+i)+';display:inline-block"></span>'+boxes
	}
	return '<span style="position:relative;text-align:left;width:4em;height:1em;font-size:50%;background-color:#e50000;display:inline-block">'+boxes+'</span>'
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
		player.notation='Hyper-E'
	} else if (player.notation=='Hyper-E') {
		player.notation='Original'
	} else if (player.notation=='Original') {
		player.notation='Hybrid'
	} else if (player.notation=='Hybrid'&&keysPressed.includes(16)) {
		player.notation='Color'
	} else if (player.notation=='Color') {
		player.notation='Megacolor'
	} else if (player.notation=='Megacolor') {
		player.notation='Progress'
	} else {
		player.notation='Standard'
	} 
	updateStory()
}

function save() {
	try {
		localStorage.setItem('savemgn',btoa(JSON.stringify(player)))
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
			if (savefile.build<15) {
				for (i=0;i<savefile.lastSupernovas.length;i++) {
					savefile.lastSupernovas[i][3]=1
				}
			}
			if (savefile.build<16) {
				savefile.rewardBoxes=[0,0,0]
			}
			if (savefile.build<17) {
				if (savefile.autobuyers.transfer!=undefined) savefile.autobuyers.transfer.tp=(savefile.buyinshopFeatures.includes(5))?1e10:1/0
				if (savefile.buyinshopFeatures.includes(6)) savefile.autobuyers.supernova={lastTick:player.playtime,disabled:false,ns:100}
			}
			if (savefile.build<23) {
				var oldAch=savefile.achievements
				savefile.story=[]
				savefile.achievements=[]
				for (i=0;i<oldAch.length;i++) {
					if (typeof(oldAch[i])=='number') {
						savefile.story.push(oldAch[i])
					} else {
						savefile.achievements.push(oldAch[i])
					}
				}
			}
			if (savefile.build<24) {
				var oldAch=savefile.achievements
				savefile.achievements=[]
				for (i=1;i<9;i++) {
					if (oldAch.includes('bonus'+i)) {
						savefile.achievements.push(i)
					}
				}
				
				var oldStory=savefile.story
				var newStoryIds=[1,7,9,17,14,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]
				savefile.story=0
				for (i=1;i<23;i++) {
					var j=i
					if (i==3) {
						j=4
					} else if (i==4) {
						j=3
					}
					if (oldStory.includes(i)) {
						savefile.story=newStoryIds[i-1]
					}
				}
				
				savefile.headstarts=true
			}
			if (savefile.build<26) {
				var oldAch=savefile.achievements
				savefile.achievements=[]
				for (i=1;i<9;i++) {
					if (i>4) {
						savefile.achievements.push(i+1)
					} else {
						savefile.achievements.push(i)
					}
				}
				
				if (savefile.story>19) {
					savefile.story--
					savefile.achievements.push(5)
				}
			}
			if (savefile.build<27) {
				savefile.challengeUnlocked=0
			}
			if (savefile.build<=28) {
				savefile.subbuild=13
				if (savefile.subbuild<14) {
					for (i=0;i<6;i++) {
						if (savefile.prestigePeak[i]==undefined) savefile.prestigePeak[i]=0
					}
					if (Decimal.gt(savefile.prestigePower,savefile.prestigePeak[0])) savefile.prestigePeak[0]=savefile.prestigePower
					if (Decimal.gt(savefile.transferPoints,savefile.prestigePeak[1])) savefile.prestigePeak[1]=savefile.transferPoints
					if (Decimal.gt(savefile.neutronStars,savefile.prestigePeak[2])) savefile.prestigePeak[2]=savefile.neutronStars
				}
				savefile.subbuild=1
			}
		}
		
		savefile.stars=new Decimal(savefile.stars)
		savefile.totalStars=new Decimal(savefile.totalStars)
		for (i=0;i<10;i++) {
			savefile.generators[i].amount=new Decimal(savefile.generators[i].amount)
			if (savefile.generators[i].bought>9007199254740992) savefile.generators[i].bought=BigInteger.parseInt(savefile.generators[i].bought)
			savefile.neutronTiers[i].amount=new Decimal(savefile.neutronTiers[i].amount)
			if (savefile.neutronTiers[i].bought>9007199254740992) savefile.neutronTiers[i].bought=BigInteger.parseInt(savefile.neutronTiers[i].bought)
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
		if (savefile.autobuyers.transfer!=undefined) {
			savefile.autobuyers.transfer.times=new Decimal(savefile.autobuyers.transfer.times)
			savefile.autobuyers.transfer.tp=new Decimal(savefile.autobuyers.transfer.tp)
		}
		if (savefile.autobuyers.prestige!=undefined) savefile.autobuyers.prestige.times=new Decimal(savefile.autobuyers.prestige.times)
		if (savefile.autobuyers.supernova!=undefined) savefile.autobuyers.supernova.ns=new Decimal(savefile.autobuyers.supernova.ns)
		if (savefile.autobuyers.gens!=undefined) if (savefile.autobuyers.gens.bulk>9007199254740992) savefile.autobuyers.gens.bulk=BigInteger.parseInt(savefile.autobuyers.gens.bulk)
		for (i=0;i<3;i++) {
			if (savefile.neutronBoosts.powers[i]>9007199254740992) savefile.neutronBoosts.powers[i]=BigInteger.parseInt(savefile.neutronBoosts.powers[i])
		}
		savefile.neutrons=new Decimal(savefile.neutrons)
					
		savefile.quarkStars=new Decimal(savefile.quarkStars)
		savefile.particles=new Decimal(savefile.particles)
		savefile.strings=new Decimal(savefile.strings)
		
		//Cheat
		if (savefile.cheatOptions==undefined) savefile.cheatOptions={}
		if (savefile.cheatOptions.breakLimitNS==undefined) savefile.cheatOptions.breakLimitNS=false
		
		savefile.version=player.version
		savefile.build=player.build
		savefile.subbuild=player.subbuild
		player=savefile
		updateTheme(player.lightTheme?'light':'dark')
		if (player.stars.gte(Number.MAX_VALUE)&&!player.breakLimit) { player.stars=new Decimal(Number.MAX_VALUE); reset(3) }
		if (player.neutronStars.gte(Number.MAX_VALUE)&&!player.cheatOptions.breakLimitNS) { player.neutronStars=new Decimal(Number.MAX_VALUE); reset(4) }
		if (player.quarkStars.gte(Number.MAX_VALUE)) { player.quarkStars=new Decimal(Number.MAX_VALUE); reset(5) }
		if (player.particles.gte(Number.MAX_VALUE)) { player.particles=new Decimal(Number.MAX_VALUE); reset(6) }
		updateCosts()
		updateAutobuyers()
		updateStory()
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

function reset(tier,challid=0,gain=1) {
	if (tier==Infinity?confirm('Are you sure to reset your game? You will lose everything you have!'):true) {
		if (challid>0&&player.challConfirm) switch (tier) {
			case 3: if (!confirm('You have to go supernova with special conditions before getting a reward. Some upgrades will be no longer working till the challenge ends.')) {return} break;
		}
		if (tier==Infinity) {
			// Highest tier - reset
			player.playtime=0
			player.lastUpdate=0
			player.layout=1
			player.story=0
			player.notation='Standard'
			player.lightTheme=false
			player.showProgress=false
			player.totalStars=new Decimal(0)
			player.prestigePeak=[new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
			player.headstarts=true
			player.achievements=[]
			player.challConfirm=true
			localStorage.clear('savemgn')
			
			updateStory()
			updateTheme('dark')
		}
		if (tier>5) {
			//Tier 6 - Quantum
			player.prestiges[5]=(tier==6)?player.prestiges[5]+gain:0
			player.strings=(tier==6)?player.strings.add(getPostPrestigePoints(6)):new Decimal(0)
			player.prestigePeak[5]=(tier==Infinity)?new Decimal(0):(player.strings.gt(player.prestigePeak[5]))?player.strings:player.prestigePeak[5]
		}
		if (tier>4) {
			//Tier 5 - Exotic
			player.prestiges[4]=(tier==5)?player.prestiges[4]+gain:0
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
			
			player.rewardBoxes=[0,0,0]
			player.supernovaUpgrades=[]
			player.supernovaTabsUnlocked=0
			player.challengeUnlocked=0
			player.challengesCompleted={}
			player.autobuyers={}
			player.buyinshopFeatures=[]
			player.autobuyerPriorities=[1,2,3,4,5,6,7,8,9,10]
			player.breakLimit=false
			player.neutronBoosts={basePower:0,powers:[0,0,0],ppPower:0}
			for (i=0;i<10;i++) {
				player.neutronTiers[i].bought=0
			}
			player.aliens={unlocked:false,
				amount:0,
				interval:1000,
				chance:1}
			player.prestiges[3]=(tier==4)?player.prestiges[3]+gain:0
			player.quarkStars=(tier==4)?player.quarkStars.add(getPostPrestigePoints(4)):new Decimal(0)
			player.prestigePeak[3]=(tier==Infinity)?new Decimal(0):(player.quarkStars.gt(player.prestigePeak[3]))?player.quarkStars:player.prestigePeak[3]
			
			updateCosts('autobuyers')
			updateCosts('neutronboosts')
			updateCosts('neutrontiers')
		}
		if (tier>2) {
			//Tier 3 - Supernova
			if (tab=='toomuch') {
				tab=lastTab
			}
			if (tab=='transfer'&&!player.supernovaUpgrades.includes(2)&&!(player.supernovaUpgrades.includes(3)||player.neutronStars.gt(3))) {
				tab='gen'
			}
			if (challid>0) {
				tab='gen'
			}
			player.transferUpgrades=(player.supernovaUpgrades.includes(2)&&player.headstarts)?[1,2,3,4,5,6,7,8,9,10,11,12,13,14]:[]
			player.lastTransferPlaytime=player.transferPlaytime
			player.prestiges[2]=(tier==3)?player.prestiges[2]+gain:0
			if (tier==3&&player.highestTierPrestiges[2]<9) getBonusAch(8)
			player.highestTierPrestiges[2]=0
			player.fastestSupernova=(tier==Infinity)?Number.MAX_VALUE:(player.fastestSupernova>player.supernovaPlaytime)?player.supernovaPlaytime:player.fastestSupernova
			if ((tier==3&&gain>0)?player.lastSupernovas.unshift([player.supernovaPlaytime,player.stars,getPostPrestigePoints(3),gain])>10:false) {
				player.lastSupernovas.pop()
			} else if (tier==Infinity) {
				player.lastSupernovas=[]
			}
			player.supernovaPlaytime=0
			player.neutronStars=(tier==3)?player.neutronStars.add((gain>0)?getPostPrestigePoints(3):0):new Decimal(0)
			if (tier==3&&gain>0&&player.currentChallenge>0) {
				if (player.challengesCompleted[player.currentChallenge]==undefined) {
					player.challengesCompleted[player.currentChallenge]=1
					player.rewardBoxes[0]++
					tab='supernova'
					SNTab='autobuyers'
				} else {
					player.challengesCompleted[player.currentChallenge]++
				}
			}
			player.currentChallenge=(tier==3)?challid:0
			if (tier==3&&gain>0&&player.autobuyers.interval==undefined) player.autobuyers.interval=10
			if (tier==3&&gain>0&&player.autobuyers.upgrade==undefined) {player.autobuyers.upgrade={lastTick:player.playtime,disabled:false}; updateAutobuyers()}
			player.neutrons=new Decimal(0)
			for (i=0;i<10;i++) {
				player.neutronTiers[i].amount=new Decimal(player.neutronTiers[i].bought)
			}
			player.prestigePeak[2]=(tier==Infinity)?new Decimal(0):(player.neutronStars.gt(player.prestigePeak[2]))?player.neutronStars:player.prestigePeak[2]
			if (tier==3) {} // newStory(7)
			if (player.fastestSupernova<3600) {} // newStory(9)
			if (player.fastestSupernova<60) {} // newStory(10)
			if (player.prestiges[2]>1608) {} // newStory(11)
			if (player.fastestSupernova<1) {} // newStory(13)
			var acc=amountChallengeCompleted()
			if (acc>0) {} // newStory(14)
			if (acc>11) {} // newStory(15)
			if (tier==3&&player.prestiges[1]==0) getBonusAch(9)
		}
		if (tier>1) {
			//Tier 2 - transfer
			player.prestiges[1]=(tier==2)?player.prestiges[1]+gain:0
			if (tier==2&&player.highestTierPrestiges[1]<6) getBonusAch(7)
			player.highestTierPrestiges[1]=0
			player.transferPlaytime=0
			player.transferPoints=(tier==2)?player.transferPoints.add(getTransferPoints()):new Decimal(0)
			player.prestigePeak[1]=(tier==Infinity)?new Decimal(0):(player.transferPoints.gt(player.prestigePeak[1]))?player.transferPoints:player.prestigePeak[1]
			if (tier==2) newStory(14)
			if (tier==2&&player.prestigePower.gt(7989)&&player.prestigePower.lt(8000)) getBonusAch(6)
		}
		//Tier 1 - prestige
		player.prestiges[0]=(tier==1)?player.prestiges[0]+gain:0
		player.highestTierPrestiges[0]=0
		if (tier==1&&getPrestigePower().div(player.prestigePower).gte(1e6)) {} getBonusAch(5)
		player.prestigePower=(tier==1)?getPrestigePower():(player.supernovaUpgrades.includes(3)&&player.headstarts&&player.currentChallenge==0)?getPPHeadstart():new Decimal(1)
		player.prestigePeak[0]=(tier==Infinity)?new Decimal(1):(player.prestigePower.gt(player.prestigePeak[0]))?player.prestigePower:player.prestigePeak[0]
		if (tier==1&&getPrestigePower().gte(100)) newStory(13)
		if (tier==1&&getPrestigePower().gte(50)) newStory(12)
		if (tier==1&&getPrestigePower().gte(30)) newStory(11)
		if (tier==1&&getPrestigePower().gte(10)) newStory(10)
		if (tier==1) newStory(9)
		
		//Any tier
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		player.challPow=(player.currentChallenge==11)?new Decimal(0.1):new Decimal(1)
		
		updateCosts('gens')
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

function updateStory() {
	story.requirements[7]='Reach '+format(1e39)+' stars'
	story.requirements[14]='Reach '+format(1e81)+' stars'
	story.requirements[16]='Reach '+format(1e100)+' stars'
	achList.requirements[4]='Prestige with '+format(1e4)+'x PP than the previous'
	achList.requirements[5]='Transfer between '+format(7990,3)+' to '+format(7999,3)+' PP'
	
	var temp=1
	while (document.getElementById('story'+temp)) {
		if (player.story>=temp) {
			updateTooltipBase('story'+temp,story.messages[temp-1]==undefined?'Coming soon':story.messages[temp-1])
			updateClass('story'+temp,'storyCompleted')
		} else {
			updateTooltipBase('story'+temp,'Locked')
			updateClass('story'+temp,'storyLocked')
		}
		updateTooltip('story'+temp,story.requirements[temp-1])
		temp++
	}
	
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
		updateElement('ach5',achList.names[4]+' - '+achList.requirements[4])
		updateElement('ach6',achList.names[5]+' - '+achList.requirements[5])
	} else {
		updateElement('ach5tip','<b>'+achList.names[4]+'</b><br>Reward: Coming soon<br>'+achList.requirements[4])
		updateElement('ach6tip','<b>'+achList.names[5]+'</b><br>Reward: Coming soon<br>'+achList.requirements[5])
	}
}

function newStory(id) {
	if (id>player.story) {
		player.story=id
	
		var achBox=document.getElementById('achievement')
		achBox.innerHTML='<b>Story unlocked!</b><br>Check in story tab.<br>'+story.requirements[id-1]
		achBox.style.opacity=1
		
		if (achHide) clearTimeout(achHide)
		var achHide=setTimeout(function(){achBox.style.opacity=0;},6000)
		updateStory()
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
		} else if (id=='light') {
			document.body.style.backgroundColor='#e5e5e5'
			document.body.style.color='#191919'	
		}
	}
}
	
function getCost(tier,bulk=1) {
	var multiplier=getCostMultiplier(tier)
	return Decimal.pow(multiplier,bulk).sub(1).div(multiplier-1).times(costs.tiers[tier-1])
}
	
function updateCosts(id='all') {
	if (id=='gens'||id=='all') {
		for (i=1;i<11;i++) {
			var multiplier=getCostMultiplier(i)
			var cost=Decimal.pow(10,(player.currentChallenge==4&&i>1)?1:i*(0.9+0.1*i)).times(Decimal.pow(multiplier,player.generators[i-1].bought))
			if (player.supernovaUpgrades.includes(11)&&player.currentChallenge==0) cost=cost.div(Decimal.pow(multiplier,player.prestigePower.log10()).pow(0.1))
			if (player.currentChallenge==12) cost=cost.times(Decimal.pow(multiplier,(player.generators[0].bought+player.generators[1].bought+player.generators[2].bought+player.generators[3].bought+player.generators[4].bought+player.generators[5].bought+player.generators[6].bought+player.generators[7].bought+player.generators[8].bought+player.generators[9].bought)/250))
			if (neutronPower.gt(1)) cost=cost.div(neutronPower)
			costs.tiers[i-1]=cost
		}
	}
	if (id=='autobuyers'||id=='all') {
		if (player.autobuyers.interval!=undefined) costs.intReduceCost=Math.floor(Math.pow((player.autobuyers.interval==undefined)?Infinity:10/player.autobuyers.interval,1.43458799))
		if (player.autobuyers.gens!=undefined) {
			if (player.autobuyers.gens.bulk>255) {
				costs.bbCost=Decimal.times(32e3,Decimal.pow(2,BigInteger.divide(player.autobuyers.gens.bulk,256)))
			} else {
				costs.bbCost=player.autobuyers.gens.bulk*250
			}
		}
	}
	if (id=='neutronboosts'||id=='all') costs.neutronBoosts=[Decimal.pow(Number.MAX_VALUE,2).times(Decimal.pow(Decimal.pow(Number.MAX_VALUE,1.5),player.neutronBoosts.powers[0])),Decimal.pow(Number.MAX_VALUE,1/30).times(Decimal.pow(Decimal.pow(Number.MAX_VALUE,1/40),player.neutronBoosts.powers[1])),Decimal.pow(10,player.neutronBoosts.powers[2]).times(1e5),Decimal.pow(10,player.neutronBoosts.basePower+8),Decimal.pow(10,player.neutronBoosts.ppPower/0.015+10)]
	if (id=='neutrontiers'||id=='all') { 
		for (i=0;i<10;i++) {
			var baseCosts=[1e24,1e30,1e35,1/0,1/0,1/0,1/0,1/0,1/0,1/0]
			var costMult=[100,1e3,1e5,1/0,1/0,1/0,1/0,1/0,1/0,1/0]
			costs.neutronTiers[i]=Decimal.times(baseCosts[i],Decimal.pow(costMult[i],player.neutronTiers[i].bought))
		}
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
	var maxBulk=resource.div(costs.tiers[tier-1]).times(multiplier-1).plus(1).log(multiplier)
	if (BigInteger.compareTo(maxBulk,9007199254740992)<0) maxBulk=Math.floor(maxBulk)
	if (BigInteger.compareTo(bulk,maxBulk)>0||bulk==0) {
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
	player.generators[tier-1].bought=BigInteger.add(player.generators[tier-1].bought,bulk)
	player.generators[tier-1].amount=player.generators[tier-1].amount.add(bulk)
	updateCosts('gens')
	
	if (tier==1&&bulk>0) newStory(1)
	if (tier==2&&bulk>0) newStory(3)
	if (tier==3&&bulk>0) newStory(4)
	if (tier==5&&bulk>0) newStory(5)
	if (tier==8&&bulk>0) newStory(6)
	if (tier==10&&bulk>0) newStory(7)
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
		var resource=(player.currentChallenge==4&&tierNum>1)?player.generators[tierNum-2].amount:player.stars.div(player.currentChallenge==4?1:j)
		var bulk=resource.div(costs.tiers[tierNum-1]).times(multiplier-1).plus(1).log(multiplier)
		if (BigInteger.compareTo(bulk,9007199254740992)<0) bulk=Math.floor(bulk)
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
		player.generators[tierNum-1].bought=BigInteger.add(player.generators[tierNum-1].bought,bulk)
		player.generators[tierNum-1].amount=player.generators[tierNum-1].amount.add(bulk)
		updateCosts('gens')
	
		if (tierNum==1&&bulk>0) newStory(1)
		if (tierNum==2&&bulk>0) newStory(3)
		if (tierNum==3&&bulk>0) newStory(4)
		if (tierNum==5&&bulk>0) newStory(5)
		if (tierNum==8&&bulk>0) newStory(6)
		if (tierNum==10&&bulk>0) newStory(7)
		if (player.generators[0].bought==300&&player.generators[1].bought==0&&
		player.generators[2].bought==0&&player.generators[3].bought==0&&
		player.generators[4].bought==0&&player.generators[5].bought==0&&
		player.generators[6].bought==0&&player.generators[7].bought==0&&
		player.generators[8].bought==0&&player.generators[9].bought==0) getBonusAch(1)
		if (player.generators[9].bought==111&&player.generators[1].bought==0&&
			player.generators[2].bought==0&&player.generators[3].bought==0&&
			player.generators[4].bought==0&&player.generators[5].bought==0&&
			player.generators[6].bought==0&&player.generators[7].bought==0&&
			player.generators[8].bought==0) getBonusAch(2)
		if (player.generators[9].bought>player.generators[8].bought&&player.generators[8].bought>player.generators[7].bought&&
			player.generators[7].bought>player.generators[6].bought&&player.generators[6].bought>player.generators[5].bought&&
			player.generators[5].bought>player.generators[4].bought&&player.generators[4].bought>player.generators[3].bought&&
			player.generators[3].bought>player.generators[2].bought&&player.generators[2].bought>player.generators[1].bought&&
			player.generators[1].bought>player.generators[0].bought) getBonusAch(3)
		if (player.generators[9].bought==404&&player.generators[8]==0) getBonusAch(4)
	
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
	if (player.transferUpgrades.includes(1)&&player.generators[tier].amount.gte(10)) multi=multi.times(Decimal.pow(1.05,Decimal.floor(player.generators[tier].amount.log10()).times((player.currentChallenge==6)?0.9:1)))
	if (player.transferUpgrades.includes(2)) multi=multi.times(getUpgradeMultiplier('tupg2'))
	if (player.transferUpgrades.includes(3)) multi=multi.times(getUpgradeMultiplier('tupg3'))
	if (player.transferUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('tupg4'))
	if (player.transferUpgrades.includes(5)) multi=multi.times(getUpgradeMultiplier('tupg5'))
	if (player.transferUpgrades.includes(12)) multi=multi.times(Math.pow(3,(player.currentChallenge==6)?0.9:1))
		
	if (player.supernovaUpgrades.includes(1)) multi=multi.times(getUpgradeMultiplier('snupg1'))
	if (player.supernovaUpgrades.includes(4)) multi=multi.times(getUpgradeMultiplier('snupg4'))
	if (player.supernovaUpgrades.includes(5)) multi=multi.times(1+4/(1+player.supernovaPlaytime/90))
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
	multi=Decimal.pow(stars,0.05).times(player.transferUpgrades.includes(7)?0.0314731353:0.0280504614)
	if (player.transferUpgrades.includes(6)) multi=multi.times(Decimal.pow(multi.max(10).log10(),(player.currentChallenge==6)?0.23693598:0.2632622))
	if (player.transferUpgrades.includes(9)) multi=multi.times(Math.pow(2,(player.currentChallenge==6)?0.9:1))
	if (player.transferUpgrades.includes(11)) multi=multi.times(Math.max(Math.pow(2/(1+player.transferPlaytime/120),(player.currentChallenge==6)?0.9:1),1))
	if (player.transferUpgrades.includes(14)) multi=multi.times(Decimal.pow(player.transferPoints.lt(10)?1:player.transferPoints.log10(),(player.currentChallenge==6)?0.339848464:0.377609405))

	if (player.supernovaUpgrades.includes(6)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg6'))
	if (player.supernovaUpgrades.includes(8)&&player.currentChallenge==0) multi=multi.times(3)
	if (player.currentChallenge==9) multi=multi.pow(0.85)
		
	if (neutronBoostPP.gt(1)) multi=multi.times(neutronBoostPP)
		
	return multi
}

function getTransferPoints() {
	multi=player.prestigePower.div(100).cbrt()
	if (player.transferUpgrades.includes(13)) multi=multi.times(Decimal.pow(player.prestigePower.log10(),(player.currentChallenge==6)?0.369588574:0.410653971))
	if (player.currentChallenge==9) multi=multi.pow(1.17)

	if (player.supernovaUpgrades.includes(7)&&player.currentChallenge==0) multi=multi.times(getUpgradeMultiplier('snupg7'))
		
	return multi.floor()
}

function buyTransferUpgrade(num) {
	if (player.transferPoints.gte(costs.tupgs[num-1])&&!player.transferUpgrades.includes(num)&&(num<13||player.transferUpgrades.length>11)) {
		player.transferPoints=player.transferPoints.sub(costs.tupgs[num-1])
		player.transferUpgrades.push(num)
		if (num==8) updateCosts()
		if (player.transferUpgrades.length>1) {} newStory(16)
		if (player.transferUpgrades.length==14) {} // newStory(6)
	}
}

function getUpgradeMultiplier(name) {
	if (name=='tupg2') return Math.pow(player.playtime/3600,(player.currentChallenge==6)?0.196293863:0.218104292)+1
	if (name=='tupg3') return Math.pow(player.transferPlaytime/60,(player.currentChallenge==6)?0.130304656:0.144782951)+1
	if (name=='tupg4') return Decimal.pow(player.prestigePeak[0].max(10).log10(),(player.currentChallenge==6)?0.0359573356:0.415011197)
	if (name=='tupg5') return Decimal.add(player.prestigePeak[1].max(1).log10(),1).pow((player.currentChallenge==6)?0.498457649:0.553841832)
	if (name=='tupg6') return Decimal.pow(Decimal.pow(stars,0.05).times(player.transferUpgrades.includes(7)?0.0314731353:0.0280504614).max(10).log10(),(player.currentChallenge==6)?0.23693598:0.2632622)
		
	if (name=='snupg1') return Decimal.add(1,player.generators[0].bought).add(player.generators[1].bought).add(player.generators[2].bought).add(player.generators[3].bought).add(player.generators[4].bought).add(player.generators[5].bought).add(player.generators[6].bought).add(player.generators[7].bought).add(player.generators[8].bought).add(player.generators[9].bought).log10()*1.08374517+1
	if (name=='snupg4') return Decimal.pow(player.totalStars.log10(),1.5).times(0.000923858398)
	if (name=='snupg6') return Math.log10(player.prestiges[2])+1
	if (name=='snupg7') return Decimal.pow((player.neutronStars.lt(1))?1:Decimal.add(player.neutronStars.log10(),1),0.5)
	if (name=='snupg10') return Math.pow(1+player.transferUpgrades.length,0.405683871)
	if (name=='snupg12') return Math.min(1+1.12024118/Math.log10(player.fastestSupernova+1),5)
	if (name=='snupg13') return Math.min(1+1.12024118/Math.log10(player.lastTransferPlaytime*6+1),5)
	if (name=='snupg15') return Math.pow(1+player.achievements.length,0.74492186)
}

function getPostPrestigePoints(tier) {
	var pointsList=[player.stars,player.neutronStars,player.quarkStars,player.particles]
	var progressTillMax=Math.min((pointsList[tier-3].log10()-maxValueLog)/(maxValueLog-1),1)
	var gain=pointsList[tier-3].pow(1/maxValueLog).div(Math.pow(10,1-progressTillMax)).floor()
	if (gain.eq(0)) return 1
	return gain
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

function toggleHeadstart() {
	player.headstarts=!player.headstarts
}

function buySupernovaUpgrade(num) {
	if (player.neutronStars.gte(costs.snupgs[num-1])&&!player.supernovaUpgrades.includes(num)) {
		player.neutronStars=player.neutronStars.sub(costs.snupgs[num-1])
		player.supernovaUpgrades.push(num)
		if (num==2&&player.headstarts&&player.currentChallenge==0) player.transferUpgrades=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
		if (num==3&&player.headstarts&&player.prestigePower.lt(getPPHeadstart())&&player.currentChallenge==0) player.prestigePower=getPPHeadstart()
		if (player.supernovaUpgrades.length>15) {} // newStory(12)
	}
}

function getBonusAch(achId) {
	if ((player.prestiges[2]>0||player.neutronStars.gt(0))&&!player.achievements.includes(achId)) {
		player.achievements.push(achId)
	
		var achBox=document.getElementById('achievement')
		achBox.innerHTML='<b>Achievement unlocked!</b><br>'+achList.names[achId-1]+'<br>'+achList.requirements[achId-1]
		achBox.style.opacity=1
		
		if (achHide) clearTimeout(achHide)
		var achHide=setTimeout(function(){achBox.style.opacity=0;},6000)
	}
}

function getPPHeadstart() {
	return player.neutronStars.pow(Math.min(5+Math.max(player.neutronStars.log10()-5,0)*2,15)).min((player.breakLimit)?player.prestigePeak[0]:1e16)
}

function losereset() {
	player.prestigePower=player.prestigePower.div(2).max(1)
	
	player.stars=new Decimal(10)
	player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
	
	player.challPow=new Decimal(1)
	
	updateCosts('gens')
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
		document.getElementById('autotransferTP').value=player.autobuyers.transfer.tp.toString()
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
	if (player.autobuyers.supernova!=undefined) {
		document.getElementById('autonovaNS').value=player.autobuyers.supernova.ns.toString()
		document.getElementById('toggleAutonova').checked=player.autobuyers.supernova.disabled
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
		updateCosts('autobuyers')
		
		if (player.autobuyers.interval==0.05) {} // newStory(16)
	}
}

function openRewardBox() {
	if (player.rewardBoxes[1]==0) player.rewardBoxes[1]=5*Math.sqrt(player.rewardBoxes[2]+1)
}

function unlockAutobuyer() {
	var processing=true
	while (processing) {
		var number=Math.round(Math.random()*11)
		if (number==0) {
			if (player.autobuyers.transfer==undefined) {
				player.autobuyers.transfer={lastTick:player.playtime,disabled:false,times:new Decimal(2),tp:new Decimal(1/0)}
				processing=false
			}
		} else if (number==1) {
			if (player.autobuyers.prestige==undefined) {
				player.autobuyers.prestige={lastTick:player.playtime,disabled:false,times:new Decimal(10)}
				processing=false
			}
		} else {
			if (player.autobuyers.gens==undefined) player.autobuyers.gens={lastTick:player.playtime,tiers:{},bulk:1}
			if (player.autobuyers.gens.tiers[number-1]==undefined) {
				player.autobuyers.gens.tiers[number-1]=true
				processing=false
			}
		}
	}
	updateAutobuyers()
	player.rewardBoxes[0]--
	player.rewardBoxes[1]=0
	player.rewardBoxes[2]++
}

function buyAutobuyerFeature(num) {
	if (player.neutronStars.gte(costs.bisfeatures[num-1])&&!player.buyinshopFeatures.includes(num)) {
		player.neutronStars=player.neutronStars.sub(costs.bisfeatures[num-1])
		player.buyinshopFeatures.push(num)
		
		if (player.buyinshopFeatures.length>3) {} // newStory(18)
			
		switch (num) {
			case 5: player.autobuyers.transfer.tp=new Decimal(1e10); break
			case 6: player.autobuyers.supernova={lastTick:player.playtime,disabled:false,ns:new Decimal(100)}; break
		}
		updateAutobuyers()
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
		player.autobuyers.gens.bulk=BigInteger.multiply(player.autobuyers.gens.bulk,2)
		updateCosts('autobuyers')
		
		if (player.autobuyers.gens.bulk==256) {} // newStory(17)
	}
}

function changeTimes(id) {
	player.autobuyers[id].times=new Decimal(document.getElementById('auto'+id+'Times').value)
}

function changeABP(id) {
	if (id=='supernova') {
		player.autobuyers.supernova.ns=new Decimal(document.getElementById('autonovaNS').value)
	} else {
		player.autobuyers.transfer.tp=new Decimal(document.getElementById('autotransferTP').value)
	}
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
				player.neutronBoosts.powers[0]=BigInteger.add(player.neutronBoosts.powers[0],1)
			}
		break
		
		case 2: 
			if (player.transferPoints.gte(costs.neutronBoosts[1])) {
				player.transferPoints=player.transferPoints.sub(costs.neutronBoosts[1])
				player.neutronBoosts.powers[1]=BigInteger.add(player.neutronBoosts.powers[1],1)
			}
		break
		
		case 3:
			if (player.neutronStars.gte(costs.neutronBoosts[2])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[2])
				player.neutronBoosts.powers[2]=BigInteger.add(player.neutronBoosts.powers[2],1)
			}
		break
		
		case 4: 
			if (player.neutronStars.gte(costs.neutronBoosts[3])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[3])
				player.neutronBoosts.basePower++
			}
		break
		
		case 5: 
			if (player.neutronStars.gte(costs.neutronBoosts[4])) {
				player.neutronStars=player.neutronStars.sub(costs.neutronBoosts[4])
				player.neutronBoosts.ppPower=Math.round((player.neutronBoosts.ppPower+0.015)*200)/200
				if (player.neutronBoosts.ppPower==0.15) {} // newStory(22)
			}
		break
	}
	updateCosts('neutronboosts')
	
	if (player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2]>0) {} // newStory(19)
	if (player.neutronBoosts.powers[0]+player.neutronBoosts.powers[1]+player.neutronBoosts.powers[2]>19) {} // newStory(20)
}
	
function buyNeutronGen(tier) {
	if (player.neutronStars.gte(costs.neutronTiers[tier-1])) {
		player.neutronStars=player.neutronStars.sub(costs.neutronTiers[tier-1])
		player.neutronTiers[tier-1].amount=player.neutronTiers[tier-1].amount.add(1)
		player.neutronTiers[tier-1].bought=BigInteger.add(player.neutronTiers[tier-1].bought,1)
		updateCosts('neutrontiers')
		
		if (tier==1) {} // newStory(21)
	}
}
	
function getNeutronTierMultiplier(tier) {
	var multi=Decimal.pow(1,BigInteger.subtract(player.neutronTiers[tier].bought,1)).max(1)
	
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
		if (player.stars.lt(0)) player.stars=new Decimal(0)
		if (player.stars.gte(150)) newStory(2)
		if (player.stars.gte(1e39)) newStory(8)
		if (player.stars.gte(1e81)) newStory(15)
		if (player.stars.gte(1e100)) newStory(17)
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
		if (player.neutronStars.gte(Number.MAX_VALUE)&&!player.cheatOptions.breakLimitNS) {
			player.neutronStars=new Decimal(Number.MAX_VALUE)
			reset(4)
		}
		if (player.quarkStars.gte(Number.MAX_VALUE)) {
			player.quarkStars=new Decimal(Number.MAX_VALUE)
			reset(5)
		}
		if (player.particles.gte(Number.MAX_VALUE)) {
			player.particles=new Decimal(Number.MAX_VALUE)
			reset(6)
		}
		
		if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
			while (streqs.length>player.supernovaTabsUnlocked && player.neutronStars.gte(streqs[player.supernovaTabsUnlocked])) {
				player.supernovaTabsUnlocked++
			}
			while (challreqs.length>player.challengeUnlocked && player.neutronStars.gte(challreqs[player.challengeUnlocked])) {
				player.challengeUnlocked++
			}
		}
		
		if (player.autobuyers.interval!=undefined) {
			var occurrences=0
			if ((player.stars.lt(Number.MAX_VALUE)&&(!player.breakLimit||player.currentChallenge>0))&&!player.autobuyers.upgrade.disabled) {
				occurrences=Math.floor((player.playtime-player.autobuyers.upgrade.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.upgrade.lastTick+=occurrences*player.autobuyers.interval
					var i=0
					while (i<14&&occurrences>0) {
						if (!player.transferUpgrades.includes(i+1)) {
							if (player.transferPoints.gte(costs.tupgs[i])) {
								buyTransferUpgrade(i+1)
								occurrences--
							} else {
								occurrences=0
							}
						}
						i++
					}
				}
			}
			if ((player.stars.lt(Number.MAX_VALUE)||(player.breakLimit&&!player.currentChallenge>0))&&player.autobuyers.transfer!=undefined?!player.autobuyers.transfer.disabled:false) {
				occurrences=Math.floor((player.playtime-player.autobuyers.transfer.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.transfer.lastTick+=occurrences*player.autobuyers.interval
					if (getTransferPoints().div(player.transferPoints.max(1)).gte(player.autobuyers.transfer.times.sub(1))||getTransferPoints().gte(player.autobuyers.transfer.tp)) checkToReset(2)
				}
			}
			if ((player.stars.lt(Number.MAX_VALUE)||(player.breakLimit&&!player.currentChallenge>0))&&player.autobuyers.prestige!=undefined?!player.autobuyers.prestige.disabled:false) {
				occurrences=Math.floor((player.playtime-player.autobuyers.prestige.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.prestige.lastTick+=occurrences*player.autobuyers.interval
					if (getPrestigePower().div(player.prestigePower).gte(player.autobuyers.prestige.times)) checkToReset(1)
				}
			}
			if ((player.stars.lt(Number.MAX_VALUE)||(player.breakLimit&&!player.currentChallenge>0))&&player.autobuyers.gens!=undefined) {
				occurrences=Math.floor((player.playtime-player.autobuyers.gens.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.gens.lastTick+=occurrences*player.autobuyers.interval
					for (i=0;i<10;i++) {
						var genTier=player.autobuyerPriorities[i]
						if (player.autobuyers.gens.tiers[genTier]!=undefined?player.autobuyers.gens.tiers[genTier]:false) {
							buyGen(genTier,BigInteger.multiply(occurrences,player.autobuyers.gens.bulk))
						}
					}
				}
			}
			if (player.autobuyers.supernova!=undefined?!player.autobuyers.supernova.disabled:false) {
				occurrences=Math.floor((player.playtime-player.autobuyers.supernova.lastTick)/player.autobuyers.interval)
				if (occurrences>0) {
					player.autobuyers.supernova.lastTick+=occurrences*player.autobuyers.interval
					if (Decimal.gte(getPostPrestigePoints(3),player.currentChallenge>0?1:player.autobuyers.supernova.ns)) checkToReset(3)
				}
			}
		}
		
		if (player.rewardBoxes[1]>0) {
			player.rewardBoxes[1]=Math.max(player.rewardBoxes[1]-diff,0)
			if (player.rewardBoxes[1]==0) {
				unlockAutobuyer()
			}
		}
		
		neutronBoost=Decimal.pow(10-1/(player.neutronBoosts.basePower+1),BigInteger.add(player.neutronBoosts.powers[0],BigInteger.add(player.neutronBoosts.powers[1],player.neutronBoosts.powers[2])))
		neutronBoostPP=neutronBoost.pow(player.neutronBoosts.ppPower)
		
		neutronPower=Decimal.pow(player.neutrons.add(1),Decimal.times(player.neutrons.add(1).sqrt().log10(),10).div(Decimal.add(player.neutrons.add(1).log10(),10)))
		if (neutronPower.gt(1)) updateCosts('gens')
	
		if (keysPressed.length>0&&notOnFocus) {
			for (i=1;i<11;i++) {
				var keyid=48+(i%10)
				if (keysPressed.includes(keyid)) {
					if (keysPressed.includes(16)) {
						buyGen(i,0)
					} else if (keysPressed.includes(17)) {
						buyNeutronGen(i)
						keysPressed=[]
					} else {
						buyGen(i)
						keysPressed=[]
					}
				}
			}
			if (keysPressed.includes(68)) {
				if (player.autobuyers.interval!=undefined) {
					var disabled=0
					if (player.autobuyers.upgrade!=undefined) if (player.autobuyers.upgrade.disabled) disabled++
					if (player.autobuyers.transfer!=undefined) if (player.autobuyers.transfer.disabled) disabled++
					if (player.autobuyers.prestige!=undefined) if (player.autobuyers.prestige.disabled) disabled++
					if (player.autobuyers.gens!=undefined) {
						for (i=1;i<11;i++) {
							if (player.autobuyers.gens.tiers[i]!=undefined) if (!player.autobuyers.gens.tiers[i]) disabled++
						}
					}
					if (player.autobuyers.supernova!=undefined) if (player.autobuyers.supernova.disabled) disabled++
					if (disabled==0) {
						if (player.autobuyers.upgrade!=undefined) player.autobuyers.upgrade.disabled=true
						if (player.autobuyers.transfer!=undefined) player.autobuyers.transfer.disabled=true
						if (player.autobuyers.prestige!=undefined) player.autobuyers.prestige.disabled=true
						if (player.autobuyers.gens!=undefined) {
							for (i=1;i<11;i++) {
								if (player.autobuyers.gens.tiers[i]!=undefined) player.autobuyers.gens.tiers[i]=false
							}
						}
						if (player.autobuyers.supernova!=undefined) player.autobuyers.supernova.disabled=true
					} else {
						if (player.autobuyers.upgrade!=undefined) player.autobuyers.upgrade.disabled=false
						if (player.autobuyers.transfer!=undefined) player.autobuyers.transfer.disabled=false
						if (player.autobuyers.prestige!=undefined) player.autobuyers.prestige.disabled=false
						if (player.autobuyers.gens!=undefined) {
							for (i=1;i<11;i++) {
								if (player.autobuyers.gens.tiers[i]!=undefined) player.autobuyers.gens.tiers[i]=true
							}
						}
						if (player.autobuyers.supernova!=undefined) player.autobuyers.supernova.disabled=false
					}
					updateAutobuyers()
				}
				keysPressed=[]
			}
			if (keysPressed.includes(77)) maxAll()
			if (keysPressed.includes(80)) {checkToReset(1);keysPressed=[];}
			if (keysPressed.includes(83)) {checkToReset(3);keysPressed=[];}
			if (keysPressed.includes(84)) {checkToReset(2);keysPressed=[];}
		}
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
		if (player.supernovaTabsUnlocked==streqs.length) {
			hideElement('requirement'+((oldDesign)?'':'Child'))
		} else {
			showElement('requirement'+((oldDesign)?'':'Child'),(oldDesign)?'table-cell':'inline-block')
			moveElement('requirement'+((oldDesign)?'':'Child'),((player.supernovaTabsUnlocked==3)?'genTabs':'supernovaTabs')+((oldDesign)?'':'Row'))
			updateElement('requirement','Next requires '+format(streqs[player.supernovaTabsUnlocked])+' NS')
		}
		for (i=1;i<=streqs.length;i++) {
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
	if (!oldDesign&&player.layout!=oldLayout) {
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
					currentText=currentText+format(player.generators[i].amount)+', '+format(player.generators[i].bought,2,1)+' bought'
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
				updateElement('prestigePower','<b>x'+format(player.prestigePower,3,0,false)+'</b> (prestige power) for all production')
			} else {
				hideElement('prestigePower')
			}
			if (player.stars.gte(player.transferUpgrades.includes(7)?1e38:1e39)&&player.prestigePower.lt(getPrestigePower())) {
				if (oldDesign) {
					showElement('prestige1','inline')
				} else {
					showElement('prestige1','table-cell')
				}
				updateElement('prestige1','Reset this game and get the boost.<br>x'+format(getPrestigePower(),3,0,false)+' production')
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
			if (player.showProgress&&(player.stars.lt(player.transferUpgrades.includes(7)?1e38:1e39)||player.prestigePower.gt(getPrestigePower()))) {
				if (player.prestigePower.gt(1)) {
					var percentage=(getPrestigePower().log10()-getPrestigePower(10).log10())/(player.prestigePower.log10()-getPrestigePower(10).log10())
				} else {
					var percentage=player.stars.add(1).log10()/(player.transferUpgrades.includes(7)?38:39)
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
					currentText=currentText+format(player.neutronTiers[i].amount)+', '+format(player.neutronTiers[i].bought,2,1)+' bought'
				}
				updateElement('nt'+(i+1)+'Gen',currentText)
				updateElement('nt'+(i+1)+'GenButton','Cost: '+formatNSCosts(costs.neutronTiers[i]))
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
			updateElement('statsPrestige','You have prestige '+format(player.prestiges[0],2,2)+' times.')
		} else {
			hideElement('statsPrestige')
		}
		if (player.prestiges[1]>0) {
			showElement('statsTransfer','block')
			showElement('statsTransferTime','block')
			updateElement('statsTransfer','You have transferred '+format(player.prestiges[1],2,2)+' times.')
			updateElement('statsTransferTime','Your time in this transfer is '+formatTime(player.transferPlaytime)+'.')
		} else {
			hideElement('statsTransfer')
			hideElement('statsTransferTime')
		}
		if (player.prestiges[2]>0) {
			showElement('statsSupernova','block')
			showElement('statsSupernovaTime','block')
			updateElement('statsSupernova','You have supernova '+format(player.prestiges[2],2,2)+' times.')
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
		if (player.rewardBoxes[2]>0) {
			showElement('statsRewardBoxes','block')
			updateElement('statsRewardBoxes','You opened '+player.rewardBoxes[2]+' reward box'+(player.rewardBoxes[2]>0?'es':'')+'.')
		} else {
			hideElement('statsRewardBoxes')
		}
		for (i=0;i<10;i++) {
			if (player.lastSupernovas[i]==undefined) {
				hideElement('statsPrevSupernova'+(i+1))
			} else {
				showElement('statsPrevSupernova'+(i+1),'block')
				var message='The '+((i>0)?ordinals[i]+' ':'')+'previous supernova took '
				if (player.lastSupernovas[i][3]>1) {
					var message=message+format(player.lastSupernovas[i][3]-1,0,2)+' supernovas and '
				}
				message=message+formatTime(player.lastSupernovas[i][0])
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
			updateElement('headstart','Headstart:<br>'+(player.headstarts?'On':'Off'))
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
			if (player.challengeUnlocked<12) {
				showElement('nextChall','inline-block')
				updateElement('nextChall','Next challenge unlock at '+format(challreqs[player.challengeUnlocked])+' NS')
			} else {
				hideElement('nextChall')
			}
			if (player.currentChallenge==0) {
				hideElement('exitChall')
			} else {
				showElement('exitChall','inline-block')
			}
			for (i=1;i<13;i++) {
				if (i>player.challengeUnlocked) {
					hideElement('chall'+i)
				} else {
					showElement('chall'+i,'table-cell')
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
					updateElement('chall'+i+'comp',(timesCompleted==0)?'':'Completed '+format(timesCompleted)+' time'+((timesCompleted==1)?'':'s'))
				}
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
			if (player.rewardBoxes[0]>0) {
				showElement('rewardBoxes','inline-block')
				currentText='You have <b>'+player.rewardBoxes[0]+'</b> unopened reward boxes'+((oldDesign)?'<br><br>':'')
				updateElement((oldDesign)?'openRewardBox':'rewardBoxAmount',currentText)
				if (!oldDesign) currentText=''
				if (player.rewardBoxes[1]>0) {
					updateClass('openRewardBox',(oldDesign)?'unaffordUpgrade':'shopUnafford')
					updateElement('openRewardBox',currentText+'Opening in '+formatTime(player.rewardBoxes[1]))
				} else {
					updateClass('openRewardBox',(oldDesign)?'supernovaUpgrade':'supernovaButton')
					updateElement('openRewardBox',currentText+'Open')
				}
			} else {
				hideElement('rewardBoxes')
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
				currentText='Bulk: '+format(player.autobuyers.gens.bulk)+'x<br>'
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
			if (!player.buyinshopFeatures.includes(5)) {
				invisibleElement('bisTransferOptions2')
			} else {
				visibleElement('bisTransferOptions2')
			}
			if (!player.buyinshopFeatures.includes(6)) {
				invisibleElement('autonova')
			} else {
				visibleElement('autonova')
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
			updateElement('neutronboost','x'+(Math.round(1e3-100/(player.neutronBoosts.basePower+1))/100)+'<sup>'+format(Decimal.add(player.neutronBoosts.powers[0],player.neutronBoosts.powers[1]).add(player.neutronBoosts.powers[2]),2,1)+'</sup> = <b>x'+format(neutronBoost)+'</b> for all production')
			
			var items=['powerStars','powerTP','powerNS','basePower','ppPower']
			var boostType=['stars','transfer points','neutron stars']
			
			for (i=0;i<5;i++) {
				var currentText=''
				switch (i) {
					case 0:
					case 1:
					case 2: currentText='Power ('+boostType[i]+'): +'+format(player.neutronBoosts.powers[i],2,1)+' (+1)'+((oldDesign)?'<br><br>':'')
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
	if (tab=='exotic') {
		updateElement('particles','You have <b>'+format(player.particles)+'</b> particles')
	}
	if (tab=='quantum') {
		updateElement('strings','You have <b>'+format(player.strings)+'</b> strings')
	}
	if (tab=='cheat') {
		if (player.breakLimit) {
			updateElement('breakLimitCheat','Fix limit')
		} else {
			updateElement('breakLimitCheat','Break limit')
		}
		if (player.cheatOptions.breakLimitNS) {
			updateElement('breakLimitNS','Fix limit (NS)')
		} else {
			updateElement('breakLimitNS','Break limit (NS)')
		}
	}
}

function gameInit() {
	initTooltips()

	var tempSave=localStorage.getItem('savemgn')
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
}

window.addEventListener('keydown', function(event) {
    var key = event.keyCode || event.which;
	if (!keysPressed.includes(key)) keysPressed.push(key)
}, false);

window.addEventListener('keyup', function(event) {
    var key = event.keyCode || event.which;
	var newKeysPressed=[]
	for (i=0;i<keysPressed.length;i++) {
		if (keysPressed[i]!=key) newKeysPressed.push(keysPressed[i])
	}
	keysPressed=newKeysPressed
}, false);