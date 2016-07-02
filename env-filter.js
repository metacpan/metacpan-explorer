var text = "";
process.stdin.resume();
process.stdin.on("data", function(data){ text += data; });
process.stdin.on("end", function(){
  var bust = (new Date()).getTime().toString(36);
  process.stdout.write(
    text
      .replace(/\{\{bust\}\}/g, bust)
      .replace(/(?:<!--\s+)?\{\{(dev|build)\}\}((?:.|\n)+?)?\{\{\/\1\}\}(?:\s+-->)?/g, function(_, env, content){
        // Enable the contents of the 'build' sections and remove the 'dev' sections.
        return env === 'build' ? content : '';
      })
      // Remove any remaining blank lines.
      .replace(/\n{2,}/g, "\n")
  );
});
