import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export default function Markdown({ markdownContent, setMarkdownContent }) {
  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text);
  };

  return (
    <MdEditor
      value={markdownContent}
      style={{ height: '300px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
}
