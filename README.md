# Iconly

<img src="iconly-logo.svg" width="400" height="200">

Icon management for Lifely stack. The project will read a source directory of icons and output:

- JSON with icons
- Icons as (react) components
- Possibly a typed and generalized icon component

## Getting started

Run the script from its own directory. Some TSConfig values don't like Iconly. The script takes 2 arguments; `inputDir` and `outputDir`.

Any folder names are suffixed with `Group`

## Source rules

Every folder and icon must:

- be in small caps
- contain no spaces, use camelCasing instead
- camelCasing is allowed and encouraged

> Folders are automatically suffixed with `Group`, so please don't use that in folder naming

Additionally, icons can:

- Have a variant, prefixed with `-`. (Variants are not really supported, but I'd like to establish the pattern in advance)

For sanity please in order: `iconName`-`variantName`

Valid examples:

- someFolder/fancyIcon.svg
- someFolder/userIcon-loggedIn.svg

> Only `.svg` files are being parsed, everything else is ignored

## Usage

To use Iconly, make sure to import the component and the IconLibrary:

```JS
import { Icon,  Icons } from '..'
```

Then you can use the components as following:

```JS
// this icon has a size of 12x12 and 16x16
<Iconly icon={Icons.beheersingGroup.assessment} /> // Outputs default (smallest) icon, 12x12 in this case
<Iconly icon={Icons.beheersingGroup.assessment} size={12} /> // Does the same as above
<Iconly icon={Icons.beheersingGroup.assessment} size={14} /> // Also uses the 12x12 icon, but streches it to 14x14
<Iconly icon={Icons.beheersingGroup.assessment} size={16} /> // Actually uses the 16x16 icon
<Iconly icon={Icons.beheersingGroup.assessment} size={[30, 12]} /> // Uses the 16x16 icon, but has a bigger box. (Preserving aspect ratios)
```

Since you are directly importing the complete SVG library, anything after `Icons.` should be autocompleted by intellisense. The optional `size` parameter takes either a `number` (assuming square) or an array of 2 numbers (`[number, number]`) for full control over width and height. When there are more then one sizes available in the library, it will try and find the best match, but will never pick a larger icon. Viewport sizes are treated as 'minimum' sizes here. Additionally, the size passed is used on the wrapping element so any size would be possible. In most cases, you can omit the size prop.
