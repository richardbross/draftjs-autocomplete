import { connect } from 'react-redux';
import actions from '../modules/actions';
import Overlay from './Overlay';

const mapDispatchToProps = dispatch => ({
    updateActiveOption: (uuid, option) => { dispatch(actions.updateActiveOption(uuid, option)); },
    updateSelectedOption: (uuid, option) => { dispatch(actions.updateSelectedOption(uuid, option)); },
});

export default connect(null, mapDispatchToProps)(Overlay);