var colors = require('colors'); // https://www.npmjs.com/package/colors
var blessed = require("blessed"); // https://www.npmjs.com/package/blessed


function random(min, max) { // Рандом для заповнення
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

 class field_completion{
  #height;
  #width;
  #arr_current;
  #arr_old;
  constructor(height, width) {
      this.#height = height;
      this.#width = width;
      this.#arr_current = new Array(height);
      this.#arr_old = new Array(height);
      for (var i = 0; i < height; i++) {
        this.#arr_current[i] = new Array(width);
        this.#arr_old[i] = new Array(width);
      }
      this.mix();
    }

    clear() { // Очищення відображення
      main_field_box.setContent("");
      screen.render();
    }

    

    mix(){ // Заповнення
      for(var i = 0; i< this.#height; i++){
        for(var j = 0; j< this.#width; j++){
          this.#arr_current[i][j] = random(0, 3);
            if(this.#arr_current[i][j] == 1) this.#arr_current[i][j] = 1;
            else this.#arr_current[i][j] = 0;

            this.#arr_current[1][1] = 1;
            this.#arr_current[1][2] = 1;
            this.#arr_current[2][1] = 1;
            this.#arr_current[2][2] = 1;

            this.#arr_current[13][13] = 1;
            this.#arr_current[13][14] = 1;
            this.#arr_current[14][13] = 1;
            this.#arr_current[14][14] = 1;
        }
      }
    }
  
    cout_arr(){ // Виведення
      this.clear();
      for (var i = 0; i < this.#height; i++) {
        for (var j = 0; j < this.#width; j++) {
          if (this.#arr_current[i][j] == 1) {
            // alive
            main_field_box.setContent(main_field_box.content + "  ".bgGreen);
          }
          else {
            //dead
              main_field_box.setContent(main_field_box.content + "  ");
          }
        }
        main_field_box.setContent(main_field_box.content + "\n");
      }
      screen.render();
    }

    #check(n, m) { //перевірка координат
      if (n >= 0 && n < this.#height && m >= 0 && m < this.#width) {
        return true;
      }
      return false;
    }

    #define_point(height, width) { //логіка
      this.#arr_current[1][1] = 1;
      this.#arr_current[1][2] = 1;
      this.#arr_current[2][1] = 1;
      this.#arr_current[2][2] = 1;

      this.#arr_current[13][13] = 1;
      this.#arr_current[13][14] = 1;
      this.#arr_current[14][13] = 1;
      this.#arr_current[14][14] = 1;

      var result = 0;

      var height_1 = [
        height - 1,
        height - 1,
        height - 1,
        height,
        height + 1,
        height + 1,
        height + 1,
        height,
      ];
      var width_1 = [
        width - 1,
        width,
        width + 1,
        width + 1,
        width + 1,
        width,
        width - 1,
        width - 1,
      ];
  
      for (var i = 0; i < 8 && this.#check(height_1[i], width_1[i]); i++) {
        result += this.#arr_current[height_1[i]][width_1[i]];
      }
  
      if (this.#arr_current[height][width] == 1 && result <= 1) {
        return 0;
      } else if (this.#arr_current[height][width] == 0 && result == 3) {
        return 1;
      } else if (this.#arr_current[height][width] == 1 && result >= 4) {
        return 0;
      } else if (
        this.#arr_current[height][width] == 1 &&
        (result == 2 || result == 3)
      ) {
        return 1;
      } else {
        return 0;
      }
      
    }

    update_field() {  
      var arr_temp = Object.assign([], this.#arr_current);
      for (var i = 0; i < this.#height; i++) {
        for (var j = 0; j < this.#width; j++) {
          arr_temp[i][j] = this.#define_point(i, j);
        }
      }
      this.#arr_current = Object.assign([], arr_temp);
    }

 }

 var screen = blessed.screen({
  smartCSR: true,
});

//Додаємо елементи інтерфейсу
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
  height: "40%",
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
  content: "Гра життя",
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
      bg: "green", // bg: "green",
    },
  },
});


// Клавіші виходу
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});


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


// екран
screen.append(main_field_box);
screen.append(form_1);
// форми
form_1.append(label_1);
form_1.append(button_1);


screen.title = "Гра життя";

screen.render();
