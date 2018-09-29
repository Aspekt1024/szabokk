import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import { jsdom } from 'jsdom'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// jsdom
global.document = jsdom('')
global.window = document.defaultView
global.navigator = {
	userAgent: 'node.js'
}

// enzyme
global.shallow = shallow
global.render = render
global.mount = mount

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.reduce(
			(result, prop) => ({
				...result,
				[prop]: Object.getOwnPropertyDescriptor(src, prop)
			}),
			{}
		)
	Object.defineProperties(target, props)
}

copyProps(document.defaultView, global)

// Fail tests on any warning
console.error = message => {
	throw new Error(message)
}

// import toJson from 'enzyme-to-json'; //for snapshot testing
// global.toJson = toJson;
