      var defaultItems = ['foo', 'bar', 'baz', 'buz'];
      var blue = ['mercury', 'venus', 'terra', 'mars', 'jupiter'];
      var purple = ['hermes', 'aphrodiete', 'gaea', 'ares', 'zeus']

      var App = React.createClass({displayName: "App",
        getInitialState: function() {
          return { 
            initalItems: defaultItems,
            items: []
          }

        },
        componentWillMount: function() {
          this.setState({items: this.state.initalItems})
        },

        render: function() {
          return (
            React.createElement(BeltOptions, null)
            //<List items={this.state.items}/>
          );
        }
      });


      var List = React.createClass({displayName: "List",

      showMovesList: function(event) {
        this.setState({items: event.target.value});
      },

      componentWillMount: function() {
        this.setState({items: defaultItems});
      },

      incrementCount: function() {
        this.setProps({count: this.props.count + 1 });
      },

        render: function() {
          return (
            React.createElement("ul", null, 
              
                this.props.items.map(function(item, count) {
                  return React.createElement("li", {key: item}, 
                    React.createElement("input", {type: "checkbox", value: count++, id: count}), 
                      React.createElement("label", {htmlFor: count}, count, " ", item)
                  )
                })
              
            )
          )
        }
      });


      var BeltOptions = React.createClass({displayName: "BeltOptions",
        getInitialState: function() {
          return {
            types: ['blue', 'purple']
          }
        },
        render: function() {
          return (
          React.createElement("ul", null, 
            
              this.state.types.map(function(type) {
                return React.createElement("li", {key: type}, 
                  React.createElement("input", {type: "radio", value: type, id: type, name: "BeltOptions", onClick: List.showMovesList}), 
                    React.createElement("label", {htmlFor: type}, type)
                  )
                })
            
          )
          )
        }
      });

    React.render(React.createElement(App, null), document.getElementById('main'));