//@flow
import { Component, render } from 'inferno';
import createInfernoContext from './lib/';

// Pass a default theme to ensure type correctness
const ThemeContext = createInfernoContext('light');

class ThemeToggler extends Component {
  state = { theme: 'light' };
  render() {
    return (
      // Pass the current context value to the Provider's `value` prop.
      // Changes are detected using strict comparison (Object.is)
      <ThemeContext.Provider value={this.state.theme}>
        <div>
        <button
          onClick={() => {
            this.setState(state => ({
              theme: state.theme === 'light' ? 'dark' : 'light'
            }));
          }}
        >
          Toggle theme
        </button>
        {this.props.children}
        </div>
      </ThemeContext.Provider>
    );
  }
}

class Title extends Component {
  render() {
    return (
      // The Consumer uses a render prop API. Avoids conflicts in the
      // props namespace.
      <ThemeContext.Consumer>
        {theme => (
          <h1 style={{ color: theme === 'light' ? '#000' : '#fff' }}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class Emoji extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            style={{
              fontSize: '35px',
              background: 'white',
              height: '40px',
              width: '40px'
            }}
          >
            {theme === 'light' ? '⚡️' : '🕶'}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

function App() {
  return (
    <ThemeToggler>
      <div>
        <Title>Really cool context</Title>
        <Emoji />
      </div>
    </ThemeToggler>
  );
}

let container = document.getElementById('container');

if (!container) {
  throw new Error('missing #container');
}

render(<App />, container);