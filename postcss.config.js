// Plugin imports
const autoprefixer = require('autoprefixer');
const units = require('postcss-units');

// Config
module.exports = () => ({
    plugins: [
        autoprefixer(),
        units(),
    ],
});
