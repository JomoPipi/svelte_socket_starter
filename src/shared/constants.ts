

const poop = { a : 69, b : 420, c : 'Hello, World!' } as const

{
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    const _ = isBrowser ? window : global as any
    _.poop = poop
}