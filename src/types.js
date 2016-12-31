//@flow

// Domain

export type User = {
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
}

export type Color =
  | '1' //'blue'
  | '2' //'orange'
  | '3' //'red'
  | '4' //'green'
  | '5' //'cyan'
  | '6' //'purple'

export type CardKey = string

export type Card = {
  key: CardKey,
  color: Color,
  front: string,
  back: string,
}

// Actions

export type ActionName = string

export type ActionPayload = Object

export type Action = {
  type: ActionName,
  payload: ActionPayload,
}

export type ActionHandler<T> = (state: T, payload: ActionPayload) => T

export type ActionHandlers<T> = {
  [ActionName]: ActionHandler<T>
}

// State

export type Location = {
  pathname: string,
  search: string,
}

export type RouterState = {
  location: Location,
  action: string,
}

export type AuthState = {
  authenticated: boolean,
  initialized: boolean,
  user: ?User,
}

export type CardList = {
  [CardKey]: Card,
}

export type CardsState = {
  createOpen: boolean,
  busy: boolean,
  byKey: CardList,
  sortedByCreatedAt: Array<string>,
}

export type SnackbarState = {
  isVisible: boolean,
  text: string,
}

export type AppState = {
  router: RouterState,
  auth: AuthState,
  cards: CardsState,
  snackbar: SnackbarState,
}
