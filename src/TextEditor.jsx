import React, { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./styles.css";

const styleMap = {
  COLOR_RED: {
    color: "red",
  },
};

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem("editorContent");
    if (savedData) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedData));
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
    return EditorState.createEmpty();
  });

  const editorRef = useRef(null);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(contentState)),
    );
  }, [editorState]);

  const handleBeforeInput = (char) => {
    const currentContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContentState.getBlockForKey(blockKey);
    const text = block.getText();
    const isFirstChar = selection.getStartOffset() === 0;

    switch (char) {
      case "#":
        if (isFirstChar && text === "") {
          const updatedContentState = Modifier.setBlockType(
            currentContentState,
            selection,
            "header-one",
          );
          setEditorState(EditorState.push(editorState, updatedContentState));
          return "handled";
        }
        break;
      case "$":
        if (isFirstChar && text === "") {
          const updatedEditorState = RichUtils.toggleInlineStyle(
            editorState,
            "BOLD",
          );
          setEditorState(updatedEditorState);
          return "handled";
        }
        break;
      case "%":
        if (isFirstChar && text === "") {
          const contentStateWithRedColor = Modifier.applyInlineStyle(
            currentContentState,
            selection,
            "COLOR_RED",
          );
          setEditorState(
            EditorState.push(editorState, contentStateWithRedColor),
          );
          return "handled";
        }
        break;
      case "@":
        if (isFirstChar && text === "") {
          const updatedEditorState = RichUtils.toggleInlineStyle(
            editorState,
            "UNDERLINE",
          );
          setEditorState(updatedEditorState);
          return "handled";
        }
        break;
      default:
        break;
    }

    return "not-handled";
  };

  const handleReturn = (e) => {
    const currentContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContentState.getBlockForKey(blockKey);
    const text = block.getText();

    if (text === "#" || text === "$" || text === "%" || text === "@") {
      const updatedContentState = Modifier.replaceText(
        currentContentState,
        selection,
        " ",
      );
      setEditorState(EditorState.push(editorState, updatedContentState));
      return "handled";
    }

    return "not-handled";
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(contentState)),
    );
  };

  return (
    <div className="editor-container">
      <div className="head">
        <h4>Demo Editor by Arun Shukla</h4>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="note">
        <h5>Note</h5>
        <p>Please use # for h1 tag.</p>
        <p>Please use $ for bold text.</p>
        <p>Please use % for red line.</p>
        <p>Please use @ for underline.</p>
      </div>
      <div className="editor-box">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleBeforeInput={handleBeforeInput}
          handleReturn={handleReturn}
        />
      </div>
    </div>
  );
};

export default CustomEditor;
