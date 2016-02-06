
function HTMLParser() {
	var pos = 0, input = '';
	
	function parse(html) {
		debugger;
		pos = 0;
		input = html;

		var nodes = parseNodes();

		// wrap nodes in HTML if not a single root node
		if(nodes.length === 1) {
			return nodes[0];
		} else { 
			return new ElementNode('html', [], nodes);
		}
	}

	// parse a sequence of sibling nodes
	function parseNodes() {
		var nodes = [];
		while (true) {
			consumeWhiteSpace();
			if (eof() === true || startsWith('</') === true) {
			    break;
			}

			nodes.push(parseNode());
		}
		return nodes;
	}

	// Step 1:
	// Parse a single node, either an element or text node
	function parseNode() {
		// if the first char is a <, parse an Element
		
		// else parseText
	}


	// Step 2:
	// Parse a single element tag
	function parseElement() {
		// check that we're starting with a <
        assert(consumeChar() === '<');

		// parseTagName
		var tagName = parseTagName();

		// TODO: parseAttributes
		var attrs;

		// check that we've got an end >
        assert(consumeChar() === '>');

		// TODO: Parse all it's children Nodes (using parseNodes)
		var children;

		// check that we have a matching end tag
        assert(consumeChar() === '<');
        assert(consumeChar() === '/');
        assert(parseTagName() === tagName);
        assert(consumeChar() === '>');		

        return new ElementNode(tagName, attrs, children);
	}

	// this will return the tagName as a String
	function parseTagName() {
		function isTagNameChar(str) {
			var nextChar = str.charAt(0);
			return /[A-Za-z0-9]/.test(nextChar);
		}

		return consumeWhile(isTagNameChar);
	}

	// Step 3: Parse a set of attributes inside the element
	// e.g. class="my-class" id="testId"
	// Hint:
	// - You have continue parsing until you find the >
	// - Consume White Space until you find an Attribute	
	function parseAttributes() {
		var attributes = {};
		// PARSE ATTRIBUTES


		return attibutes;
	}

	// Step 4: Parse a single attribute assignment
	// e.g. class="myClass"
	function parseAttribute() {
		var name, value;



		return {
			name: name,
			value: value
		};
	}


	// Step 5: Parse a Quoted Value "myClass"
	function parseAttributeValue() {
		// check for a quote
		
		// similar to parseTagName - get everything that's not a "
		

		// check for end quote 
	
		return value;
	}

	/*
		Consume text and create a TextNode
	 */
	 function parseText() {
	 	var innerText = consumeWhile(isTextChar);
	 	return new TextNode(innerText);
	 }


	// Given Utility Functions for your Parser
	// These should be pretty clear
	function isTextChar(c) {
		return c !== '<';
	}

	function consumeWhiteSpace() {
		consumeWhile(isWhiteSpace);
	}

	function isWhiteSpace(c) {
		return c === ' ' || c === '\n';
	}

	function consumeWhile(testFn) {
		var result = '';

		while(!eof() && testFn(nextChar())) {
			result += consumeChar();
		}
		return result;
	}


	function consumeChar() {
		return input.charAt(pos++);
	}

	function nextChar() {
		return input.charAt(pos);
	}

	function startsWith(str) {
		return input.substr(pos).indexOf(str) === 0;
	}

	function eof() {
		return pos >= input.length;
	}

	return {
		parse: parse
	}

}