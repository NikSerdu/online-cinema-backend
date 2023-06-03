export const generateSlug = (str: string): string => {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\sа-яёА-ЯЁ-]/g, '-')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}
