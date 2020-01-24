import { connect } from 'react-redux';
import actions from '../modules/actions';
import { HashtagDecorator } from './HashtagDecorator';

const mapDispatchToProps = dispatch => ({
    createAutocomplete: (uuid, ref) => { dispatch(actions.createAutocomplete(uuid, ref)); },
    deleteAutocomplete: (uuid) => { dispatch(actions.deleteAutocomplete(uuid)); },
    updateAutocomplete: (uuid, ref) => { dispatch(actions.updateAutocomplete(uuid, ref)); },
});

export default connect(null, mapDispatchToProps)(HashtagDecorator);