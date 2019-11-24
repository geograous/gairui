import { useEffect } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import styles from './index.css';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

export default function() {

  useEffect(() => {
    document.title = document.title ? document.title + 1 : 0
  })
  
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <button>格式化</button>
      <CodeMirror
        value='{a:"44"}'
        options={{
          mode: {name: 'javascript', json: true},
          theme: 'material',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
        }}
      />
    </div>
  );
}
