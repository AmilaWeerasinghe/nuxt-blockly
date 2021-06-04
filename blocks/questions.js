import * as Blockly from 'blockly/core';

Blockly.Blocks['questions'] = {
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
    }
  };

  Blockly.JavaScript['questions'] = function(block) {
    var value_trigger = Blockly.JavaScript.valueToCode(block, 'trigger', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_trigger;
    return code;
  };


  //create the questions
  Blockly.Blocks['Newquestions'] = {
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