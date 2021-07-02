import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

const mdParser = new MarkdownIt();

export default function Markdown() {
  return (
    <MdEditor
      style={{ height: '300px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      config={{
        view: {
          html: false,
        },
      }}
    />
  );
}
