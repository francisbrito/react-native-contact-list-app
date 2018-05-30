import React, { Component } from "react";
import {
  View,
  ToolbarAndroid,
  StyleSheet,
  BackHandler,
  LayoutAnimation,
  NativeModules
} from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PRIMARY, DARK_PRIMARY, TEXT } from "../colors";
import { MENU_ICON, SEARCH_ICON } from "../icons";
import { startSearch, endSearch, updateSearchQuery } from "../actions";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const ACTIONS = [
  {
    title: "Search",
    show: "always",
    icon: SEARCH_ICON
  }
];

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: PRIMARY,
    elevation: 2
  },
  searchBarContainer: {
    elevation: 2
  }
});

const noOp = () => {
  /* no-op */
};

class SearchContactToolbarAndroid extends Component {
  static propTypes = {
    query: PropTypes.string,
    isSearching: PropTypes.bool,
    startSearch: PropTypes.func,
    endSearch: PropTypes.func,
    updateSearchQuery: PropTypes.func
  };

  static defaultProps = {
    query: null,
    isSearching: false,
    startSearch: noOp,
    endSearch: noOp,
    updateSearchQuery: noOp
  };

  state = {
    shouldAnimate: false
  };

  renderSearchBar = () => (
    <SearchBar
      autoFocus
      enablesReturnKeyAutomatically
      returnKeyType="search"
      autoCapitalize="words"
      searchIcon={null}
      cancelIcon={{ color: DARK_PRIMARY }}
      onCancel={this.handleEndSearch}
      onChangeText={this.handleUpdateSearchQuery}
      placeholder="Search contacts"
      platform="android"
      value={this.props.query}
      containerStyle={styles.searchBarContainer}
      selectionColor={DARK_PRIMARY}
    />
  );

  renderToolbar = () => (
    <ToolbarAndroid
      titleColor={TEXT}
      navIcon={MENU_ICON}
      style={styles.toolbar}
      title="Contacts"
      actions={ACTIONS}
      onActionSelected={this.handleStartSearch}
    />
  );

  handleStartSearch = () => {
    this.props.startSearch();
    this.setState(prev => ({ ...prev, shouldAnimate: true }));
  };

  handleEndSearch = () => {
    this.props.endSearch();
    this.setState(prev => ({ ...prev, shouldAnimate: true }));
  };

  handleUpdateSearchQuery = query => {
    this.props.updateSearchQuery(query);
    this.setState(prev => ({ ...prev, shouldAnimate: false }));
  };

  setUpBackButtonBehavior = () => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.props.isSearching) {
        this.handleEndSearch();

        return true;
      }

      return false;
    });
  };

  componentDidMount() {
    this.setUpBackButtonBehavior();
  }

  render() {
    const { shouldAnimate } = this.state;
    const { isSearching } = this.props;

    if (shouldAnimate) {
      const animationConfig = LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      );
      LayoutAnimation.configureNext(animationConfig);
    }

    const renderTopComponent = isSearching
      ? this.renderSearchBar
      : this.renderToolbar;
    return <View>{renderTopComponent()}</View>;
  }
}

const mapStateToProps = ({ isSearching, query }) => ({ isSearching, query });
const mapDispatchToProps = {
  startSearch,
  endSearch,
  updateSearchQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContactToolbarAndroid);
