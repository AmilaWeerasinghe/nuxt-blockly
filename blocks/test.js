import * as Blockly from 'blockly/core';

Blockly.Blocks['lists_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
      this.setColour(260);
      this.itemCount_ = 1;
      this.updateShape_();
      this.setOutput(true, 'Array');
      this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
      this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
      var containerBlock = workspace.newBlock('lists_create_with_container');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('lists_create_with_item');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      // Count number of inputs.
      var connections = [];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (var i = 0; i < this.itemCount_; i++) {
        var connection = this.getInput('ADD' + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (var i = 0; i < this.itemCount_; i++) {
        Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
      }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
        var input = this.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
      if (this.itemCount_ && this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
      } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
        this.appendDummyInput('EMPTY')
            .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
      }
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput('ADD' + i)) {
          var input = this.appendValueInput('ADD' + i);
          if (i == 0) {
            input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
          }
        }
      }
      // Remove deleted inputs.
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
  };
  
  Blockly.Blocks['lists_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function() {
      this.setColour(120);
      this.appendValueInput("page_title")
            .setCheck("String")
            .appendField("Page Title");
        this.appendStatementInput("Questions")
            .setCheck(null)
            .appendField("Questions");
        this.appendValueInput("trigger")
            .setCheck(null)
            .appendField("trigger");
            
      
      this.appendStatementInput('STACK');
      this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
      this.contextMenu = false;
    }
  };
  
  Blockly.Blocks['lists_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function() {
      this.setColour(260);
      this.appendDummyInput()
          .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
      this.contextMenu = false;
    }
  };

//create the pages block using above

//first create the basic pages block
Blockly.Blocks['NewPages1'] = {
    
      init: function() {
        this.itemCount_ = 0;
        this.updateShape_();
        this.appendValueInput("page_title")
            .setCheck("String")
            .appendField("Page Title");
        this.appendStatementInput("Questions")
            .setCheck(null)
            .appendField("Questions");
        this.appendValueInput("trigger")
            .setCheck(null)
            .appendField("trigger");
        //this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
     this.setTooltip("page_block");
     this.setHelpUrl("");
     this.setMutator(new Blockly.Mutator(['Newtrigger']));
      },
      mutationToDom: function() {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
      var containerBlock = workspace.newBlock('lists_create_with_container');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('Newtrigger');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      // Count number of inputs.
      var connections = [];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (var i = 0; i < this.itemCount_; i++) {
        var connection = this.getInput('ADD' + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (var i = 0; i < this.itemCount_; i++) {
        Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
      }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
        var input = this.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
      if (this.itemCount_ && this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
      } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
        //this.appendDummyInput('EMPTY')
           // .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
      }
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput('ADD' + i)) {
          var input = this.appendValueInput('ADD' + i).appendField("trigger");
          if (i == 0) {
            //input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
          }
        }
      }
      // Remove deleted inputs.
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    };



    //mutator for pages block contain trigger blocks inside it
Blockly.Blocks['Newtrigger'] = {
    init: function() {
      this.appendValueInput("trigger")
          .setCheck(null)
          .appendField("trigger");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  //create the questions
  Blockly.Blocks['Newquestions1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Name Questions");
      this.appendValueInput("trigger")
          .setCheck(null)
          .appendField("trigger");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(345);
   this.setTooltip("");
   this.setHelpUrl("");
   this.setMutator(new Blockly.Mutator(['Newtriggerq']));
    },mutationToDom: function() {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
      var containerBlock = workspace.newBlock('lists_create_with_containerq');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('Newtrigger');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      // Count number of inputs.
      var connections = [];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (var i = 0; i < this.itemCount_; i++) {
        var connection = this.getInput('ADD' + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (var i = 0; i < this.itemCount_; i++) {
        Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
      }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
        var input = this.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
      if (this.itemCount_ && this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
      } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
        //this.appendDummyInput('EMPTY')
           // .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
      }
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput('ADD' + i)) {
          var input = this.appendValueInput('ADD' + i).appendField("trigger");
          if (i == 0) {
            //input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
          }
        }
      }
      // Remove deleted inputs.
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
  };

  //mutator for pages block contain trigger blocks inside it
Blockly.Blocks['Newtriggerq'] = {
    init: function() {
      this.appendValueInput("trigger")
          .setCheck(null)
          .appendField("trigger");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(345);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['lists_create_with_containerq'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function() {
      
            this.appendDummyInput()
           .appendField("Name Questions");
       this.appendValueInput("trigger")
           .setCheck(null)
           .appendField("trigger");
       this.setColour(345);


      
      this.appendStatementInput('STACK');
      this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
      this.contextMenu = false;
    }
  };

  //ui tigger drop down
  Blockly.Blocks["test1"] = {
    init: function() {
        let count = new Blockly.FieldDropdown(
            [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
            ],
            function(a) {
                this.sourceBlock_.updateShape_(a);
            },
        );
        this.appendDummyInput("Antoine")
            .appendField("Count:")
            .appendField(count, "count")
            .appendField(new Blockly.FieldDropdown(day))
            .appendField("The rest of the block");
    }
  };


 //varibles test

 // Block for variable getter.
Blockly.Blocks['variables_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME");
    this.setOutput(true, null);
    
  }
};

// Block for variable setter.
Blockly.Blocks['variables_set'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("set")
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
        .appendField("to");
    this.setOutput(true, null);

  }
};

//check box input
Blockly.Blocks['check_box'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("red")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "red");
    this.appendDummyInput()
        .appendField("blue")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "blue");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['check_box'] = function(block) {
  var checkbox_red = block.getFieldValue('red');
  var checkbox_blue = block.getFieldValue('blue');
  var selected_array=[];
  if(checkbox_red==='TRUE'){


  };
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

  };
  console.log(selected_array);

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



//example
Blockly.Blocks['stop_actions'] = {
  init: function() {
      var actions_descriptors = [
          ['HOLD', 'hold'],
          ['COAST', 'coast']
      ];
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(actions_descriptors), 'action')
          .setAlign(Blockly.ALIGN_RIGHT);
      this.setOutput(true, 'String');
      this.setColour(60);
      this.setTooltip('Select the stop action');
  }
};

Blockly.Blocks['motor'] = {
  init: function() {
      this.appendValueInput('arg_stop_action')
          .appendField('Stop action')
          .setAlign(Blockly.ALIGN_RIGHT);
  },

  onchange: function(e) {
      // !
      this.getInputTargetBlock('arg_stop_action').getFieldValue('action');
  }
};


//test check
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
      .appendField(new Blockly.FieldCheckbox("TRUE"), "hidden");
    }
  }