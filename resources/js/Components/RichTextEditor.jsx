import { useRef, useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder = 'Start typing...', error = false }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const ToolbarButton = ({ command, value, icon, title }) => (
        <button
            type="button"
            onClick={() => execCommand(command, value)}
            className="rich-editor-toolbar-btn"
            title={title}
        >
            {icon}
        </button>
    );

    return (
        <div className={`rich-text-editor ${error ? 'error' : ''}`}>
            <div className="rich-editor-toolbar">
                {/* Heading / text type controls */}
                <div className="rich-editor-toolbar-group">
                    <ToolbarButton
                        command="formatBlock"
                        value="P"
                        icon={<span style={{ fontSize: 12 }}>P</span>}
                        title="Normal text"
                    />
                    <ToolbarButton
                        command="formatBlock"
                        value="H1"
                        icon={<span style={{ fontSize: 12 }}>H1</span>}
                        title="Heading 1"
                    />
                    <ToolbarButton
                        command="formatBlock"
                        value="H2"
                        icon={<span style={{ fontSize: 12 }}>H2</span>}
                        title="Heading 2"
                    />
                    <ToolbarButton
                        command="formatBlock"
                        value="H3"
                        icon={<span style={{ fontSize: 12 }}>H3</span>}
                        title="Heading 3"
                    />
                </div>
                <div className="rich-editor-toolbar-divider"></div>

                {/* Basic text formatting */}
                <div className="rich-editor-toolbar-group">
                    <ToolbarButton
                        command="bold"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.66667 2.66667V13.3333M8.66667 2.66667V13.3333M4.66667 8H10.6667C11.403 8 12 7.403 12 6.66667C12 5.93033 11.403 5.33333 10.6667 5.33333H4.66667M8.66667 8H10.6667C11.403 8 12 8.59667 12 9.33333C12 10.07 11.403 10.6667 10.6667 10.6667H8.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Bold"
                    />
                    <ToolbarButton
                        command="italic"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66667 2.66667H11.3333M4.66667 13.3333H9.33333M8 2.66667V13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Italic"
                    />
                    <ToolbarButton
                        command="underline"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 13.3333H12M8 2.66667V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Underline"
                    />
                </div>
                <div className="rich-editor-toolbar-divider"></div>
                <div className="rich-editor-toolbar-group">
                    <ToolbarButton
                        command="justifyLeft"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66667 4H13.3333M2.66667 8H10.6667M2.66667 12H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Align Left"
                    />
                    <ToolbarButton
                        command="justifyCenter"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66667 4H13.3333M4.66667 8H11.3333M2.66667 12H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Align Center"
                    />
                    <ToolbarButton
                        command="justifyRight"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66667 4H13.3333M5.33333 8H13.3333M2.66667 12H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Align Right"
                    />
                </div>
                <div className="rich-editor-toolbar-divider"></div>
                <div className="rich-editor-toolbar-group">
                    <ToolbarButton
                        command="insertUnorderedList"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66667 4H13.3333M2.66667 8H13.3333M2.66667 12H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="2" cy="4" r="0.5" fill="currentColor" />
                                <circle cx="2" cy="8" r="0.5" fill="currentColor" />
                                <circle cx="2" cy="12" r="0.5" fill="currentColor" />
                            </svg>
                        }
                        title="Bullet List"
                    />
                    <ToolbarButton
                        command="insertOrderedList"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33333 4H13.3333M5.33333 8H13.3333M5.33333 12H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.66667 3.33333V4.66667H1.33333M2 6.66667H1.33333V8H2.66667M1.33333 10.6667H2.66667V12H1.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        title="Numbered List"
                    />
                </div>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="rich-editor-content"
                data-placeholder={placeholder}
                suppressContentEditableWarning={true}
            />
        </div>
    );
}

