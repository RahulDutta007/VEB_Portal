import { RichTextEditorProps } from "../uploadAdministration.types";

export type RichTextEditorModalProps = {
	openRichTextEditorModal: boolean;
	richTextEditorProps: RichTextEditorProps;
	handleRichTextEditorModalClose: () => void;
	handleSave: (type: string, content: string) => Promise<void>;
};
