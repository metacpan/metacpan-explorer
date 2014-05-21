var text = "";
process.stdin.resume();
process.stdin.on("data", function(data){ text += data; });
process.stdin.on("end", function(){
  process.stdout.write(
    text
      .replace(/(?:<!--\s+)?\{\{(dev|build)\}\}((?:.|\n)+?)?\{\{\/\1\}\}(?:\s+-->)?/g, function(){
        // Enable the contents of the 'build' sections and remove the 'dev' sections.
        return RegExp.$1 == 'build' ? RegExp.$2 : '';
      })
  );
});
