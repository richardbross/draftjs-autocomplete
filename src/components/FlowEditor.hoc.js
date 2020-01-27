import { connect } from 'react-redux';
import actions from '../modules/actions';
import FlowEditor from './FlowEditor';

const mapDispatchToProps = dispatch => ({
    setActiveOverlay: (uuid, bool) => { dispatch(actions.setActiveOverlay(uuid, bool)); },
    updateActiveOption: (uuid, option) => { dispatch(actions.updateActiveOption(uuid, option)); },
    updateSelectedOption: (uuid, option) => { dispatch(actions.updateSelectedOption(uuid, option)); },
});

const mapStateToProps = state => ({
    autocompletes: state.ui.autocompletes,
})

export default connect(mapStateToProps, mapDispatchToProps)(FlowEditor);