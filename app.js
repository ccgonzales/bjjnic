      var defaultItems = ['foo', 'bar', 'baz', 'buz'];

      var App = React.createClass({
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
            <List items={this.state.items}/>
          );
        }
      });


      var List = React.createClass({
        render: function() {
          return (
            <ul>
              {
                this.props.items.map(function(item) {
                  return <li key={item}>{item}</li>
                })
              }
            </ul>
          )
        }
      });

    React.render(<App/>, document.getElementById('main'));