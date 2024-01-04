<template>
  <div>
    <el-card :body-style="'padding:0px;'" class="calculator-card">
      <div class="calculator-container">
        <div class="top-row">
          <input v-model="number" disabled type="text" class="input cal-display disabled">
          <input type="text" disabled class="cal-display disabled">
          <input v-model="number2" type="text" class="cal-display">

        </div>

        <div class="middle-row">
          <button class="clear function-buttons" @click="clear_input">C</button>
          <button class="modulus function-buttons" @click="modulus">%</button>
          <button class="square function-buttons" @click="square(number)">X²</button>
          <button class="root function-buttons">√</button>
          <button class="backspace function-buttons" @click="backspace"> <svg-icon icon-class="backspace" />
          </button>
        </div>
        <div class="bottom-row">
          <div class="number-pads">
            <button class="numbers" @click="construct_numbers(7)">
              <span>7</span>
            </button>
            <button class="numbers" @click="construct_numbers(8)"><span>8</span></button>
            <button class="numbers" @click="construct_numbers(9)"><span>9</span></button>
            <button class="numbers" @click="construct_numbers(4)"><span>4</span></button>
            <button class="numbers" @click="construct_numbers(5)"><span>5</span></button>
            <button class="numbers" @click="construct_numbers(6)"><span>6</span></button>
            <button class="numbers" @click="construct_numbers(1)"><span>1</span></button>
            <button class="numbers" @click="construct_numbers(2)"><span>2</span></button>
            <button class="numbers" @click="construct_numbers(3)"><span>3</span></button>
            <button class="numbers zero" @click="construct_numbers(0)"><span>0</span></button>
            <button class="numbers dot" @click="construct_numbers('.')"><span>.</span></button>

          </div>

          <div class="operators">
            <button class="plus operators-button">+</button>
            <button class="minus operators-button">-</button>
            <button class="times operators-button">×</button>
            <button class="divide operators-button">÷</button>
            <button class="equals operators-button">=</button>
          </div>
        </div>

      </div>
    </el-card>

  </div>
</template>

<script>

export default {
  data() {
    return {
      number: '',
      result: '',
      number2: ''
    }
  },

  methods: {
    construct_numbers(number) {
      this.number += '' + number
    },

    clear_input() {
      this.number = ''
    },
    backspace() {
      this.number = this.number.toString()
      this.number = this.number.slice(0, -1)
    },
    plus() {

    },
    minus() {

    },
    multiply() {

    },

    divide() {

    },
    modulus() {
      this.number = this.number % this.number2
    },

    square(number) {
      this.number = number * number
    },

    square_root() {

    }

  }
}

</script>

<style scoped>
/* @import url('../../assets/fonts/RobotoMono.ttf');
   */
.calculator-card {
    height: 470px;
    background-color: hsl(300, 250, 120);
    /*     font-family: "Roboto", monospace;
   */
}

.calculator-container {
    padding: 20px 20px;
    background-color: #15173c;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 3fr 1fr auto auto auto auto auto auto;
}

.top-row {
    grid-column: 1/3;
    grid-row: 1/8;
    display: grid;
    grid-template-columns: 1fr;

    .input {
        text-align: right;
    }

    .cal-display {
        border-style: none;
        height: 3vh;
    }

    .disabled {
        background-color: white;

    }

}

.middle-row {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: auto auto auto auto auto;

    .function-buttons {
        background-color: orangered;
        color: white;
        font-size: 3em;
        cursor: pointer;
    }

    .function-buttons:hover {
        background-color: #ffe500;
        color: black;
    }

}

.bottom-row {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
}

.number-pads {
    grid-column: 1/6;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    .numbers {
        background-color: transparent;
        color: white;
        font-size: 3em;
        padding: 10% 10% 10% 10%;
        cursor: pointer;
        font-family: "Roboto", monospace;

        /*         border-style: solid;
   */
        /*   border-width: 2px;
          border-color: white; */
    }

    .numbers:hover {
        /*         background-color: white;
   */
        /*         color: black;
   */
        border-style: solid;
        border-width: 2px;
        border-color: black;
        box-shadow: 0 8px 25px #f9544c;
    }

}

.operators {
    display: grid;
    grid-row: 1/3;
    grid-column: 6/7;
    grid-template-rows: auto auto auto auto auto;

    .operators-button {
        background-color: orangered;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 3em;
        font-family: "Roboto", monospace;

        .equals {
            grid-row: 4/7;

        }
    }

    .operators-button:hover {
        background-color: #ffe500;
        color: black;
    }
}

.numbers {}

.zero {
    grid-column: 1/3;
}

.divide {
    grid-row: 1/1;
}
</style>
