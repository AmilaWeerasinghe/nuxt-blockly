<template>
  <div id="app">
    <BlocklyComponent id="blockly2" :options="options" ref="foo"></BlocklyComponent>

    <button v-on:click="showCode()">Next Trigger</button>
  </div>
</template>

<script>
//import BlocklyComponent from "./components/BlocklyComponent.vue";
import BlocklyComponent from "../components/BlocklyComponent.vue"
//import Blockly from "blockly/core"
import Blockly from "blockly/core"
//import "./blocks/stocks"
import "../blocks/stocks"
import "../blocks/test_questions"
import "../blocks/pages"
import "../blocks/mutatorExample"
import "../blocks/survey"
import "../blocks/trigger"
import "../blocks/questions"
import "../blocks/test"
import "../blocks/checkbox_mutator"
import "../blocks/composite"
//import "./prompt"
//import "../prompt"

//import BlocklyJS from "blockly/javascript"
import BlocklyJS from "blockly/javascript"

export default {
  name: "app",
  components: {
    BlocklyComponent
  },
  data() {
    return {
      code: "",
      startxml: [
        <block type="controls_if"></block>,
        <block type="logic_compare"></block>
      ],
      options: {
        media: "media/",
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true
        },
        toolbox: `<xml>
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
            </category>
          <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
            <block type="stock_buy_simple"></block>
            <block type="stock_buy_prog"></block>
            <block type="stock_fetch_price"></block>
          </category>
          <category name="colour_picker" colour="210">
      <block type="colour_picker"></block>
      <label text="A label" web-class="myLabelStyle"></label>

      </category>
      <category name="Test_Questions" colour="%{BKY_LOOPS_HUE}">
            <block type="questions_buy_simple"></block>
            <block type="questions_buy_prog"></block>
             <block type="questions_checkbox_on"></block>
              <block type="example_checkbox"></block>
              <block type="validator_example"></block>
               <block type="example_checkbox_validator"></block>
                <block type="colour_match"></block>
                <block type="try_validator"></block>
                <block type="mySampleBlock"></block>
                 <block type="feature"></block>
                 <block type="next"></block>
          </category>

          <category name="Survey" color="%{BKY_LOGIC_HUE}" >
          <block type="survey"></block>
          </category>

<category name="Pages" colour="%{BKY_TEXTS_HUE}">
          <block type="NewPages" ></block>

          <block type="en" ></block>
          <block type="border_mutator" ></block>

          </category>

          <category name="Questions" color="%{BKY_LOGIC_HUE}">
          <block type="questions" ></block>
          <block type="lists_create_with" ></block>
           <block type="Newquestions" ></block>

          </category>
          <category name="eg mutations" color="%{BKY_LOGIC_HUE}">
          <block type="lists_create_with" ></block>
          <block type="NewPages1" ></block>
          <block type="Newquestions1" ></block>
          <block type="variables_get" ></block>
          <block type="variables_set" ></block>
          <block type="check_box" ></block>
          <block type="check_set" ></block>
          <block type="feature" ></block>

          </category>
          <category name="triggers">
          <block type="navigate_trigger"></block>
          <block type="ui_trigger"></block>
          <block type="variable_get" ></block>
          <block type="variable_set" ></block>
          <block type="check_box_to_array" ></block>

          </category>
          <category name="composite">
          <block type="compo"></block>
          </category>

        </xml>`
      }
    }
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace)
      console.log(this.code)
      //console.log(Blockly.Xml.workspaceToDom(this.workspace));
    },
    getXml() {
      console.log(Blockly.Xml.workspaceToDom(this.workspace))
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 40%;
  margin: 0;
  background-color: beige;
}

#blockly1 {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
}

#blockly2 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 95%;
}
</style>
