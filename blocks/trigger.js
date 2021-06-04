import * as Blockly from 'blockly/core';

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

  Blockly.JavaScript['navigate_trigger'] = function(block) {
    var value_reference = Blockly.JavaScript.valueToCode(block, 'reference', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_reference;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };


  //ui trigger
  Blockly.Blocks['ui_trigger'] = {
    init: function() {
        this.setOutput(true, null);
      this.appendDummyInput()
          .appendField("UI trigger");
      this.appendDummyInput()
          .appendField("Trigger event")
          .appendField(new Blockly.FieldDropdown([["init","init"], ["run","run"], ["option","OPTIONNAME"]]), "trigger_event");
      this.appendDummyInput()
          .appendField("Visible")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "visible");
      this.appendDummyInput()
          .appendField("Enable")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "NAME");
      this.appendValueInput("visible_if")
          .setCheck(null)
          .appendField("visible if");
      this.appendValueInput("enable_if")
          .setCheck(null)
          .appendField("enable if");
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  //get and set
  Blockly.Blocks['variable_get'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME");
      this.setOutput(true, null);
      
    }
  };
  
  // Block for variable setter.
  Blockly.Blocks['variable_set'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("set")
          .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
          .appendField("to");
      this.setOutput(true, null);
  
    }
  };

  //checkbox input to array
  //check box input
Blockly.Blocks['check_box_to_array'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Select the colors you want");
    this.appendDummyInput()
        .appendField("red")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "red");
    this.appendDummyInput()
        .appendField("blue")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "blue");
    this.appendDummyInput()
        .appendField("green")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "green");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['check_box_to_array'] = function(block) {
  var checkbox_red = block.getFieldValue('red');
  var checkbox_blue = block.getFieldValue('blue');
  var checkbox_green = block.getFieldValue('green');
  var selected_array=[];
  // TODO: Assemble JavaScript into code variable.
  var code = checkbox_blue+checkbox_red
  if(checkbox_red=== 'TRUE'){
    console.warn('red selected');
    //push to array
    selected_array.push('red');
  }
  if(checkbox_blue ==='TRUE'){
    console.warn('blue selected');
    //push to array
    selected_array.push('blue');

  }
  if(checkbox_green ==='TRUE'){
    console.warn('green selected');
    //push to array
    selected_array.push('green');

  }
  //log the array to console
  console.log('Colors selected :'+selected_array);

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['check_set'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("set")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "red")
        .appendField("to");
    this.setOutput(true, null);
    //var featureName = element.getFieldValue("red");
   // var checkbox_red = Blockly.block.getFieldValue('red') == 'TRUE';
  //var checkbox_blue = block.getFieldValue('blue') == 'TRUE';

  }
};
