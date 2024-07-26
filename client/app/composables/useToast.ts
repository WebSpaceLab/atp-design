import { v4 as uuid } from "uuid";

export default function useToast() {
  const defaultOptions = {
    closable: true,
    html: false,
    timeout: 50000,
    style: "info",
  }

  const items = useState('toast', () => []) as any


  function flash(message: any, style: string, options: any = {}) {
    options = { ...defaultOptions, style, ...options };

    const id: string = uuid()

    items.value.unshift({
      id,
      message,
      ...options,
    })

    if (options.timeout !== false) {
      setTimeout(() => {
        remove(id)
      }, options.timeout);
    }
  }

  function remove(id: any) {
    const index = items.value.findIndex((item: any) => item.id === id)

    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  return {
    items,
    flash,
    remove
  }
}
