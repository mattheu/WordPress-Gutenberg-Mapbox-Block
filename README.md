# Matts Mapbox Map Gutenberg Block Test

THIS PROJECT IS CURRENTLY IN DEVELOPMENT. THINGS ARE LIKELY TO CHANGE.

Insert map blocks in Gutenberg. Stunning maps provided by Mapbox.

Note that you will need a Mapbox account to use this.

![Example of the a full width map with satellite style.](https://user-images.githubusercontent.com/494927/28733390-d48324b2-73d3-11e7-936b-d52540a5727e.png)

Example of the a full width map with satellite style.

## Usage

You will need a Mapbox account and API key. Define the key in your `wp-config.php` like so:

```php
define( 'MATTHEU_GB_MB_TEST_KEY', 'KEY' );
```

## Build

* Install dependencies by running `yarn` or `npm install`.
* To build run `npm run build`
* Development run `npm run watch`
