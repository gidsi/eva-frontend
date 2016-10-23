import React from 'react';
import request from 'superagent';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import config from '../api/config';

class SpaceApiInput extends React.Component {
  static propTypes = {
    style: React.PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
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
      ...this.props.style,
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
      </div>
    );
  }
}

export default SpaceApiInput;
