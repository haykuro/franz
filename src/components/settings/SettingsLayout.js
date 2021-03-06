import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { oneOrManyChildElements } from '../../prop-types';
import Appear from '../ui/effects/Appear';

@observer
export default class SettingsLayout extends Component {
  static propTypes = {
    navigation: PropTypes.element.isRequired,
    children: oneOrManyChildElements.isRequired,
    closeSettings: PropTypes.func.isRequired,
  };

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) { // escape key
      this.props.closeSettings();
    }
  }

  render() {
    const {
      navigation,
      children,
      closeSettings,
    } = this.props;

    return (
      <Appear transitionName="fadeIn-fast">
        <div className="settings-wrapper">
          <button
            className="settings-wrapper__action"
            onClick={closeSettings}
          />
          <div className="settings franz-form">
            {navigation}
            {children}
            <button
              className="settings__close mdi mdi-close"
              onClick={closeSettings}
            />
          </div>
        </div>
      </Appear>
    );
  }
}
