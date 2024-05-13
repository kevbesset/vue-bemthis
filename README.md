# Vue BEM this !

> A simple utility for conditionally joining classes together following BEM methodology

## Documentation

BEM documentation: https://getbem.com/

## Install

Install inside your project using NPM

```bash
npm install vue-bemthis
```

## Usage

vue-bemthis works better with SCSS modules for scoped styles. In this example we use SCSS but this also works with CSS

Then, declare it like this in your Vue component:

```vue
<script setup lang="ts">
import { useBem } from "vue-bemthis";

const { block, element } = useBem();
</script>
```

vue-bemthis automatically detects the block of you SCSS file, in your Single file component.

If you respect the BEM methodology, it should be the only class with no "\_\_" or "--". In any case, if you need to override the default block found, you can do `useBem('some-other-block-name')`.

Then, in your template, you can use it like this:

### Basic usage

```vue
<ul :class="block()">
  <li :class="element("item")">
    <a href="example.com" :class="element("link")">
      Link
    </a>
  </li>
</ul>
```

### Usage with modifiers

vue-bemthis also gives you the possibility to add modifier for both block and elements. You have multiple ways to apply modifiers.

For example for a block named "list", it will get the scoped styles for:

- `block("listModifier")` -> `.list .list--listModifier`
- `block(["one", "two"])` -> `.list .list--one .list--two`
- `block({ one: true, two: false })` -> `.list .list--one`

Of course, it works the same with element. For example for an element "item":

- `element("item", "itemModifier")` -> `.list__item .list__item--itemModifier`
- `element("item", ["one", "two"])` -> `.list__item .list__item--one .list__item--two`
- `element("item", { one: true, two: false })` -> `.list__item .list__item--one`

### Styles

Also, you SCSS could look like this. Notice that we use `module` CSS instead of `scoped`, but styles are still scoped to your component this way.

```vue
<style module lang="scss">
.list {
  // styles for list

  &--listModifier {
    // styles for list with modifier "listModifier"
  }

  &__item {
    // styles for item

    &--itemModifier {
      //styles for item with modifier "itemModifier"
    }
  }

  &__link {
    // styles for link
  }
}
<style>
```

## Short syntax

vue-bemthis gives you the possibility to replace `block` and `element` methods with respective alias `b` and `e`
