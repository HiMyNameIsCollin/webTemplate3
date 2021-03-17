/*#####MENU######*/
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
const pageHeader = document.querySelector('.header')
let navOpen = false
pageHeader.children[0].children[2].addEventListener('click', () => { handleMenu(pageHeader.children[1], navOpen), !navOpen ? navOpen = true : navOpen = false })

/*#####MASONRY#####*/
const mason = document.querySelector('.mason')
const oneColumn = (bricks) => {
	bricks.reduce(function(acc, card, i){
		card.style.top = acc + 'px'
		card.style.left = 0 + 'px'
		let total = acc + card.offsetHeight
		if(i === bricks.length - 1){
			mason.style.height = total + 'px'
		}
		return total
	},0)
}
const twoColumn = (bricks, columns) => {
	bricks.reduce(function(columns, card, i){
		if(columns.firstCol <= columns.secondCol){
			card.style.top = columns.firstCol + 'px'
			card.style.left = 0 + 'px'
			columns.firstCol += card.offsetHeight
		} else {
			card.style.top = columns.secondCol + 'px'
			card.style.left = 50 + '%'
			columns.secondCol += card.offsetHeight
		}
		if(i === bricks.length - 1){
			columns.firstCol > columns.secondCol ? mason.style.height = columns.firstCol + 'px' : mason.style.height = columns.secondCol + 'px'
		}
		return columns
	}, columns)	
}
const threeColumn = (bricks, columns) => {
	bricks.reduce(function(columns, card, i){
		if(columns.firstCol <= columns.secondCol && columns.firstCol <= columns.thirdCol){
			card.style.top = columns.firstCol + 'px'
			card.style.left = 0 + 'px'
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
		if(i === bricks.length - 1){
			let tallest = 0
			for (const value in columns){
				if(columns[value] > tallest){
					tallest = columns[value]
				}
			}
			mason.style.height = tallest + 'px'
		}
		return columns
	}, columns)		
}
const fourColumn = (bricks, columns) => {
	bricks.reduce(function(columns, card, i){
		if(columns.firstCol <= columns.secondCol && columns.firstCol <= columns.thirdCol && columns.firstCol <= columns.fourthCol){
			card.style.top = columns.firstCol + 'px'
			card.style.left = 0 + 'px'
			columns.firstCol += card.offsetHeight
		} else if (columns.secondCol <= columns.firstCol && columns.secondCol <= columns.thirdCol && columns.secondCol <= columns.fourthCol){
			card.style.top = columns.secondCol + 'px'
			card.style.left = 25 + '%'
			columns.secondCol += card.offsetHeight
		} else if (columns.thirdCol <= columns.firstCol && columns.thirdCol <= columns.secondCol && columns.thirdCol <= columns.fourthCol){
			card.style.top = columns.thirdCol + 'px'
			card.style.left = 50 + '%'
			columns.thirdCol += card.offsetHeight
		} else if (columns.fourthCol <= columns.firstCol && columns.fourthCol <= columns.secondCol && columns.fourthCol <= columns.thirdCol){
			card.style.top = columns.fourthCol + 'px'
			card.style.left = 75 + '%'
			columns.fourthCol += card.offsetHeight		
		}
		if(i === bricks.length - 1){
			let tallest = 0
			for (const value in columns){
				if(columns[value] > tallest){
					tallest = columns[value]
				}
			}
			mason.style.height = tallest + 'px'
		}
		return columns
	}, columns)		
}	

const masonPosition = (element, width) => {
	let columns = {
		firstCol: 0,
		secondCol: 0,
		thirdCol: 0,
		fourthCol: 0
	}
	const bricks = Array.from(element.children).slice(1)
	if(width < 800){
		oneColumn(bricks)
	} else if(width < 1600){
		twoColumn(bricks, columns)
	} else if(width < 1800){
		threeColumn(bricks, columns)
	} else if(width > 1800) {
		fourColumn(bricks, columns)
	}
}
window.onload = () =>  masonPosition(mason, document.documentElement.offsetWidth)
window.onresize = () =>  masonPosition(mason, document.documentElement.offsetWidth)
window.addEventListener('orientationchange', () => setTimeout(() => masonPosition(mason, document.documentElement.offsetWidth),300))

/*#####SMOOTH SCROLL#####*/

const scrollDistance = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  let scrolled = (winScroll / height) * 100
  return scrolled
}

const showSmoothScroll = () => {
	document.querySelector('.smoothScroll').classList.remove('smoothScroll--inactive')
	document.querySelector('.smoothScroll').classList.add('smoothScroll--active')
}
const hideSmoothScroll = () => {
	document.querySelector('.smoothScroll').classList.add('smoothScroll--inactive')
	setTimeout(() => {
		document.querySelector('.smoothScroll').classList.remove('smoothScroll--active')
	},100)

}
window.addEventListener('scroll' , () => {
	if(scrollDistance() > 25){
		showSmoothScroll()	
	}else {
		hideSmoothScroll()
	}
})

/*#####SEARCH WINDOW######*/
let searchOpen = false
const searchButtons = [document.querySelector('.bigSearchButton'), document.querySelector('.header__icon--search'), document.querySelector('.searchWindow__closeBtn')]
searchButtons.forEach((btn, i) => btn.addEventListener('click', () => { handleMenu(document.querySelector('.searchWindow'), searchOpen ), !searchOpen ? searchOpen = true : searchOpen = false }))

/*#####SMOOTH SCROLL####*/
const handleScrollUp = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
document.querySelector('.smoothScroll').addEventListener('click', handleScrollUp)