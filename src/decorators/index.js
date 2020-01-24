import { CompositeDecorator } from 'draft-js';
import { findWithRegex } from '../utils';
import { HandleDecorator } from './HandleDecorator';
import HashtagDecorator from './HashtagDecorator.hoc';

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback) {
    findWithRegex(HANDLE_REGEX, contentBlock, callback);
}
function hashtagStrategy(contentBlock, callback) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

export const FlowDecorator = new CompositeDecorator([
    {
        strategy: handleStrategy,
        component: HandleDecorator,
    },
    {
        strategy: hashtagStrategy,
        component: HashtagDecorator,
    },
]);