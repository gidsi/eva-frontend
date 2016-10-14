import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import config from '../api/config';
import request from 'superagent';

export class SpaceApiInput extends React.Component {
  static props = {
    style: React.PropTypes.object,
  };

  static defaultProps = {
      style: {},
  };

  getStyle = () => ({
      display: 'flexbox',
      alignItems: 'center',
      ...this.props.style,
  });

  handleInputChange = (event) => {
    this.setState({ url: event.target.value, input: event.target });
  };

  handleButtonClick = () => {
      request
          .post(config.api.url + '/urls')
          .send({
              url: this.state.url
          })
          .set('Content-Type', 'application/json')
          .end((err, res) => {
              if (err) {
                  console.log('cant create spaceurl');
              } else {
                  this.spaceApiInput.input.value = '';
              }
          });
  };

  render() {
    return(
        <div style={this.getStyle()}>
          <TextField
              name={'spaceapi-input'}
              onChange={this.handleInputChange}
              ref={(ref) => this.spaceApiInput = ref}
          />
          <FloatingActionButton
              style={{ marginLeft: '20px' }}
              mini
              onTouchTap={this.handleButtonClick}
          >
              <ContentAdd />
          </FloatingActionButton>
        </div>
    );
  }
}

export default SpaceApiInput;