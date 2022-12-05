import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import React, { useState } from "react";
import { Button, Flex, FlexItem } from "playbook-ui";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import Editor from "./components/LexicalEditor/Editor";
import PlaygroundNodes from "./components/LexicalEditor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "./components/LexicalEditor/themes/PlaygroundEditorTheme";

function App(): JSX.Element {
  const {
    settings: { emptyEditor }
  } = useSettings();

  const [currentState, setCurrentState] = useState(null);

  const initialConfig = {
    editorState: emptyEditor,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Flex
        maxWidth="xl"
        marginY="auto"
        gap="sm"
        orientation="column"
        className="editor-shell"
      >
        <FlexItem alignSelf="stretch">
          <Editor />
        </FlexItem>
        <OnChangePlugin
          onChange={(editorState) => setCurrentState(editorState)}
        />
        <Button
          text="Save"
          onClick={() => {
            console.log(JSON.stringify(currentState));
            alert("Check console for json output");
          }}
        />
      </Flex>
    </LexicalComposer>
  );
}

export default function PlaygroundApp(): JSX.Element {
  return (
    <SettingsContext>
      <App />
    </SettingsContext>
  );
}
