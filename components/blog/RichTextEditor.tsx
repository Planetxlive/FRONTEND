'use client';

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isPreview: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  isPreview,
}: RichTextEditorProps) {
  const toolbarButtons = [
    { icon: Heading1, label: 'Heading 1', action: () => insertText('# ') },
    { icon: Heading2, label: 'Heading 2', action: () => insertText('## ') },
    { icon: Heading3, label: 'Heading 3', action: () => insertText('### ') },
    { icon: Bold, label: 'Bold', action: () => wrapText('**', '**') },
    { icon: Italic, label: 'Italic', action: () => wrapText('*', '*') },
    {
      icon: Underline,
      label: 'Underline',
      action: () => wrapText('<u>', '</u>'),
    },
    { icon: Quote, label: 'Quote', action: () => insertText('> ') },
    { icon: List, label: 'Bullet List', action: () => insertText('- ') },
    {
      icon: ListOrdered,
      label: 'Numbered List',
      action: () => insertText('1. '),
    },
    { icon: Link, label: 'Link', action: () => insertLink() },
    { icon: Image, label: 'Image', action: () => insertImage() },
    { icon: Code, label: 'Code', action: () => wrapText('`', '`') },
  ];

  const insertText = (text: string) => {
    const textarea = document.getElementById(
      'content-editor'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);

    onChange(newValue);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const wrapText = (before: string, after: string) => {
    const textarea = document.getElementById(
      'content-editor'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newValue);

    // Set cursor position after wrapped text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:') || 'Link';
    if (url) {
      insertText(`[${text}](${url})`);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    const alt = prompt('Enter alt text:') || 'Image';
    if (url) {
      insertText(`![${alt}](${url})`);
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-violet-400 transition-all duration-200">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className="p-2 text-gray-600 hover:text-violet-600 hover:bg-violet-100 rounded-lg transition-all duration-200 group"
              title={button.label}
            >
              <button.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-6 prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content-editor"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Start writing your blog content here... You can use markdown formatting."
            className="w-full h-[400px] p-6 bg-white focus:outline-none resize-none font-light leading-relaxed text-gray-900"
            style={{ minHeight: '400px' }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{value.length} characters</span>
          <span>
            {value.split(/\s+/).filter(word => word.length > 0).length} words
          </span>
        </div>
        <div className="text-xs">
          {isPreview ? 'Preview Mode' : 'Edit Mode'}
        </div>
      </div>
    </div>
  );
}
