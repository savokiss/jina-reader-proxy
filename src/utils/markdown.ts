export function removeImageTag(markdown: string) {
  return markdown.replace(/!\[.*?\]\((?:.*?[^\\])?\)/g, '');
}
