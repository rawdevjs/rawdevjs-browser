# rawdevjs-browser

RawDevJS browser interface.
Renders DNG files into HTML `div` blocks.

## Usage

Just load the built `rawdevjs.js` file in your HTML: `<script src="rawdevjs.js"></script>`.
It will search for all `div` elements with the class `rawdevjs`.
The `div` element must contain a `data-src` attribute which points to a DNG file.
The DNG will be fetched and rendered as PNG into a blob URL.
An `img` element will be attached to the `div` element which points to the blob URL.

### Example

Run `npm run build` to build the example.
Copy all files in the folder `.build` to a web server and load the `index.html` in your browser.
For example [http-server](https://www.npmjs.com/package/http-server) can be used.
If the package is installed global just run: `http-server .build` and open [http://localhost:8080/](http://localhost:8080/) in your browser.
