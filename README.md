![image](https://github.com/user-attachments/assets/1422e890-ca61-44b2-afff-26e04c8fdea5)

<div align="center">  

A clean and elegant way to explore your own or others' code effortlessly.  

</div>

## Features ✨  

- **🔎 Search**: Easily find any repository and explore its code.  
- **📌 Pinned Repos**: View the pinned repositories of any GitHub user.  
- **🕶 Theme Switching**: Choose between dark and light mode for a comfortable viewing experience.  
- **🌐 Iframe Support**: If permitted, seamlessly preview websites within an iframe.

## Run it locally

Clone the project

```bash
git clone https://github.com/arjun6757/simple-code-viewer.git
```

Go to the project directory

```bash
cd simple-code-viewer
```

Create .env file in the root directory and paste this

```bash
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

Install dependencies

```bash
pnpm i
```

Start the server
```bash
pnpm dev
```

Now go to client directory in another instance

```bash
cd client
```

Start the client and you should be able to to see the app running on http://localhost:5173

```bash
pnpm dev
```