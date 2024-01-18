# Custom Editor React Component

This is a React component that provides a customizable text editor with special commands.

## Features

- **Header Tags**: Use `#` at the beginning of a line to create an `h1` tag.
- **Bold Text**: Use `$` at the beginning of a line to make the text bold.
- **Red Color**: Use `%` at the beginning of a line to add a red line.
- **Underline**: Use `@` at the beginning of a line to underline the text.

## Installation

```bash
npm install
```

# Props
The CustomEditor component does not currently accept any props.

# Commands
Header Tags: Start a new line with #.
Bold Text: Start a new line with $.
Red Color: Start a new line with %.
Underline: Start a new line with @.
# Notes
The editor's content is automatically saved to the local storage.
Saved content can be reloaded even after refreshing the page.
The "Save" button allows manual saving of the current editor content.
# Example
For a live example, refer to the demo page.

