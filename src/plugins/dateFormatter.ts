export const dateFormatter = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })
}
