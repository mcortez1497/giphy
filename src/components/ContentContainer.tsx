import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AppState, getGifs } from 'reducers';
import { Gif } from 'types';

import { Content } from 'components';

interface StateProps {
  readonly gifs: Gif[];
}

interface DispatchProps {
  readonly getGifs: () => void;
}

interface ComponentProps extends StateProps, DispatchProps {}

class Container extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.getGifs();
  }

  public render() {
    return <Content gifs={this.props.gifs} />;
  }
}

const mapStateToProps = (state: AppState) => ({
  gifs: state.gifs.items
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const ContentContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
