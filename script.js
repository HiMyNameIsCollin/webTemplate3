

class SubMenu {
	constructor(element){
		this.menuOpen = false
		this.menuActive = false
		this.selector = element.children[0]
		this.menu = element.children[1]
		this.selector.addEventListener('click', () => this.handleMenu())
		this.handleMenu = function(){
			if(!this.menuOpen){
				this.menu.classList.add('subMenu--open')
				this.menu.classList.remove('subMenu--closed')
				this.menuOpen = true
			} else {
				this.menu.classList.add('subMenu--closed')
				setTimeout(() => {
					this.menu.classList.remove('subMenu--open')
				},250)
				this.menuOpen = false
			}
		}
	}
}

const categorySubMenu = new SubMenu(document.querySelector('#categorySubMenu'))

