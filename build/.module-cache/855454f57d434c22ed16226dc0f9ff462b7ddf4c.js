      var beltType = {
        defaultItems: ['foo', 'bar', 'baz', 'buz'],
        blue: ['mercury', 'venus', 'terra', 'mars', 'jupiter'],
        purple: ['hermes', 'aphrodiete', 'gaea', 'ares', 'zeus']
      };

      var App = React.createClass({displayName: "App",
        getInitialState: function() {
          return { 
            initalItems: beltType.defaultItems,
            checkboxItems: [],
            moveItems: [],
            showList: false
          }
        },

        handleListUpdate: function(listType) {
          this.setState({
            checkboxItems: beltType[listType],
            showList: true
          });
        },

        render: function() {
          return (
            React.createElement("section", null, 
            React.createElement("div", null, 
              React.createElement(BeltOptions, {updateListType: this.handleListUpdate})
            ), 
            React.createElement("div", {className: this.state.showList ? '' : 'hide'}, 
              React.createElement(CheckboxList, {checkboxItems: this.state.checkboxItems})
            ), 
            "// ", React.createElement("div", null, 
            "//   ", React.createElement(MoveList, null), 
            "// ")
            )
          );
        }
      });


      var BeltOptions = React.createClass({displayName: "BeltOptions",
        changeListType: function() {
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
          React.createElement("ul", {onChange: this.changeListType}, 
            
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

      var CheckboxList = React.createClass({displayName: "CheckboxList",
      incrementCount: function() {
        this.setProps({count: this.props.count + 1 });
      },
        render: function() {
          return (
            React.createElement("ul", null, 
              
                this.props.checkboxItems.map(function(item, count) {
                  return React.createElement("li", {key: item}, 
                    React.createElement("input", {type: "checkbox", value: count++, id: count}), 
                      React.createElement("label", {htmlFor: count}, count, " ", item)
                  )
                })
              
            )
          )
        }
      });

      // var MoveList = React.createClass({
      // render: function() {
      //   return (
      //     <ul>
      //     {
      //       this.props.moveItems.map(function(moveItem, count){
      //         return <li key={moveItem}>
      //           {count} {item}
      //           </li>
      //       })
      //     }
      //     </ul>
      //   )
      // }
      // });

    React.render(React.createElement(App, null), document.getElementById('main'));