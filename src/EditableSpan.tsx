import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState(props.title);
  const onEditMode = () => {
    setEditMode(true );
  };
  const offEditMode = () => {
    setEditMode( false );
    if(title.trim()) {
      props.changeTitle(title.trim());
    }
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  };

  return editMode
    ? <input
             autoFocus={ true }
             onBlur={ offEditMode }
             value = { title }
             onChange={ onChangeTitle }
    />
    : <span onDoubleClick = { onEditMode }>{props.title}</span>
};