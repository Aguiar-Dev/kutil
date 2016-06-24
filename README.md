# kutil
Utility tool to debug and log values passed into it.

### Debug Usage
The debug functionality can be accessed by running `util.debug(title, data, status, logtype)` which will log according to the log type. The params work as follows:

 * title: is the Title of the log.

 * data: any type of data type passed in. It can also be an error return from a function.

 * status: an informational segment provided by the developer to keep track of the debug.

 * logtype: this determines whether the output will be through `console.log, console.warn, or console.error`.

 ```
 Example Usage:
 util.debug('Test Title', { apple: 'pie' }, 'Description Status', 'log');

 Output:

 [Thu, 06/23rd/16, 10:55:45pm]: Test Title:
 Description Status
 ==============================================
 {"apple":"pie"}
 ```
