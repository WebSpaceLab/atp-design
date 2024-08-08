type UseSearchModalState = {
  isOpen: boolean
  q: string
}

export const useSearch = () => {
  const search = useState('search', () => ({
    isOpen: false,
    q: ''
  }))

  const closeSearchModal = () => {
    search.value.isOpen = false
    search.value.q = ''
  }
  const openSearchModal = () => { search.value.isOpen = true }

  return { search, closeSearchModal, openSearchModal }
}
