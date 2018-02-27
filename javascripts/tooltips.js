function initTooltips() {
	var tooltips=document.getElementsByTagName('tooltip')
	for (i=0;i<tooltips.length;i++) {
		var name=i
		if (tooltips[i].id!='') {
			name=tooltips[i].id
		}
		tooltips[i].innerHTML='<span id="tooltipBase'+name+'">'+tooltips[i].innerHTML+'</span>'
		tooltips[i].style.position='relative'
		var tooltip=document.createElement('span')
		tooltip.id='tooltip'+name
		tooltip.className='message'
		if (tooltips[i].getAttributeNode('disabled')!=undefined) if (tooltips[i].getAttributeNode('disabled').value==true) disableTooltip(tooltips[i].id,message)
		if (tooltips[i].getAttributeNode('malign')!=undefined) tooltip.className='message '+tooltips[i].getAttributeNode('malign').value
		if (tooltips[i].getAttributeNode('message')!=undefined) tooltip.innerHTML=tooltips[i].getAttributeNode('message').value
		tooltip.style['font-size']='initial'
		tooltips[i].appendChild(tooltip)
		tooltips[i].id=''
	}
}

function updateTooltipBase(id,text) {
	document.getElementById('tooltipBase'+id).innerHTML=text
}

function updateTooltip(id,message) {
	document.getElementById('tooltip'+id).innerHTML=message
}

function disableTooltip(id,message) {
	document.getElementById('tooltip'+id).classList.add('hidden')
}

function enableTooltip(id,message) {
	document.getElementById('tooltip'+id).classList.remove('hidden')
}