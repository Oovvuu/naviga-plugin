# Oovvuu Naviga Plugin

[Naviga!](https://docs.navigaglobal.com/writer/) plugin that allows editors to add an Oovvuu embed to a post.

## Local Development

Test site: https://writer.dev.developer.infomaker.io/
_Credentials to login to the test site are in 1Password._

Naviga is a backend only CMS that acts very similar to Gutenberg. Content is created in Naviga and then sent out to sites for display via an RSS feed. For the purpose of this plugin, we are only worried about the Naviga backend, not the RSS feed.

The test site is a environment that is hosted by Naviga where we can perform local development on the plugin without affecting live sites. This is not a typical workflow since we are essentially going to be running our local code on the Naviga test site instead of on a local env.

Follow [this guide!](https://docs.navigaglobal.com/writer/developer-guide/index/quickstart#4-add-the-plugin-to-the-local-configuration) to install the plugin on the test site. Essentially, we are loading the plugin from `http://localhost:3000` on the test site. This seems to be the only way to render our code within an Naviga env.

### Builds

1. Install node modules `npm ci`
1. Start server `npm start`

After the server is started both the `index.js` and `style.css` files can be found at:
- `http://localhost:3000/index.js`
- `http://localhost:3000/style.css`
