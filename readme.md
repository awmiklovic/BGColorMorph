# Background Color Morph

Scroll between two background colors on any element. <a href="https://github.com/awmiklovic/BGColorMorph" target="_blank">View Demo</a>.

## Getting Started

Download the project directory or install via Bower.

### Bower

You can install the package via bower

```
$bower install bg-color-morph
```

Link the scripts in your head

```
<script src="/dist/bg-color-morph.js"></script>
<link rel="stylesheet" href="/dist/bg-color-morph.css" />
			      
```


## Set up

Create a bg-color-morph effect on any element by adding the class "bg-morph" to the element, and setting the attributes: "data-start-color", "data-end-color", "data-start-trigger", "data-end-trigger".

```
<section
	class="bg-morph"
	data-start-color="#f7b733"
	data-end-color="#fc4a1a"
	data-start-trigger="middle"
	data-end-trigger="middle">
	<h1>Section Content</h1>
</section>
```

### Start and End triggers

Each bg-morph element can both start and end its morph at either the top, middle or bottom of the viewport.

```
<section
	class="bg-morph"
	data-start-color="#f7b733"
	data-end-color="#fc4a1a"
	data-start-trigger="top"
	data-end-trigger="bottom">
	<h1>Section Content</h1>
	<p>Lorem ipsum dolor...</p>
</section>
```

### Examples

See it in action with more examples at the demo site: https://github.com/awmiklovic/BGColorMorph
