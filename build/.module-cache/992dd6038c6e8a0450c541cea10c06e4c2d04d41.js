      var defaultItems = ['foo', 'bar', 'baz', 'buz'];

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
            React.createElement(List, {items: this.state.items})
          );
        }
      });


      var List = React.createClass({displayName: "List",
      incrementCount: function() {
        this.setProps({count: this.props.count + 1 });
      },

        render: function() {
          return (
            React.createElement("ul", null, 
              
                this.props.items.map(function(item) {
                  return React.createElement("li", {key: item}, 
                    React.createElement("input", {type: "checkbox", value: item}), 
                      item
                  )
                })
              
            )
          )
        }
      });

    React.render(React.createElement(App, null), document.getElementById('main'));