import specificity from 'specificity';
import item from './item.vue';

const getNextId = (() => {
	let id = 0;
	return () => {
		id += 1;
		return id;
	};
})();

export default {
	name: 'app',
	data() {
		return {
			items: [
				{
					initialSelector: 'nav > a:hover::before',
					id: getNextId(),
				}, {
					initialSelector: 'ul#primary-nav li.active',
					id: getNextId(),
				},
			],
		};
	},
	methods: {
		change(result, index) {
			this.items[index].result = result;
		},
		duplicate(selector, index) {
			this.items.splice(index, 0, {
				initialSelector: selector,
				id: getNextId(),
			});
		},
		sort() {
			this.items.sort((a, b) => {
				return specificity.compare(b.result.specificityArray, a.result.specificityArray);
			});
		},
	},
	components: {
		item,
	},
};
