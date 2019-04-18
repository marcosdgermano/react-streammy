import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../redux/actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1034803915396-cl1ha0u0vrj2tp954fpbqb58k6ntuu0f.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn)
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    }

    onSingIn = () => {
        this.auth.signIn();
    }

    onSingOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        switch(this.props.isSignedIn) {
            case true:
                return (
                    <button onClick={this.onSingOut} className="ui red google button">
                        <i className="google icon" />
                        Sign Out!
                    </button>
                );
                break;
            case false:
                return (
                    <button onClick={this.onSingIn} className="ui red google button">
                        <i className="google icon" />
                        Sign In with Google!
                    </button>
                );
                break
            default:
                return null;
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);