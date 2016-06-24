# kutil
Utility tool to debug and log values passed into it.


### Debug Usage
* Pass in a string title and a object.
* Must start project with `DEBUG=true node src/your-entry-point`

```
const util = require('kutil');

util.debug(title, obj, status);
```

### Log Usage
* Pass in title and a second argument you want to log out.
* Pass in up to 4 arguments including the title.
* `util.log(title, arg, arg1, arg2);`

```
const util = require('kutil');

util.log(title, arg);
```

### Version Bump
In order to use the Version Bump feature simply follow this format `util.bump(version_number, label)`. Where the params are as follows:

 * version_number: is going to be the version number that you want to bump. It should follow the [Semantic Versioning](http://semver.org/) rules.

 * label: it specifies the type of bump to be made. It can be either MAJOR, MINOR or PATCH, if anything else is passed in it will return an error string. The label can be either lower or upper case.

```
Example Use:
util.bump('1.2.3', 'minor');

Output:
'1.3.0'
```
