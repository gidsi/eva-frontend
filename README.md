eve-frontend
=======================

Usage
-----

```bash
npm install
npm start
open http://localhost:3000
```

| Alias                 | Command                          | Description                                 |
|-----------------------|----------------------------------|---------------------------------------------|
| `npm start`           | `webpack-dev-server`             | Start the development server                |
| `npm run build`       | `webpack`                        | Compile the application to `dist/`          |
| `npm run lint`        | `eslint`                         | Static code analysis                        |
| `npm run lint:fix`    | `eslint --fix`                   | Fix linter issues                           |
| `npm run test`        | `jest --coverage`                | Run test suite and generate coverage report |
| `npm run test:watch`  | `jest --watch`                   | Run test suite and watch for changes        |
| `npm run clean`       | `rimraf coverage/ dist/`         | Remove `coverage/` and `dist/` folder       |
| `npm run deploy`      | `clean && lint && test && build` | Clean, lint, test and build the application |



Structure
---------

```
.
├── coverage/                    # Contains coverage information generated by 'npm run test'
├── dist/                        # Deployable files generated by 'npm run deploy'
└── src/
    ├── App.jsx                  # Root component connecting Redux to React
    ├── components/              # React components live here
    ├── containers/              # A container does data fetching and then renders its corresponding sub-components
    ├── core.scss                # Global styles
    ├── index.html               # Our HTML template
    ├── index.jsx                # Application entry point
    ├── redux/
    │   ├── modules/             # Redux modules (actions/constants/reducers)
    │   ├── rootReducer.js       # The root reducer combines the output of multiple reducers into a single state tree
    │   └── store.js             # Creates a Redux store holding the state of our application
    └── static/                  # Static files
```



Getting things done
-------------------

### Styles

```jsx
// example.js
import './example.scss';

// ...

return (
	<div className={'example'} />
);
```

```jsx
// inline-example.js
const styles = {
	headline: {
		color: '#00D8FF',
	},
	subheadline: {
		color: '#764ABC',
	},
};

// ...

return (
	<div>
		<h1 style={styles.headline}>...</h1>
		<h2 style={styles.subheadline}>...</h2>
	</div>
);
```


### Images

```jsx
// example.js
import ReduxLogo from './static/ReduxLogo.svg';

// ...

return (
	<img src={ReduxLogo} />
);
```

```scss
// example.scss
body {
	background: url('./static/ReduxLogo.svg');
}
```


### Routing

```jsx
// App.js

// ...
	<Router history={history}>
		<Route path="/" component={IndexContainer} />
		<Route path="/example" component={ExampleContainer} />
	</Router>
// ...
```

```jsx
// link-example.js
import { Link, browserHistory } from 'react-router';

// ...

return (
	<div>
		<Link to={'/example'}>Example link</Link>
		<button onClick={() => { browserHistory.push('/example'); }}>Example button</button>
	</div>
);
```


### Tests

```bash
npm run test:watch
```

```jsx
// example.spec.js
describe('Just testing', () => {
	it('some foo', () => {
		const foo = 'foo';

		foo.should.equal('foo');
		expect(foo).to.equal('foo');
		assert.equal(foo, 'foo');
	});
});
```
