player={points:new Decimal(10),
lastUpdate:0,
generators:{t1:{amount:new Decimal(0),bought:0},
t2:{amount:new Decimal(0),bought:0},
t3:{amount:new Decimal(0),bought:0},
t4:{amount:new Decimal(0),bought:0},
t5:{amount:new Decimal(0),bought:0},
t6:{amount:new Decimal(0),bought:0},
t7:{amount:new Decimal(0),bought:0},
t8:{amount:new Decimal(0),bought:0},
t9:{amount:new Decimal(0),bought:0},
t10:0}}
tierCosts=[]

function abbreviation(label,step) {
	var haListU = ['U','D','T','Q','q','Sx','s','O','N']
	var haListT = ['D','V','T','Q','q','S','s','O','N']
	var haListH = ['C','Dn','Tn','Qn','qn','Sn','sn','On','Nn']
	abb=''
	if (label==0) {
		return 'k'
	}
	if (label==1) {
		return 'M'
	}
	if (label>=2000) {
		abb+=abbreviation(Math.floor(label/1000),step+1)
	}
	if (Math.floor(label/1000)%1000!=0) {
		var haListP = ['Mi','Mc','Na','Pc','Ft','At','Zp','Yc','Xn','Dk',
		'MiDk','McDk','NaDk','PcDk','FtDk','AtDk','ZpDk','YcDk','XnDk','Is',
		'MiIs','McIs','NaIs','PcIs','FtIs','AtIs','ZpIs','YcIs','XnIs','Tc',
		'MiTc','McTc','NaTc','PcTc','FtTc','AtTc','ZpTc','YcTc','XnTc','tc',
		'Mitc','Mctc','Natc','Pctc','Fttc','Attc','Zptc','Yctc','Xntc','Pc',
		'MiPc','McPc','NaPc','PcPc','FtPc','AtPc','ZpPc','YcPc','XnPc','Hc',
		'MiHc','McHc','NaHc','PcHc','FtHc','AtHc','ZpHc','YcHc','XnHc','hc',
		'Mihc','Mchc','Nahc','Pchc','Fthc','Athc','Zphc','Ychc','Xnhc','Oc',
		'MiOc','McOc','NaOc','PcOc','FtOc','AtOc','ZpOc','YcOc','XnOc','Nc',
		'MiNc','McNc','NaNc','PcNc','FtNc','AtNc','ZpNc','YcNc','XnNc','Ht','MiHt','McHt']
		abb+=haListP[step-1]
	}
	if (label%10!=0) {
		if (label%100==2) {
			abb+='B'
		} else {
			abb+=haListU[label%10-1]
		}	
	}
	if (Math.floor(label/10)%10!=0) {
		abb+=haListT[Math.floor(label/10)%10-1]
		if (Math.floor(label)%10==0 && Math.floor(label/10)%10 != 1) {
			abb+='g'
		}
	}
	if (Math.floor(label/100)%10!=0) {
		abb+=haListH[Math.floor(label/100)%10-1]
	}
	return abb
}

function letter(label) {
	letters=0
	amountOfWords=1
	difference=-1
	do {
		difference=BigInteger.add(difference,amountOfWords)
		amountOfWords=BigInteger.multiply(amountOfWords,26)
		letters++
	}
	while (BigInteger.divide(label,amountOfWords)>=1);
	label=BigInteger.subtract(label,difference)
}

function format(number) {
	if (number.e>=Number.MAX_VALUE & number.neq(0)) {
		return 'Infinite'
	} else if (number.gte(1000) || number.eq(1000)) {
		var label = BigInteger.divide(number.e,3)
		return number.div(Decimal.pow(1000,label)).toPrecision(3).toString()+abbreviation(BigInteger.subtract(label,1),1)
	} else {
		return number.toFixed(0).toString()
	}
}

function updateGeneratorCosts() {
	for (i = 1; i < 10; i++) { 
		tierCosts[i-1]=new Decimal(10**(i*(0.9+0.1*i))).times(new Decimal(1.5).pow(player.generators['t'+i].bought*(0.1+(i*0.9))))
	}
	tierCosts[9]=new Decimal(10**19).times(new Decimal(1.5).pow(player.generators.t10*9.1))
}

function buyGenerator(tier) {
	if (player.points.gte(tierCosts[tier-1])) {
		player.points=player.points.sub(tierCosts[tier-1])
		if (tier == 10) {
			player.generators.t10+=1
		} else {
			player.generators['t'+tier].amount=player.generators['t'+tier].amount.add(1)
			player.generators['t'+tier].bought+=1
		}
		updateGeneratorCosts()
	}
}

function save() {
	localStorage.setItem('save',btoa(JSON.stringify(player)))
}

function load() {
	try {
		savefile=JSON.parse(atob(localStorage.getItem('save')))
		savefile.points=new Decimal.fromString(savefile.points)
		savefile.generators.t1.amount=new Decimal.fromString(savefile.generators.t1.amount)
		savefile.generators.t2.amount=new Decimal.fromString(savefile.generators.t2.amount)
		savefile.generators.t3.amount=new Decimal.fromString(savefile.generators.t3.amount)
		savefile.generators.t4.amount=new Decimal.fromString(savefile.generators.t4.amount)
		savefile.generators.t5.amount=new Decimal.fromString(savefile.generators.t5.amount)
		savefile.generators.t6.amount=new Decimal.fromString(savefile.generators.t6.amount)
		savefile.generators.t7.amount=new Decimal.fromString(savefile.generators.t7.amount)
		savefile.generators.t8.amount=new Decimal.fromString(savefile.generators.t8.amount)
		savefile.generators.t9.amount=new Decimal.fromString(savefile.generators.t9.amount)
		player=savefile
		updateGeneratorCosts()
	} catch(err) {
		console.log('Your save failed to load:\n'+err)
		localStorage.clear('save')
	}
}

function reset() {
	if (confirm('Are you really sure to reset?')) {
		localStorage.clear('save')
		player={points:new Decimal(10),
		lastUpdate:0,
		generators:{t1:{amount:new Decimal(0),bought:0},
		t2:{amount:new Decimal(0),bought:0},
		t3:{amount:new Decimal(0),bought:0},
		t4:{amount:new Decimal(0),bought:0},
		t5:{amount:new Decimal(0),bought:0},
		t6:{amount:new Decimal(0),bought:0},
		t7:{amount:new Decimal(0),bought:0},
		t8:{amount:new Decimal(0),bought:0},
		t9:{amount:new Decimal(0),bought:0},
		t10:0}}
		updateGeneratorCosts()
	}
}

load()
updateGeneratorCosts()
setInterval(function(){
	date=new Date()
	time=date.getTime()
	if (player.lastUpdate > 0) {
		player.points=player.points.add(player.generators.t1.amount.mul((time-player.lastUpdate)/1000).mul(new Decimal.pow(1.03,player.generators.t1.bought)))
		for (i = 1; i < 9; i++) { 
			player.generators['t'+i].amount=player.generators['t'+i].amount.add(player.generators['t'+(i+1)].amount.mul((time-player.lastUpdate)/1000).mul(new Decimal.pow(1.03,player.generators['t'+i].bought)))
		}
		player.generators.t9.amount=player.generators.t9.amount.add(new Decimal(player.generators.t10*(time-player.lastUpdate)/1000).mul(new Decimal.pow(1.03,player.generators.t10)))
	}
	player.lastUpdate=time
	
	document.getElementById("points").innerHTML=format(player.points)+' points'
	document.getElementById("pPS").innerHTML=format(player.generators.t1.amount.mul(new Decimal.pow(1.03,player.generators.t1.bought)))+' points per second'
	for (i = 1; i < 10; i++) { 
		document.getElementById("shop"+i).innerHTML='T'+i+' Generator x'+format(player.generators['t'+i].amount)+'<br>'+format(new Decimal(player.generators['t'+i].bought))+' bought<br>Cost: '+format(tierCosts[i-1])
	}
	document.getElementById("shop10").innerHTML='T10 Generator x'+format(new Decimal(player.generators.t10))+'<br><br>Cost: '+format(tierCosts[9])
},50)

setInterval(function(){
	save()
},60000)