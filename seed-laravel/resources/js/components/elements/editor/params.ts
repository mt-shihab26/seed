import type { ImageUploadHandler } from '@mdxeditor/editor';

export const linkAutocompleteSuggestions = ['https://mdxeditor.dev'];

export const imageUploadHandler: ImageUploadHandler = (image) => {
    return Promise.resolve('https://picsum.photos/200/300');
};

export const imageAutocompleteSuggestions = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200',
];
