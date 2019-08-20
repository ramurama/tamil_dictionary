import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import SearchListItem from './SearchListItem';
import { COLOR_TEXT_GREY } from '../config/colors';
import { VIEW_WORD_VIEW } from '../constants/viewNames';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';

class SearchListPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.data);
    return (
    //   <View style={{ flexDirection: 'column' }}>
        <FlatList
          data={this.props.data}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item }) => (
            <SearchListItem
              tamilWord={item.tamilWord}
              engWord={item.engWord}
              wordId={item.wordId}
              onPress={wordId => {
                this.props.navigation.navigate(VIEW_WORD_VIEW, {
                  wordId
                });
              }}
            />
          )}
        />
    //   </View>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history
});

export default connect(
  mapStateToProps,
  Actions
)(withNavigation(SearchListPanel));

const styles = StyleSheet.create({
  
});
