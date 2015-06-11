      var defaultItems = ['foo', 'bar', 'baz', 'buz'];
      var blue = ['mercury', 'venus', 'terra', 'mars', 'jupiter'];
      var purple = ['hermes', 'aphrodiete', 'gaea', 'ares', 'zeus']

      var App = React.createClass({displayName: "App",
        getInitialState: function() {
          return { 
            initalItems: defaultItems,
            items: [],
            listType: '',
            showList: false
          }

        },

        handleListUpdate: function(typeValue) {
          this.setState({
            listType: typeValue,
            showList: true
          });
        },

        // componentWillMount: function() {
        //   this.setState({items: this.state.initalItems})
        // },

        render: function() {
          return (
            React.createElement("div", null, 
            React.createElement(BeltOptions, {updateListType: this.handleListUpdate}), 
            React.createElement(List, {items: this.state.items})
            )
          );
        }
      });


      var BeltOptions = React.createClass({displayName: "BeltOptions",
        handleListChange: function(event) {
          var value = event.target.value;
          this.props.updateListType(value);
        },
        getInitialState: function() {
          return {
            types: ['blue', 'purple']
          }
        },
        render: function() {
          return (
          React.createElement("ul", {onClick: this.changeListType}, 
            
              this.state.types.map(function(type) {
                return React.createElement("li", {key: type}, 
                  React.createElement("input", {type: "radio", value: type, id: type, name: "BeltOptions"}), 
                    React.createElement("label", {htmlFor: type}, type)
                  )
                })
            
          )
          )
        }
      });

      var List = React.createClass({displayName: "List",

      // componentWillMount: function() {
      //   this.setState({items: defaultItems});
      // },

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

    React.render(React.createElement(App, null), document.getElementById('main'));