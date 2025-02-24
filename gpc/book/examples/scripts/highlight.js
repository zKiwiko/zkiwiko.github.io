document.addEventListener("DOMContentLoaded", function() {
    const codeBlocks = document.querySelectorAll("pre.code code");

    codeBlocks.forEach(code => {
        let html = code.innerHTML;

        // Replace keywords
        html = html.replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|class|extends|super|import|export|default|try|catch|finally|throw|async|await)\b/g,
            '<span class="keyword">$1</span>');

        // Replace numbers
        html = html.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');

        // Replace strings (single or double quotes)
        html = html.replace(/(["'`])([^"'`]+?)\1/g, '<span class="string">$&</span>');

        // Replace function names
        html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="function">$1</span>');

        code.innerHTML = html;
    });
});
