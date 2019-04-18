import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../redux/actions';


class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.stream.id;
        return (
            <React.Fragment>
                <button 
                onClick={() => this.props.deleteStream(id)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    render() {
        console.log(this.props.stream);
        if (this.props.stream) {
            return (
                <Modal 
                    title="Delete Stream"
                    content={`Are you sure you want to delete the stream with title: ${this.props.stream.title}?`}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);