// Plugin imports
const autoprefixer = require('autoprefixer');
const units = require('postcss-units');

// Config
module.exports = () => ({
    plugins: [
        autoprefixer(),
        units({
            size: (16 * 0.9), // Naviga sets the root font-size to 90%.
        }),
    ],
});
