import './index.sass'
import Handlebars from 'handlebars'
import * as Components from './components'
import {
  LoginPage,
  SignUpPage,
  ChatPage,
  NotFoundPage,
  InternalServerErrorPage,
  ProfilePage,
  EditProfilePage,
  EditPasswordPage
} from './pages'
import chatPageData from './data/chat-page.json'
import profilePageData from './data/profile-page.json'

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(
    name,
    <Handlebars.TemplateDelegate<any> | string>component
  )
})

interface Page {
  source: string
  args: any
}

const pages: { [key: string]: Page } = {
  '/sign_up': { source: SignUpPage, args: [] },
  '/login': { source: LoginPage, args: [] },
  '/chat': { source: ChatPage, args: chatPageData },
  '/profile': { source: ProfilePage, args: profilePageData },
  '/edit_profile': { source: EditProfilePage, args: profilePageData },
  '/edit_password': { source: EditPasswordPage, args: [] },
  '/404': { source: NotFoundPage, args: [] },
  '/500': { source: InternalServerErrorPage, args: [] }
}

function navigate(page: string): void {
  const { source, args } = pages[page]
  document.body.innerHTML = Handlebars.compile(source)(args)
}

function loadPage(path: string): void {
  if (path === '/' || path === '') {
    window.location.pathname = '/login'
  }
  const page = pages[path]
  if (page) {
    navigate(path)
  } else {
    navigate('/404')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPage(window.location.pathname)
})

document.addEventListener('click', (e: MouseEvent) => {
  if (e.target instanceof Element) {
    const pageAttribute = e.target.getAttribute('page') as string | null
    if (pageAttribute !== null) {
      window.location.href = pageAttribute
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }
})
