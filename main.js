var colors = require('colors'); // https://www.npmjs.com/package/colors
var blessed = require("blessed"); // https://www.npmjs.com/package/blessed


var main_field_box = blessed.box({
    top: "20%",
    width: "100%",
    left: "center",
    height: "100%",
    tags: true,
    style: {
      bg: "red",
    },
  });
  var form_1 = blessed.form({
    parent: screen,
    keys: true,
    left: "center",
    width: "100%",
    height: "30%",
    tags: true,
    style: {
      bg: "yellow",
    },
  });
  var label_1 = blessed.text({
    parent: form_1,
    top: "5%",
    left: "40%",
    width: "30%",
    height: "5%",
    colors: "black",
    inputOnFocus: true,
    content: "Game of life",
    tags: true,
    style: {
      bg: "red",
      fg: "cyan",
    },
  });
  
  
  var button_1 = blessed.button({
    top: "50%",
    left: "45%",
    width: "24%",
    height: "10%",
    inputOnFocus: true,
    tags: true,
    content: "Start",
    style: {
      bg: "gray", // bg: "#FFF830",
      fg: "#ffffff",   // fg: "black",
      focus: {
        bg: "cyan", // bg: "green",
      },
    },
  });
  
  
  // Quit on Escape, q, or Control-C.
  screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
  });
  // action buttons
  
  
  button_1.on("press", function () {
    //start
    A = new field_completion(
      parseInt(main_field_box.height),
      parseInt(main_field_box.width / 2)
    );
    A.cout_arr();
    id = setInterval(() => {
      A.update_field();
      A.cout_arr();
    });
  });