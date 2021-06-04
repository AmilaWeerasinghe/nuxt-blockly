
import * as Blockly from 'blockly/core';

Blockly.Blocks["questions_buy_simple"] = {
  init: function() {
    this.appendValueInput("Number")
      .setCheck("Number")
      .appendField("Buy questions ID")
      .appendField(new Blockly.FieldNumber(0), "ID")
      .appendField("For amount")
      .appendField(new Blockly.FieldNumber(0), "Amount")
      .appendField("At Price")
      .appendField(new Blockly.FieldNumber(0), "Price");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip("buy id");
    this.setHelpUrl("https://example.com");
  }
};

Blockly.JavaScript["questions_buy_simple"] = function(block) {
  var number_id = block.getFieldValue("ID");
  var number_amount = block.getFieldValue("Amount");
  var number_price = block.getFieldValue("Price");
  var value_number = Blockly.JavaScript.valueToCode(
    block,
    "Number",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var code = `buy(${number_id},${number_amount},${number_price},${value_number});\n`;
  return code;
};

Blockly.Blocks["questions_buy_prog"] = {
  init: function() {
    this.appendValueInput("Number")
      .setCheck("Number")
      .appendField("Buy questions ID");
    this.appendValueInput("NAME")
      .setCheck("Number")
      .appendField("For amount");
    this.appendValueInput("NAME")
      .setCheck("Number")
      .appendField("At Price");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip("buy id");
    this.setHelpUrl("https://example.com");
  }
};

Blockly.JavaScript["questions_buy_prog"] = function(block) {
  var value_number = Blockly.JavaScript.valueToCode(
    block,
    "Number",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var code = `buy(${value_number},${value_name},${value_name});\n`;
  return code;
};

Blockly.Blocks["questions_fetch_price"] = {
  init: function() {
    this.appendValueInput("Fetch")
      .setCheck("Number")
      .appendField("Fetch Price of questions ID:");
    this.appendDummyInput()
      .appendField("And set to:")
      .appendField(new Blockly.FieldVariable("item"), "variable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("fetch questions price");
    this.setHelpUrl("https://example.com");
  }
};

Blockly.JavaScript["questions_fetch_price"] = function(block) {
  var value_fetch = Blockly.JavaScript.valueToCode(
    block,
    "Fetch",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var variable_variable = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("variable"),
    Blockly.Variables.NAME_TYPE
  );
  var code = `fetch_price(${value_fetch},${variable_variable});\n`;
  return code;
};

//now create a check box 

Blockly.Blocks['questions_checkbox_on'] = {
    init: function() {
        this.appendValueInput("input_num")
        .setCheck(null)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "check_value");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
      this.appendDummyInput()
        .appendField('checkbox:')
        .appendField(new Blockly.FieldCheckbox(true), 'FIELDNAME');
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    },
     //validator
     validate: function (newValue) {
        var sourceBlock = this.getSourceBlock();
        sourceBlock.showTextField_ = newValue == "FALSE";
        sourceBlock.updateTextField();
  
        return newValue;
      },
      //update text field
      updateTextField: function () {
        var input = this.getInput("DUMMY");
        if (this.showTextField_ && !this.getField("TEXT")) {
          input.appendField(new Blockly.FieldTextInput(), "TEXT");
        } else if (!this.showTextField_ && this.getField("TEXT")) {
          input.removeField("TEXT");
        }
      },
    
    
  };

  //generator stub for the 
  
  Blockly.JavaScript['questions_checkbox_on'] = function(block) {
  var value_input = Blockly.JavaScript.valueToCode(block, 'input_num', Blockly.JavaScript.ORDER_ATOMIC);
  var value_check = Blockly.JavaScript.valueToCode(block, 'checkbox', Blockly.JavaScript.ORDER_ATOMIC);

  var checkbox_check_value = block.getFieldValue('check_value') == 'TRUE';
  
  
  // TODO: Assemble JavaScript into code variable.
  var code = value_check+ value_input+checkbox_check_value;
  return code;
};


//sample
Blockly.Blocks['example_checkbox'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('checkbox:')
          .appendField(new Blockly.FieldCheckbox(true), 'CHECK2');
          
    },
    validate: function(newValue) {
        var sourceBlock = this.getSourceBlock();
        sourceBlock.showTextField_ = newValue == 'TRUE';
        sourceBlock.updateTextField();
    
        return newValue;
      },
    
      updateTextField: function() {
        var input = this.getInput('DUMMY');
        //console.log(input+'from the updateTextField');
        if (this.showTextField_ && !this.getField('TEXT')) {
          input.appendField(new Blockly.FieldTextInput(), 'TEXT');
        } else if (!this.showTextField_ && this.getField('TEXT')) {
          input.removeField('TEXT');
        }
      }
  };

  Blockly.JavaScript['example_checkbox'] = function(block) {
    var value_input = Blockly.JavaScript.valueToCode(block, 'CHECK2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_check = Blockly.JavaScript.valueToCode(block, 'DUMMY', Blockly.JavaScript.ORDER_ATOMIC);
  
    //var checkbox_check_value = block.getFieldValue('check_value') == 'TRUE';
    
    
    // TODO: Assemble JavaScript into code variable.
    var code = value_check+ value_input;
    return code;
  };

  //validaator example
  Blockly.Blocks['validator_example'] = {
    init: function() {
      // Remove all 'a' characters from the text input's value.
      var validator = function(newValue) {
        return newValue.replace(/a/g, '');
      };
  
      var field = new Blockly.FieldTextInput('default');
      field.setValidator(validator);
  
      this.appendDummyInput().appendField(field);
    }
  };


  //checkbox 
  /*
  Goal:How to insert the the validator into the append with 
  the check box input
  Functions:validator and UpdateTextField (to show a text field) is ready 
  
  */


  Blockly.Blocks['example_checkbox_validator'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('checkbox:')
          .appendField(new Blockly.FieldCheckbox(true), 'FIELDNAME');
    },
    validate: function(newValue) {
      var sourceBlock = this.getSourceBlock();
      sourceBlock.showTextField_ = newValue == 'TRUE';
      sourceBlock.updateTextField();
  
      return newValue;
    },
    updateTextField: function() {
      var input = this.getInput('DUMMY');
      if (this.showTextField_ && !this.getField('TEXT')) {
        input.appendField(new Blockly.FieldTextInput(), 'TEXT');
      } else if (!this.showTextField_ && this.getField('TEXT')) {
        input.removeField('TEXT');
      }
    }
  };

  




  //color mtch with blocksource
  Blockly.Blocks['colour_match'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldColour(
              null, this.validate
          ), 'COLOUR');
      this.setColour(this.getFieldValue('COLOUR'));
    },
  
    validate: function(colourHex) {
      this.getSourceBlock().setColour(colourHex);
    }
  };

  //try a new block
  Blockly.Blocks['try_validator'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('checkbox:')
          .appendField(new Blockly.FieldCheckbox(true), 'FIELDNAME')
          .appendField(new Blockly.FieldTextInput(), 'TEXT')
          .appendField(new Blockly.FieldTextInput(),'text');
          this.validate
    },
    validate: function(newValue) {
      var sourceBlock = this.getSourceBlock();
      sourceBlock.showTextField_ = newValue == 'TRUE';
      sourceBlock.updateTextField();
  
      return newValue;
    },
    updateTextField: function() {
      var input = this.getInput('DUMMY');
      if (this.showTextField_ && !this.getField('TEXT')) {
        input.appendField(new Blockly.FieldTextInput(), 'TEXT');
      } else if (!this.showTextField_ && this.getField('TEXT')) {
        input.removeField('TEXT');
      }
    }

  };


  //stack 
  Blockly.Blocks['mySampleBlock'] = {
    /**
     * Initiate the block. This runs before domToMutation.
     */
    init: function () {
        var typeOptions = [['Add', 'Add'], ['Append', 'Append']];
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Select the operation here ')
            .appendField(new Blockly.FieldDropdown(typeOptions, this.handleTypeSelection.bind(this)), 'typeSelector');
        // Initialize the value of this.columnType (used in updateShape)
        this.columnType = this.getFieldValue('typeSelector');
        // Avoid duplicating code by running updateShape to append your appropriate input
        this.updateShape();
        //@TODO: Do other block configuration stuff like colors, additional inputs, etc. here
    },
    /**
     * This function runs each time you select a new value in your type selection dropdown field.
     * @param {string} newType This is the new value that the field will be set to.
     * 
     * Important note: this function will run BEFORE the field's value is updated. This means that if you call
     * this.getFieldValue('typeSelector') within here, it will reflect the OLD value.
     * 
     */
    handleTypeSelection: function (newType) {
        // Avoid unnecessary updates if someone clicks the same field twice
        if(this.columnType !== newType) {
            // Update this.columnType to the new value
            this.columnType = newType;
            // Add or remove fields as appropriate
            this.updateShape();
        }
    },
    /**
     * This will remove old inputs and add new inputs as you need, based on the columnType value selected
     */
    updateShape: function () {
        // Remove the old input (so that you don't have inputs stack repeatedly)
        if (this.getInput('appendToMe')) {
            this.removeInput('appendToMe');
        }
        // Append the new input based on the value of this.columnType
        if(this.columnType === 'Add') {
            // if columnType = Add, show the following:
            //@TODO: define values in AddsList here
            var AddsList = [['Dummy Option','option']];
            this.appendDummyInput('appendToMe')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(' Add: ')
                .appendField(new Blockly.FieldDropdown(AddsList), 'AddValue');
        } else if (this.columnType === 'Append') {
            //  if columnType = Append, show the following:
            //@TODO: define values in AppendsList here
            var AppendsList = [['Dummy Option','option']];
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(' Append ')
                .appendField(new Blockly.FieldDropdown(AppendsList), 'AppendValue');
        }
    },
    /**
     * This function runs when saving your block to XML. This is important if you need to save your block to XML at any point and then either
     * generate code from that XML or repopulate your workspace from that XML
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        // Do not use camelCase values for attribute names.
        container.setAttribute('column_type', this.columnType);
        // ALWAYS return container; this will be the input for domToMutation.
        return container;
    },
    /**
     * This function runs when loading your block from XML, after running init.
     * It's very important for updating your block in response to values selected in a field.
     */
    domToMutation: function (xmlElement) {
        // This attribute should match the one you used in mutationToDom
        var columnType = xmlElement.getAttribute('column_type');
        // If, for whatever reason, you try to save an undefined value in column_type, it will actually be saved as the string 'undefined'
        // If this is not an acceptable value, filter it out
        if(columnType && columnType !== 'undefined') {
            this.columnType = columnType;
        }
        // Run updateShape to append block values as needed
        this.updateShape();
    }
};

//show or hide
Blockly.Blocks['feature'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Feature") // just for label
      .appendField(new Blockly.FieldDropdown([["manufacturer", "feature_manufacturer"], ["profile", "feature_profile"], ["glas", "feature_glas"]]), "category"); // for dropdown values
    this.appendValueInput("feature_name")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Name");
    this.appendValueInput("feature_prio")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Priorität");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Versteckt")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "hidden")}};


      Blockly.JavaScript['feature'] = function(block) {
        var value_input = Blockly.JavaScript.valueToCode(block, 'CHECK2', Blockly.JavaScript.ORDER_ATOMIC);
        var value_check = Blockly.JavaScript.valueToCode(block, 'DUMMY', Blockly.JavaScript.ORDER_ATOMIC);
      
        //var checkbox_check_value = block.getFieldValue('check_value') == 'TRUE';
        
        
        // TODO: Assemble JavaScript into code variable.
        var code = value_check+ value_input;
        return code;
      };

      //new try
      Blockly.Blocks['next'] = {
        init: function () {
          var typeOptions = [['Add', 'Add'], ['Append', 'Append']];
          this.appendDummyInput()
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField('Type ')
              .appendField(new Blockly.FieldDropdown(typeOptions, this.handleTypeSelection.bind(this)), 'typeSelector');
          // Initialize the value of this.columnType (used in updateShape)
          this.columnType = this.getFieldValue('typeSelector');
          // Avoid duplicating code by running updateShape to append your appropriate input
          //this.updateShape();
          //@TODO: Do other block configuration stuff like colors, additional inputs, etc. here
      },
        handleTypeSelection: function (newType) {
          // Avoid unnecessary updates if someone clicks the same field twice
          if(this.columnType !== newType) {
              // Update this.columnType to the new value
              this.columnType = newType;
              // Add or remove fields as appropriate
              this.updateShape();
          }
      },
    };
      

    // block to take the input 

    /*Blockly.Blocks['motor'] = {
      init: function() {
          this.setHelpUrl('http://www.example.com/');
          this.setColour(65);
          this.appendDummyInput()
              .appendField("motor( ");
          this.appendValueInput("port_number")
              .setCheck("Number");
          this.appendDummyInput()
              .appendField(");");
          this.setInputsInline(true);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setTooltip('');
      },
      onchange: function() {
          var port_number = Blockly.C.valueToCode(this, 'port_number', Blockly.C.ORDER_ATOMIC);
          var valid = VALIDATE.motor_port_number(port_number);
          if (!valid) 
              alert("WARNING: The value for the motor port must be 0, 1, 2 or 3.");
          },

          VALIDATE.motor_port_number :function(port){
            port=1;
            if(port==1){
              return true;

            }
            
          }
      };*/