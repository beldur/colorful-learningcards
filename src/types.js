//@flow

// Domain

export type User = {
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
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
  user: ?User,
}

export type AppState = {
  router: RouterState,
  auth: AuthState,
}
