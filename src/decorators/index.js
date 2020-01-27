import { connect } from 'react-redux';
import actions from '../modules/actions';
import { CompositeDecorator } from 'draft-js';
import { findWithRegex } from '../utils';
import HandleDecorator from './HandleDecorator';
import HashtagDecorator from './HashtagDecorator';
import RelationDecorator from './RelationDecorator';
import hashtags from '../constants/hashtags';
import handles from '../constants/handles';
import NameDecorator from './NameDecorator';
import relations from '../constants/relations';

const HANDLE_REGEX = /\@[\w]+/g;
const RELATION_REGEX = /\<\>[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback) {
    findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function namesStrategy(contentBlock, callback) {
    const options = handles;

    options.forEach(option => {
        const regex = new RegExp(option.value, 'g');
        findWithRegex(regex, contentBlock, callback);
    })
    // findWithRegex(handles, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function relationStrategy(contentBlock, callback) {
    findWithRegex(RELATION_REGEX, contentBlock, callback);
}

const mapDispatchToProps = dispatch => ({
    createAutocomplete: (uuid, ref) => { dispatch(actions.createAutocomplete(uuid, ref)); },
    deleteAutocomplete: (uuid) => { dispatch(actions.deleteAutocomplete(uuid)); },
    updateAutocomplete: (uuid, ref) => { dispatch(actions.updateAutocomplete(uuid, ref)); },
});

export const FlowDecorator = new CompositeDecorator([
    {
        strategy: handleStrategy,
        component: connect(null, mapDispatchToProps)(HandleDecorator),
        props: {
            options: handles
        }
    },
    {
        strategy: namesStrategy,
        component: connect(null, mapDispatchToProps)(NameDecorator),
    },
    {
        strategy: hashtagStrategy,
        component: connect(null, mapDispatchToProps)(HashtagDecorator),
        props: {
            options: hashtags
        }
    },
    {
        strategy: relationStrategy,
        component: connect(null, mapDispatchToProps)(RelationDecorator),
        props: {
            options: relations
        }
    },
]);