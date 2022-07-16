export type BrandingItems = {
	buttonCaption: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	file: File | any | null;
	handleBrandingDelete: (name: string) => void;
	name: string;
};
