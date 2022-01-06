const store = document.querySelector('.store');
const menu = document.querySelector('.menu')
const menuProducts = document.querySelector('.menu-products');
const menuButton = document.querySelector('.nav-second button');
const totalPrice = document.querySelector('.total-price');
const warningMenu = document.querySelector('.warning');


let products = [
	{
		name: 'Cola',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 12,
		id: 1,
	},
	{
		name: 'Tv',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 200,
		id: 2,
	},
	{
		name: 'PC',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 1200,
		id: 3,
	},
	{
		name: 'Water',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 4,
		id: 4,
	},
	{
		name: 'Microwave',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 230,
		id: 5,
	},
	{
		name: 'Crisps',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, et.',
		price: 11,
		id: 6,
	},
]


let Cart = {
	items: [],

	addProduct(product) {
		let hasProduct = this.items.find(item => item.id === product.id);

		if (hasProduct) {
			hasProduct.quantity++
		} else {
			this.items.push({
				quantity: 1,
				...product,
			})
		}
		OuterMenu.renderCart()
		console.log(this.items)

	},

	removeProduct(id) {
		const productIndex = this.items.findIndex(item => item.id === id)
		this.items.splice(productIndex, 1)
	},

	getTotalPrice() {
		let totalPrice = 0;

		this.items.forEach(item => {
			totalPrice += item.price * item.quantity;
		})

		return totalPrice
	},

	saveToStorage() {
		localStorage.setItem('products', JSON.stringify(this.items));
	},

	syncWithStorage() {
		this.items = JSON.parse(localStorage.getItem('products'));
	}
}

let OuterMenu = {
 	renderCart() {
		menuProducts.innerHTML = '';
		totalPrice.innerHTML = Cart.getTotalPrice().toLocaleString() + ' $'

		Cart.items.forEach(product => {
			menuProducts.innerHTML += `
				<div class="menu-product ${product.id}">
					<div class="menu-product__name">${product.name}</div>
					<div class="menu-product__description">${product.description}</div>
					<div class="menu-product__price">${product.price}$</div>
					<div class="menu-product__price">${product.quantity}шт</div>
				</div>
			`
		})
	}, 

	showWarning() {
		warningMenu.classList.remove('active')
	},

	showProducts() {
		products.forEach(product => {
			store.innerHTML += 
					`<div class="store-product">
						<div class="store-product__name">${product.name}</div>
						<div class="store-product__description">${product.description}</div>
						<div class="store-product__price">${product.price}$</div>
						<button class="store-product__button ${product.id}">add</button>
					</div>`
		})
	}
}

menuButton.addEventListener('click', el => {
	menu.classList.toggle('active');

	if (menu.classList[1]) {
		warningMenu.classList.add('active');
		setTimeout(OuterMenu.showWarning, 2000)
	}
})

store.addEventListener('click', el => {
	let target = el.target
	if (target.tagName === 'BUTTON') {
		let value = parseInt(target.classList[1]);
		products.forEach(product => {
			if (product.id == value) {
				Cart.addProduct(product)
			}
		})
	}
})

menu.addEventListener('dblclick', el => {
	let targetProductId = parseInt(el.target.parentNode.classList[1])
	let product = Cart.items.find(item => item.id === targetProductId)

	if (product) {
		Cart.removeProduct(product.id);
		OuterMenu.renderCart();
	}
})


OuterMenu.showProducts();

window.addEventListener('unload', () => {
	Cart.saveToStorage()
})

window.addEventListener('DOMContentLoaded', () => {
	Cart.syncWithStorage()
	OuterMenu.renderCart()
})