# foo-lib

Collection of Node components to be used in different project

# Installing as npm package dependencies in your project

`npm instal --save-dev git+https://github.com/vivek-brohma/node-components`

# Working in local

Any change in component here would require you to do a `npm update foo-lib` everytime.

To solve this use `npm link` inside "foo-lib" and do a `npm link foo-lib` inside your project.
