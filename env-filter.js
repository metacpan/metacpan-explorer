var text = "";
process.stdin.resume();
process.stdin.on("data", function(data){ text += data; });
process.stdin.on("end", function(){
  process.stdout.write(
    text
    .replace(/(<!--\s+\{\{dev\}\}(.|\n)+?\{\{\/dev\}\}\s+-->\n?)/g, "")
    .replace(/(<!--\s+\{\{build\}\}.*\n?|.*\{\{\/build\}\}\s+-->\n?)/mg, "")
  );
});
