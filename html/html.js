
// fixes
// while loop issues
 
function HTMLParser() {
	// Variables shared by the parsing functions
	// to keep track of the data
	var pos = 0, input = '';
	
	// Used in your parser to throw errors
	var assert = function(condition) {
		if(!condition) {
			throw new Error("test failed");
		}
	}

	function parse(html) {
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
		if(nextChar() == '<') {
			// it's an element
			return parseElement();
		} else {
			return parseText();
		}
		// else parseText
	}


	// Step 2:
	// Parse a single element tag
	function parseElement() {
		// check that we're starting with a <
        assert(consumeChar() === '<');

        // consumeWhiteSpace();
		// parseTagName
		var tagName = parseTagName();

		// TODO: parseAttributes
		var attrs = parseAttributes();

		// check that we've got an end >
		// 
		// <div class="MyClass"><h1>adsfs</h1>aflsdajkflsjdfkldjfkladsf</div>
        assert(consumeChar() === '>');

		// TODO: Parse all it's children Nodes (using parseNodes)
		var children = parseNodes();

		// check that we have a matching end tag <h1> asdjfklasdjf </div>
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
	// 
	// attributes = attr*
	function parseAttributes() {
		var attributes = {};
		// PARSE ATTRIBUTES
		while(true) {
			consumeWhiteSpace();
			if(nextChar() == '>') { break; }

			var attribute = parseAttribute(); // { name: "class", value: "sectionTitle"}
			attributes[attribute.name] = attribute.value;
			// { "class": "sectionTitle"} // <div address class="myClass"
			// <tagName attributes
			// attributes = {attr}
			// attr	= attrName | attrNameAndValue                                 
		}

		return attributes;
	}

	// Step 4: Parse a single attribute assignment
	// e.g. class="myClass"
	function parseAttribute() {
		var name, value;

		var name = parseTagName();
		assert(consumeChar() === '='); // =
		var value = parseAttributeValue();		                            

		return {
			name: name,
			value: value
		};
	}


	// Step 5: Parse a Quoted Value "myClass"
	function parseAttributeValue() {
		// check for a quote
		assert(consumeChar() == '"');
		var value = consumeWhile(function isNotQuoteChar(c) {
			return c !== '"';
		})


		// check for end quote 
		assert(consumeChar() == '"');
		return value;


		// class="sectionTitle slider-image"
		// similar to parseTagName - get everything that's not a "
		

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



