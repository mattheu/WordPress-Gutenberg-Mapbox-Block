# Matts Mapbox Map Gutenberg Block Test

Insert map blocks in Gutenberg. Stunning maps provided by Mapbox.

Note that Mapbox is not free, but they do have a free tier that allows 50k map views per month.

## Usage

You will need a Mapbox account and API key. Define the key in your `wp-config.php` like so:

```php
define( 'MATTHEU_GB_MB_TEST_KEY', 'KEY' );
```

## Build

* Install dependencies by running `yarn` or `npm install`.
* To build run `npm run build`
* Development run `npm run watch`

## TODO

- Adding points
- Adding geoJSON
