const handleMenu = (element, navState) => {
	if(navState){
		element.classList.add(element.classList[0] + '--closed')
		setTimeout(() => {
			element.classList.remove(element.classList[0] + '--open')
		},250)
	} else {
		element.classList.remove(element.classList[0] + '--closed')
		element.classList.add(element.classList[0] + '--open')
	}
}
const pageHeader = document.querySelector('.header')
let navOpen = false
pageHeader.children[0].children[2].addEventListener('click', () => { handleMenu(pageHeader.children[1], navOpen), !navOpen ? navOpen = true : navOpen = false })

class SubMenu {
	constructor(element){
		this.menuOpen = false
		this.selector = element.children[0]
		this.menu = element.children[1]
		this.selector.addEventListener('click', () => {handleMenu(this.menu, this.menuOpen), !this.menuOpen ? this.menuOpen = true : this.menuOpen = false})
	}
}

new SubMenu(document.querySelector('#categorySubMenu'))
new SubMenu(document.querySelector('#postsSubMenu'))

const mason = document.querySelector('.mason')

const oneColumn = (bricks) => {
	bricks.reduce(function(acc, card, i){
		card.style.top = acc + 'px'
		card.style.left = 0
		let total = acc + card.offsetHeight
		if(i === bricks.length - 1){
			mason.style.height = total + 'px'
		}
		return total
	},0)
}
const twoColumn = (bricks) => {
	let columns = {
		firstCol: 0,
		secondCol: 0,
	}
	bricks.reduce(function(columns, card, i){
		if(columns.firstCol <= columns.secondCol){
			card.style.top = columns.firstCol + 'px'
			columns.firstCol += card.offsetHeight
		} else {
			card.style.top = columns.secondCol + 'px'
			card.style.left = 50 + '%'
			columns.secondCol += card.offsetHeight
		}
		return columns
	}, columns)	
}
const threeColumn = (bricks) => {
	let columns = {
		firstCol: 0,
		secondCol: 0,
		thirdCol: 0,
	}
	bricks.reduce(function(columns, card, i){
		if(columns.firstCol <= columns.secondCol && columns.firstCol <= columns.thirdCol){
			card.style.top = columns.firstCol + 'px'
			columns.firstCol += card.offsetHeight
		} else if (columns.secondCol <= columns.firstCol && columns.secondCol <= columns.thirdCol){
			card.style.top = columns.secondCol + 'px'
			card.style.left = 33 + '%'
			columns.secondCol += card.offsetHeight
		} else if (columns.thirdCol <= columns.firstCol && columns.thirdCol <= columns.secondCol){
			card.style.top = columns.thirdCol + 'px'
			card.style.left = 66 + '%'
			columns.thirdCol += card.offsetHeight
		}
		return columns
	}, columns)		
}
const fourColumn = () => {
	
}
const masonPosition = (element, width) => {

	const bricks = Array.from(element.children).slice(1)
	if(width < 800){
		oneColumn(bricks)
	} else if(width < 1600){
		twoColumn(bricks)
	} else if(width < 1800){
		threeColumn(bricks)
	} else {
		fourColumn(bricks)
	}
}

window.onload = function() {
	masonPosition(mason, document.documentElement.offsetWidth)
}

window.onresize = function(){
	masonPosition(mason, document.documentElement.offsetWidth)
}
