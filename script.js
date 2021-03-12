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

