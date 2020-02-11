/**
 * @fileoverview Implements code syntax highlight plugin for 'all' bundle file served to CDN
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import hljs from 'highlight.js';
import { registerHljsToEditor } from './helper';

/**
 * Plant code-syntax-highlight plugin (import all languages)
 * @param {Editor|Viewer} editor - instance of Editor or Viewer
 */
export default function codeSyntaxHighlightPlugin(editor) {
  registerHljsToEditor(editor, hljs);
}
