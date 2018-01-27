function initTooltips() {
	var tooltips=document.getElementsByTagName('tooltip')
	for (i=0;i<tooltips.length;i++) {
		var name=i
		if (tooltips[i].id!='') {
			name=tooltips[i].id
		}
		tooltips[i].innerHTML='<text id="tooltipBase'+name+'">'+tooltips[i].innerHTML+'</text>'
		tooltips[i].style.position='relative'
		var tooltip=document.createElement('span')
		tooltip.id='tooltip'+name
		tooltip.className='message'
		tooltip.innerHTML=tooltips[i].getAttributeNode('message').value
		tooltips[i].appendChild(tooltip)
	}
}

function updateTooltipBase(id,text) {
	document.getElementById('tooltipBase'+id).innerHTML=text
}

function updateTooltip(id,message) {
	document.getElementById('tooltip'+id).innerHTML=message
}