import type { ImageUploadHandler, SandpackConfig } from '@mdxeditor/editor';

export const linkAutocompleteSuggestions = ['https://mdxeditor.dev'];

export const imageUploadHandler: ImageUploadHandler = (image) => {
    return Promise.resolve('https://picsum.photos/200/300');
};

export const imageAutocompleteSuggestions = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200',
];

export const defaultCodeBlockLanguage = 'txt';

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

export const sandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent,
        },
    ],
};

export const codeBlockLanguages = { js: 'JavaScript', css: 'CSS' };
