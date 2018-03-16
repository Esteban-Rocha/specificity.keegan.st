<template>
	<transition name="scale" appear>
		<div class="item">
			<div class="input-wrap">
				<textarea type="text" class="input" v-model="selector" title="Enter a CSS selector"></textarea>
				<div class="selector" aria-hidden="true">
					<span v-for="part in selectorParts" :class="`type-${part.type}`">{{ part.selector }}</span>
				</div>
			</div>
			<dl class="specificity">
				<span class="type-a">
					<dt>IDs</dt>
					<dd>{{ specificityArray[1] }}</dd>
				</span>
				<span class="type-b">
					<dt>Classes, attributes and pseudo-classes</dt>
					<dd>{{ specificityArray[2] }}</dd>
				</span>
				<span class="type-c">
					<dt>Elements and pseudo-elements</dt>
					<dd>{{ specificityArray[3] }}</dd>
				</span>
			</dl>
			<a href="#" class="duplicate button" v-on:click.prevent="$emit('duplicate', selector)">Duplicate</a>
		</div>
	</transition>
</template>

<script src="./item.js"></script>

<style lang="scss">
	@import "./item.scss";
</style>
