# Node Streamlit Proxy

This Node server proxies requests under `/app/` to a Streamlit app running on
`localhost:8080`. It adds a Authentication header to the request to authenticate
with the Streamlit app.

## Usage

1. Install dependencies:

```bash
yarn
```

2. Start the server:

```bash
yarn dev
```

3. Open the app in your browser:

```
http://localhost:9898/app/
```
