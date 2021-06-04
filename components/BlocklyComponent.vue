<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <button v-on:click="getXml()">get xml</button>
    <xml ref="blocklyToolbox" style="display:none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
import Blockly from "blockly";
import "../blocks/survey";
import "../blocks/pages";
import "../blocks/trigger";

export default {
  name: "BlocklyComponent",
  props: ["options"],
  data() {
    return {
      workspace: null,
      xml_text: null,
      compo_xml: null,
    };
  },
  mounted() {
    var options = this.$props.options || {};
    if (!options.toolbox) {
      options.toolbox = this.$refs["blocklyToolbox"];
    }
    this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options);
    //add xml to load at the initial workspace
    this.xml_text =
      '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none">' +
      '  <block type="survey"></block>' +
      '<block type="NewPages" ></block>' +
      "</xml>";

    this.compo_xml =
      '<xml><block type="survey" id="FL,bFj#P6~KK#OoW%AP%" x="137" y="187"><statement name="survey_process"><block type="NewPages" id=")!~ox{?X0FQlJ/M6@|zt"><mutation items="0"></mutation><value name="trigger"><block type="navigate_trigger" id="Zp!sl2jm=~ZgipsJBN4!"></block></value></block></statement></block></xml>';

    //var xml = Blockly.Xml.textToDom(this.xml_text);//working
    var compxml = Blockly.Xml.textToDom(this.compo_xml);
    //Blockly.Xml.domToWorkspace(xml, this.workspace);//working
    Blockly.Xml.domToWorkspace(compxml, this.workspace);
    //console.log(Blockly.Xml.workspaceToDom(this.workspace));
  },
  methods: {
    getXml() {
      console.log(Blockly.Xml.workspaceToDom(this.workspace));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
