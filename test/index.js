var eslint = require('eslint')
var test = require('tape')
var path = require('path')

var linter = new eslint.CLIEngine({
  configFile: path.join(__dirname, '..', 'eslintrc.json')
})

test('"no-multiple-empty-lines": [2, {"max": 3, "maxEOF": 1}]', function (t) {
  t.plan(1)
  var result = linter.executeOnText("console.log('hi there')\n\n\n\n\nconsole.log('ok')\n")
  t.equals(result.results[0].messages[0].message, 'More than 3 blank lines not allowed.')
})

test('"padded-blocks": 0', function (t) {
  t.plan(2)
  var result = linter.executeOnText("function f () {\n\n  console.log('hi')\n}\nf()\n")
  t.equals(result.errorCount, 0)
  t.equals(result.warningCount, 0)
})
