const education = document.getElementById('education')
const networth = document.getElementById('networth')
const caste = document.getElementById('caste')
const skills = document.getElementsByClassName('skills')
const age = document.getElementsByName('age')
const reputations = document.getElementsByClassName('reputation')
const startingBid = document.getElementById('starting_bid')
const Bridname = document.getElementById('name')
const letter = document.getElementById('letter')

const calculate = () => {
	let bridename = Bridname.value
	let price = Number(startingBid.value)
	if (!bridename || !price) {
		alert('Please enter both the name and the starting bid!')
		return
	}

	let loveLetter = letter.value
	let brideEducation = Number(education.value)
	let brideNetworth = Number(networth.value)
	let brideCaste = Number(caste.value)

	price = price * brideEducation
	price = price * brideNetworth
	price = getRadioValue(age, price)
	price = getCheckboxValuesForLoop(reputations, price)
	price = price + brideCaste
	price = getCheckboxValuesReduce(skills, price)

	let person = {
		bride_name: bridename,

		bride_price: price,

		letter_to_bride: loveLetter,
	}

	document.getElementById(
		'result'
	).innerHTML = `The price for your bride ${bridename} is $${price}. Your love letter is "${loveLetter}"`
}

document.getElementById('submit').addEventListener('click', calculate)

const getCheckboxValuesReduce = (html_collection, price) => {
	let list = Array.from(html_collection).filter(filteration)
	let result = list.reduce(reducer, price)
	return result
}

const reducer = (accumulator, item) => {
	return accumulator + Number(item.value)
}

const filteration = item => {
	return item.checked
}

const getRadioValue = (node_list, price) => {
	node_list.forEach(item => {
		if (item.checked) {
			price = price * Number(item.value)
		}
	})
	return price
}

const getCheckboxValuesForLoop = (html_collection, price) => {
	for (let i = 0; i < html_collection.length; i++) {
		if (
			html_collection[i].checked &&
			Number.isInteger(Number(html_collection[i].value))
		) {
			price = price + Number(html_collection[i].value)
		} else if (
			html_collection[i].checked &&
			!Number.isInteger(html_collection[i].value)
		) {
			price = price * Number(html_collection[i].value)
		}
	}
	return price
}
