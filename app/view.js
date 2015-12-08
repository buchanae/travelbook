import React from 'react';
import { render } from 'react-dom';

import Layout from './components/layout';
import Home from './components/home';
import Map from './components/map';
import EntityList from './components/EntityList';
import FlightControl from './components/FlightControl';
import Inspector from './components/Inspector';
import Create from './components/Create';
import { Toolbar, InspectorButton } from './components/Toolbar';


const Shell = React.createClass({
  childContextTypes: {
    actions: React.PropTypes.object,
  },

  getChildContext() {
    return {actions: this.props.actions};
  },

  render() {
    return <div>{this.props.children}</div>;
  },
});


export function update_view(state, actions) {

  var {
    inspector,
    flights,
    map,
    container
  } = state;

  var structure = (
    <Shell actions={actions}>

      <div className="travel-map-controls">

        <Toolbar>
          <InspectorButton inspector={inspector} panel="create">+</InspectorButton>
        </Toolbar>

        <Inspector state={inspector}>
          <Create key="create" inspector={inspector} />
          <FlightControl key="flight" flight={inspector.data} />
          <EntityList key="entity-list" flights={flights} />
        </Inspector>
      </div>

      <Map map={map} />
    </Shell>
  );

  render(structure, container);
}