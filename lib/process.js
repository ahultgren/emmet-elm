'use babel';

export default (abbrUtils) => {
	function safeAttrName(name) {
		// Convert emmet default names (like type if not specified for an input) and
		// convert to the corresponding Html.Attributes method
		// TODO Find more cases
		switch (name) {
			case "type":
				return "type'";
			default:
				return name;
		}
	}

	function makeAttributesString(tag, profile, indentation) {
		var quo = profile.attributeQuote();
		var cursor = profile.cursor();

		return `\n${indentation}[ ` + tag.attributeList().map(function({name, value}) {
			var attrName = safeAttrName(profile.attributeName(name));
			return `${attrName} ${quo}${value || cursor}${quo}`;
		}).join(`\n${indentation}, `) + `\n${indentation}]`;
	}

	function processTagContent(item) {
		if (!item.content) {
			return;
		}

		item.content = `text "${item.content}"`;
	}

	function indent (level) {
		if(level < 0) { level = 0 }
		return '  '.repeat(level);
	}

	function processTag(item, profile, level, isSibling) {
		if (!item.parent) {
			// looks like it's a root (empty) element
			return item;
		}

		var indentation = indent(level + 1);
		var attrs = makeAttributesString(item, profile, indentation);
		var cursor = profile.cursor();
		var tagName = profile.tagName(item.name());
		var elemPadding = isSibling ? `\n${indent(level)}, ` : '';

		item.start = elemPadding + tagName + attrs + `\n${indentation}[ `;
		item.end = `\n${indentation}]`;
		processTagContent(item);

		if (!item.children.length && !abbrUtils.isUnary(item)) {
			item.start += cursor;
		}

		return item;
	}

	return function process(tree, curProfile, level) {
		level = level || 0;

		tree.children.forEach(function(item, index) {
			if (!abbrUtils.isSnippet(item)) {
				processTag(item, curProfile, level, index !== 0);
			}

			process(item, curProfile, level + 1);
		});

		return tree;
	};

};
