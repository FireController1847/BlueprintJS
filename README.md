# BlueprintJS

![An example image of a blueprint fullscreen page.](https://imgur.com/eSURXji.png)

*Produced by hosting a local server using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for [Visual Studio Code](https://code.visualstudio.com/) and then visiting the `test/webpack.html` file.*

A simple HTML, CSS, &amp; JavaScript script to generate a blueprint-styled background for a website.

Requires [jQuery](https://jquery.com/). Does not require modules or Node.js. Runs independently of packing.

## Download

### Using a GitHub Release

The preferred way to include the script is by referencing a specific version from GitHub by using the associated version's release link, like so:

```html
<script src="https://github.com/FireController1847/BlueprintJS/releases/download/v1.0.1/blueprintjs-1.0.1.min.js"></script>
```

### Using the Bundled Files

You can also direcly download the file from the [GitHub releases](https://github.com/FireController1847/BlueprintJS/releases) page and host it yourself, if you so desire.

### Using the Source Files

Or, you can download the souce files and use them directly. Since the script doesn't use extra libraries or a server-side dependency, these files work without being packed together. However, the packed version is provided for your convinience, if you so desire.

The only files needed for
the script to work are `blueprint.js`, `blueprint.css`, and `blueprint.html`, which have to be hosted at the same file location, since they reference each other relative to the `blueprint.js` script file's location.

## Usage

Usage is as simple

## Example Code

### Webpack File

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack Blueprint Test</title>
    <link rel="stylesheet" href="../lib/css/bootstrap-reboot-5.3.7.min.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <span class="t-blueprint" hidden></span>
    <script src="../lib/js/jquery-3.7.1.min.js"></script>
    <script src="../dist/blueprintjs-1.0.1.js"></script>
</body>
</html>
```

### Source Files

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fullscreen Blueprint Test</title>
    <link rel="stylesheet" href="../lib/css/bootstrap-reboot-5.3.7.min.css">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="../src/blueprint.css">
</head>
<body>
    <span class="t-blueprint" hidden></span>
    <script src="../lib/js/jquery-3.7.1.min.js"></script>
    <script src="../src/blueprint.js"></script>
</body>
</html>
```
