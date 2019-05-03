# mdevbox

## Get started

1. Clone repo
2. Install
   ```sh
   yarn
   ```
3. Build and Watch Web bundle
   ```sh
   yarn watch
   ```
4. Start Log server
   ```sh
   npm start
   ```
5. Put script tag on your website (must be first among all scripts)

   ```html
   <script src="http://localhost:8000/public/client.min.js"></script>
   ```

   > :warning: This script will override console methods, **only** include this on **development**!

6. Make sure you have `console.{log,warn,error}` on your website for testing
7. Check the logs on:
   ```
   http://localhost:8000/dashboard
   ```

## Tips

You can use `.env` file, it'll be loaded by `bnr` script

## License

MIT
