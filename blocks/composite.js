import Blockly from 'blockly/core';

Blockly.Blocks['compo'] = {
    init: function() {
      this.appendValueInput("survey_name")
          .setCheck(null)
          .appendField("Survey Name");
      this.appendStatementInput("survey_process")
          .setCheck(null)
          .appendField("Process");
      this.setColour(260);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['survey'] = function(block) {
    var value_survey_name = Blockly.JavaScript.valueToCode(block, 'survey_name', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_survey_process = Blockly.JavaScript.statementToCode(block, 'survey_process');
    // TODO: Assemble JavaScript into code variable.
    var code = value_survey_name+statements_survey_process;
    return code;
  };

  Blockly.Blocks['navigate_trigger'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Navigate trigger");
      this.appendValueInput("reference")
          .setCheck(null)
          .appendField("Reference");
      this.setOutput(true, null);
      this.setColour(160);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };