import { connect } from 'react-redux';
import actions from '../modules/actions';
import AutocompleteManager from './AutocompleteManager';

const mapDispatchToProps = dispatch => ({
    createAutocomplete: (reference, uuid) => { dispatch(actions.createAutocomplete(reference, uuid)); },
    deleteAutocomplete: (reference, uuid) => { dispatch(actions.deleteAutocomplete(reference, uuid)); },
    setActiveOverlay: (uuid, bool) => { dispatch(actions.setActiveOverlay(uuid, bool)); },
});

const mapStateToProps = state => ({
    autocompletes: state.ui.autocompletes,
})

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteManager);