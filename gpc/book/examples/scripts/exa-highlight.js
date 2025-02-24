const codeBlocks = document.querySelectorAll('div.code');

codeBlocks.forEach(block => {
    highlight(block);
});

function highlight(codeBlock) {
    // Use innerHTML to preserve <br> tags
    const html = codeBlock.innerHTML;

    // Keywords list
    const keywords = new Set([
        'main', 'define', 'if', 'else', 'combo'
    ]);

    const constants = new Set([
       'XB1_LT', 'XB1_RX', 'XB1_RY'
    ]);

    // Tokenize and highlight
    let tokens = [];
    let pos = 0;

    while (pos < html.length) {

        let char = html[pos];

        // Handle whitespace
        if (/\s/.test(char)) {
            let value = char;
            pos++;
            tokens.push({ type: 'whitespace', value });
            continue;
        }

        // Handle strings
        if (char === '"' || char === "'" || char === '`') {
            let value = char;
            let quote = char;
            pos++;

            while (pos < html.length) {
                char = html[pos];
                value += char;
                pos++;

                if (char === quote && html[pos - 2] !== '\\') {
                    break;
                }
            }

            tokens.push({ type: 'string', value });
            continue;
        }

        // Handle comments
        if (char === '/' && html[pos + 1] === '/') {
            let value = '';
            while (pos < html.length && html[pos] !== '\n') {
                value += html[pos];
                pos++;
            }
            tokens.push({ type: 'comment', value });
            continue;
        }

        if (char === '/' && html[pos + 1] === '*') {
            let value = '';
            pos += 2;
            while (pos < html.length && (html[pos] !== '*' || html[pos + 1] !== '/')) {
                value += html[pos];
                pos++;
            }
            value = '/*' + value + '*/';
            pos += 2;
            tokens.push({ type: 'comment', value });
            continue;
        }

        // Handle numbers
        if (/[0-9]/.test(char)) {
            let value = '';
            while (pos < html.length && /[0-9.]/.test(html[pos])) {
                value += html[pos];
                pos++;
            }
            tokens.push({ type: 'number', value });
            continue;
        }

        // Handle identifiers and keywords
        if (/[a-zA-Z_$]/.test(char)) {
            let value = '';
            while (pos < html.length && /[a-zA-Z0-9_$]/.test(html[pos])) {
                value += html[pos];
                pos++;
            }

            // Check if it's a keyword
            if (keywords.has(value)) {
                tokens.push({ type: 'keyword', value });
            }

             else if(constants.has(value)) {
                tokens.push({ type: 'constant', value });
            }

            // Check if it's a function
            else if (pos < html.length && /\s*\(/.test(html.slice(pos, pos + 2))) {
                tokens.push({ type: 'function', value });
            }
            // Regular identifier
            else {
                tokens.push({ type: 'identifier', value });
            }
            continue;
        }

        // Handle other characters
        tokens.push({ type: 'char', value: char });
        pos++;
    }

    // Convert tokens to HTML
    codeBlock.innerHTML = tokens.map(token => {
        let value = token.value;

        switch (token.type) {
            case 'keyword': case 'constant': return `<span class="keyword">${value}</span>`;
            case 'string': return `<span class="string">${value}</span>`;
            case 'number': return `<span class="number">${value}</span>`;
            case 'function': return `<span class="function">${value}</span>`;
            case 'comment': return `<span class="comment">${value}</span>`;
            default: return value;
        }
    }).join('');
}