
export function removeImageTag (markdown: string) {
  return markdown.replace(/!\[Image \d+\]\(https:\/\/.*?\)/g, '')
}