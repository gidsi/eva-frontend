import React from 'react';
import request from 'superagent';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import config from '../api/config';

class SpaceApiInput extends React.Component {
  static propTypes = {
    style: React.PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
  };

  state = {
    open: false
  };

  getStyle = () => ({
    formContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '40px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '50px',
    },
    hint: {
      color: 'white',
      width: '100%',
      maxWidth: '550px',
      fontSize: '13px',
      textAlign: 'center',
    },
  });

  handleInputChange = (event) => {
    this.setState({ url: event.target.value, input: event.target });
  };

  handleButtonClick = () => {
    request
      .post(`${config.api.url}/urls`)
      .send({
        url: this.state.url,
      })
      .set('Content-Type', 'application/json')
      .end((err) => {
        if (!err) {
          this.spaceApiInput.input.value = '';
          this.setState({ open: true });
        }
      });
  };

  render() {
    const style = this.getStyle();
    return (
      <div style={style.container}>
        <p style={style.hint}>
          Trage die API-URL deines Hackerspaces hier ein und wir werden sie nach
          kurzer Prüfung freischalten. Bei Fragen oder Problemen wende dich an&nbsp;
          <a href={'mailto:lokal@ccc.de'} style={{ color: 'white', textDecoration: 'none' }}>
            {'lokal@ccc.de'}
          </a>.
        </p>
        <div style={style.formContainer}>
          <TextField
            hintText={'https://example.com/yourspaceapi.json'}
            name={'spaceapi-input'}
            onChange={this.handleInputChange}
            ref={ref => (this.spaceApiInput = ref)}
            style={{ width: '100%', maxWidth: '340px' }}
          />
          <FloatingActionButton
            style={{ marginLeft: '20px' }}
            mini
            onTouchTap={this.handleButtonClick}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Snackbar
          open={this.state.open}
          message={'Die URL wurde hinzugefuegt und befindet sich nun im review.'}
          autoHideDuration={4000}
          style={{ minWidth: '490px' }}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

export default SpaceApiInput;
