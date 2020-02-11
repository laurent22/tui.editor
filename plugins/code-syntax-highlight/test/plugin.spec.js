/**
 * @fileoverview Test code-syntax-highlight plugin
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import Editor from 'tui-editor';
import codeSyntaxHighlightPlugin from '@';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

describe('code-syntax-highlight plugin', () => {
  let editor, wrapper;

  beforeEach(() => {
    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    jasmine.clock().install();
  });

  afterEach(done => {
    jasmine.clock().uninstall();
    setTimeout(() => {
      wrapper.parentNode.removeChild(wrapper);
      done();
    });
  });

  it('render codeblock element in markdown', () => {
    editor = new Editor({
      el: wrapper,
      previewStyle: 'vertical',
      height: '100px',
      initialEditType: 'markdown',
      plugins: [
        [
          codeSyntaxHighlightPlugin,
          {
            hljs
          }
        ]
      ]
    });

    const codeblockText = ['\n```javascript', '\nconst a = 100;', '\n```'].join('');

    editor.setValue(codeblockText);

    jasmine.clock().tick(800);

    const conatiner = editor.preview.$el.get(0);

    expect(conatiner.querySelectorAll('pre').length).toBe(1);
    expect(conatiner.querySelectorAll('pre code').length).toBe(1);
    expect(conatiner.querySelectorAll('pre code span').length).toBe(2);
    expect(conatiner.querySelector('pre code').getAttribute('data-language')).toBe('javascript');
    expect(conatiner.querySelector('pre code').className).toBe('lang-javascript');
  });

  it('render codeblock element in viewer', () => {
    editor = Editor.factory({
      el: wrapper,
      viewer: true,
      previewStyle: 'vertical',
      height: '100px',
      initialEditType: 'markdown',
      plugins: [
        [
          codeSyntaxHighlightPlugin,
          {
            hljs
          }
        ]
      ]
    });

    const codeblockText = ['\n```javascript', '\nconst a = 100;', '\n```'].join('');

    editor.setValue(codeblockText);

    jasmine.clock().tick(800);

    const conatiner = editor.preview.$el.get(0);

    expect(conatiner.querySelectorAll('pre').length).toBe(1);
    expect(conatiner.querySelectorAll('pre code').length).toBe(1);
    expect(conatiner.querySelectorAll('pre code span').length).toBe(2);
    expect(conatiner.querySelector('pre code').getAttribute('data-language')).toBe('javascript');
    expect(conatiner.querySelector('pre code').className).toBe('lang-javascript');
  });

  it('render code in wysiwyg', () => {
    editor = new Editor({
      el: wrapper,
      previewStyle: 'vertical',
      height: '100px',
      initialEditType: 'wysiwyg',
      plugins: [
        [
          codeSyntaxHighlightPlugin,
          {
            hljs
          }
        ]
      ]
    });

    const codeblockText = ['\n```javascript', '\nconst a = 1;', '\n```'].join('');

    editor.setValue(codeblockText);

    expect(
      editor.wwEditor
        .get$Body()
        .get(0)
        .querySelector('pre').innerHTML
    ).toBe('const a = 1;');
  });
});
