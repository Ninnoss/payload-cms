import escapeHTML from 'escape-html';

interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
}

interface ElementNode {
  type: string;
  children: Node[];
  url?: string;
}

type Node = TextNode | ElementNode;

function isText(node: Node): node is TextNode {
  return 'text' in node;
}

function serializeToHTML(nodes: Node[]): string {
  return (
    Array.isArray(nodes) &&
    nodes
      .map((node) => {
        if (isText(node)) {
          let text = escapeHTML(node.text);

          if (node.bold) {
            text = `<strong>${text}</strong>`;
          }
          if (node.italic) {
            text = `<em>${text}</em>`;
          }
          if (node.underline) {
            text = `<u>${text}</u>`;
          }
          if (node.code) {
            text = `<code>${text}</code>`;
          }
          if (node.strikethrough) {
            text = `<del>${text}</del>`;
          }
          if (node.subscript) {
            text = `<sub>${text}</sub>`;
          }
          if (node.superscript) {
            text = `<sup>${text}</sup>`;
          }

          return text === '' ? '<br>' : text;
        }

        if (!node) {
          return '';
        }

        const children = serializeToHTML(node.children);

        switch (node.type) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return `<${node.type}>${children}</${node.type}>`;
          case 'blockquote':
            return `<blockquote>${children}</blockquote>`;
          case 'ul':
            return `<ul>${children}</ul>`;
          case 'ol':
            return `<ol>${children}</ol>`;
          case 'li':
            return `<li>${children}</li>`;
          case 'link':
            return `<a href="${escapeHTML(node.url || '')}">${children}</a>`;
          case 'image':
            return `<img src="${escapeHTML(node.url || '')}" alt="${children}">`;
          case 'pre':
            return `<pre>${children}</pre>`;
          case 'code':
            return `<pre><code>${children}</code></pre>`;
          case 'table':
            return `<table>${children}</table>`;
          case 'thead':
            return `<thead>${children}</thead>`;
          case 'tbody':
            return `<tbody>${children}</tbody>`;
          case 'tr':
            return `<tr>${children}</tr>`;
          case 'th':
            return `<th>${children}</th>`;
          case 'td':
            return `<td>${children}</td>`;
          default:
            return `<p>${children}</p>`;
        }
      })
      .join('')
  );
}

export default serializeToHTML;
