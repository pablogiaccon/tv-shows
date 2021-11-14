export function cleanHtml(text: string) {
  return text?.split(/<[^>]*>/).join('');
}
