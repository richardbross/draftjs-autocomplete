import { connect } from 'react-redux';
import actions from '../modules/actions';
import FlowEditor from './FlowEditor';

const mapDispatchToProps = dispatch => ({
    setEditorState: (state) => { dispatch(actions.setEditorState(state)); },
});

const mapStateToProps = ({ editor }) => ({ editorState: editor });

export default connect(mapStateToProps, mapDispatchToProps)(FlowEditor);