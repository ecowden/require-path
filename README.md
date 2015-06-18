# require-path
Recursively `require(...)` files from a directory tree in Node.js

Works with Node.js `v0.12.0` and above.

## Usage

```js
requirePath({
    path: '.',                         // Where to look for modules. default: '.'
    include: ['**/*.js', '**/*.json'], // default: ['**/*.js', '**/*.json']
    exclude: ['**/*Spec.js']           // default: ['**/*Spec.js']
  })

  // returns a standard promise
  .then(function (modules) {
    // modules is a map of filenames to required components from those files
  })

  // don't forget to handle errors!
  .catch(handleError);
```
