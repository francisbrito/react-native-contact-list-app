import React, { Component } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ICON, ACCENT } from "../colors";

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    borderRadius: 72,
  },
  addContactButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    borderRadius: 56,
    elevation: 5,
    backgroundColor: ACCENT
  }
});

class AddContactButton extends Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    containerStyle: PropTypes.any,
    onPress: PropTypes.func
  };

  static defaultProps = {
    isHidden: false,
    onPress: () => { /* no-op */ }
  };

  state = {
    onEnterOrLeaveAnim: new Animated.Value(1)
  };

  render() {
    const { isHidden, onPress, containerStyle } = this.props;
    const { onEnterOrLeaveAnim } = this.state;
    const animationConfig = Object.assign(
      { duration: 50, useNativeDriver: true },
      isHidden ? { toValue: 0 } : { toValue: 1, delay: 75 }
    );

    Animated.spring(onEnterOrLeaveAnim, animationConfig).start();

    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          {
            opacity: onEnterOrLeaveAnim,
            transform: [
              {
                scale: onEnterOrLeaveAnim
              }
            ]
          }
        ]}>
        <TouchableOpacity style={styles.addContactButton} onPress={onPress}>
          <Icon name="add" size={24} color={ICON} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const mapStateToProps = ({ isSearching }) => ({ isHidden: isSearching });

export default connect(mapStateToProps)(AddContactButton);
