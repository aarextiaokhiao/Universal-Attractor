player={version:0.6004,
	playtime:0,
	lastUpdate:0,
	stars:new Decimal(10),
	generators:[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]}
tab='gen'
oldTab=tab

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

function format(number, decimalPoints=0) {
	number = new Decimal(number)
	if (number.gte(Infinity)) {
		return 'Infinite'
	} else if (number.abs().gte(1000)) {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision((decimalPoints>3)? decimalPoints : 3).toString()+abbreviation(BigInteger.subtract(label,1))
	} else {
		return number.toFixed(decimalPoints).toString()
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

function save() {
	try {
		localStorage.setItem('save2',btoa(JSON.stringify(player)))
		console.log('Game saved!')
	} catch (e) {
		console.log('Well, we tried.')
	}
}

function load() {
	try {
		var temp=localStorage.getItem('save2')
		if (temp==null) {
			temp=localStorage.getItem('save')
		}
		savefile=JSON.parse(atob(temp))
		
		if (savefile.version<=0.6003) {
			savefile.stars=savefile.points
			var temp = []
			for (i=1;i<10;i++) {
				temp.push(savefile.generators['t'+i])
			}
			temp.push({amount:savefile.generators.t10,bought:savefile.generators.t10})
			savefile.generators=temp
			
			delete savefile.points
		}
		
		savefile.stars=new Decimal(savefile.stars)
		for (i=0;i<10;i++) {
			savefile.generators[i].amount=new Decimal(savefile.generators[i].amount)
		}
		
		savefile.version=player.version
		player=savefile
		console.log('Game loaded!')
	} catch (e) {
		console.log('Your save failed to load:\n'+e)
	}
}

function reset() {
	if (confirm('Are you sure to reset your game?')) {
		player.playtime=0
		player.lastUpdate=0
		player.stars=new Decimal(10)
		player.generators=[{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0},{amount:new Decimal(0),bought:0}]
		
		localStorage.clear('save2')
		updateCosts()
	}
}
	
function getCost(tier,bulk=1) {
	var multiplier=Math.pow(1.5,tier*(0.9+0.1*tier))
	return Decimal.pow(multiplier,bulk).sub(1).div(multiplier-1).times(tierCosts[tier-1])
}
	
function updateCosts() {
	for (i=1;i<11;i++) {
		tierCosts[i-1]=Decimal.pow(10,i*(0.9+0.1*i)).times(Decimal.pow(Math.pow(1.5,i*(0.9+0.1*i)),player.generators[i-1].bought))
	}
}
	
function buyGen(tier,bulk=1) {
	var multiplier=Math.pow(1.5,tier*(0.9+0.1*tier))
	var maxBulk=Math.floor(player.stars.div(tierCosts[tier-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
	if (bulk>maxBulk) {
		bulk=maxBulk
	}
	
	player.stars=player.stars.sub(getCost(tier,bulk))
	player.generators[tier-1].bought+=bulk
	player.generators[tier-1].amount=player.generators[tier-1].amount.add(bulk)
	updateCosts()
}
	
function maxAll() {
	for (i=10;i>0;i--) {
		var multiplier=Math.pow(1.5,i*(0.9+0.1*i))
		var bulk=Math.floor(player.stars.div(i).div(tierCosts[i-1]).times(multiplier-1).plus(1).log10()/Math.log10(multiplier))
		
		player.stars=player.stars.sub(getCost(i,bulk))
		player.generators[i-1].bought+=bulk
		player.generators[i-1].amount=player.generators[i-1].amount.add(bulk)
	}
	updateCosts()
}
	
function getGeneratorMultiplier(tier) {
	return Decimal.pow(1.05,player.generators[tier].bought)
}

// experimenting
layout=1

function doubleStars() {
	player.stars=player.stars.times(2)
}

function transfer() {
	if (confirm('Are you sure to overwrite your save to old design save?')) {
		try {
			savefile=JSON.parse(atob(localStorage.getItem('save')))
			
			if (savefile.version<=0.6003) {
				savefile.stars=savefile.points
				var temp = []
				for (i=1;i<10;i++) {
					temp.push(savefile.generators['t'+i])
				}
				temp.push({amount:savefile.generators.t10,bought:savefile.generators.t10})
				savefile.generators=temp
				
				delete savefile.points
			}
			
			savefile.stars=new Decimal(savefile.stars)
			for (i=0;i<10;i++) {
				savefile.generators[i].amount=new Decimal(savefile.generators[i].amount)
			}
			
			savefile.version=player.version
			player=savefile
			console.log('Game loaded!')
		} catch (e) {
			console.log('Your save failed to load:\n'+e)
			alert('Well, we tried.')
		}
	}
}

function switchLayout() {
	hideElement('layout'+layout)
	layout=layout%2+1
	showElement('layout'+layout,'table')
}
	
load()
updateCosts()
setInterval(function(){
	var currentTime = new Date().getTime()
	if (player.lastUpdate>0) {
		var diff=(currentTime-player.lastUpdate)/1000
		player.playtime+=diff
		for (i=0;i<10;i++) {
			var addAmount=player.generators[i].amount.times(getGeneratorMultiplier(i)).times(diff)
			if (i==0) {
				player.stars=player.stars.add(addAmount)
			} else {
				player.generators[i-1].amount=player.generators[i-1].amount.add(addAmount)
			}
		}
	}
	player.lastUpdate=currentTime
	
	updateElement('stars',format(player.stars))
	updateElement('sPS',format(player.generators[0].amount.times(getGeneratorMultiplier(0))))
	if (tab!=oldTab) {
		showElement('tab'+tab,'block')
		hideElement('tab'+oldTab)
		oldTab=tab
	}
	
	if (tab=='gen') {
		var highestTierGot=0
		for (i=0;i<9;i++) {
			if (player.generators[i].amount.gt(0) || player.generators[i].bought>0) {
				highestTierGot=i+1
			}
		}
		for (i=0;i<10;i++) {
			if (i>0) {
				if (highestTierGot>=i) {
					showElement('t'+(i+1)+'GenRow','table-row')
				} else {
					hideElement('t'+(i+1)+'GenRow')
				}
			}
			if (player.generators[i].amount.eq(player.generators[i].bought)) {
				updateElement('t'+(i+1)+'Gen','Tier '+(i+1)+' generator<br>'+format(player.generators[i].bought)+'')
			} else {
				updateElement('t'+(i+1)+'Gen','Tier '+(i+1)+' generator<br>'+format(player.generators[i].amount)+', '+format(player.generators[i].bought)+' bought')
			}
			updateElement('t'+(i+1)+'GenButton','Cost: '+format(tierCosts[i]))
			if (player.stars.gte(tierCosts[i])) {
				updateClass('t'+(i+1)+'GenButton','shopButton')
			} else {
				updateClass('t'+(i+1)+'GenButton','shopUnafford')
			}
		}
	}
	
	if (tab=='gen') {
		var highestTierGot=0
		for (i=0;i<9;i++) {
			if (player.generators[i].amount.gt(0) || player.generators[i].bought>0) {
				highestTierGot=i+1
			}
		}
		for (i=0;i<10;i++) {
			if (i>0) {
				if (highestTierGot>=i) {
					visibleElement('t'+(i+1)+'GenCell')
				} else {
					invisibleElement('t'+(i+1)+'GenCell')
				}
			}
			if (player.generators[i].amount.eq(player.generators[i].bought)) {
				updateElement('t'+(i+1)+'Gen2','Tier '+(i+1)+' generator<br>'+format(player.generators[i].bought)+'')
			} else {
				updateElement('t'+(i+1)+'Gen2','Tier '+(i+1)+' generator<br>'+format(player.generators[i].amount)+', '+format(player.generators[i].bought)+' bought')
			}
			updateElement('t'+(i+1)+'GenButton2','Cost: '+format(tierCosts[i]))
			if (player.stars.gte(tierCosts[i])) {
				updateClass('t'+(i+1)+'GenButton2','shopButton')
			} else {
				updateClass('t'+(i+1)+'GenButton2','shopUnafford')
			}
		}
	}
})

setInterval(save(),600000)