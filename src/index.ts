import './index.sass';
import Handlebars from 'handlebars';
import * as Components from './components';
import {LoginPage, SignUpPage, ChatPage, NotFoundPage, InternalServerErrorPage} from './pages';

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, <Handlebars.TemplateDelegate<any> | string>component);
});

interface Page {
    source: string;
    args: any[];
}

const pages: { [key: string]: Page } = {
    '/sign_up': {source: SignUpPage, args: []},
    '/login': {source: LoginPage, args: []},
    '/chat': {source: ChatPage, args: []},
    '/404': {source: NotFoundPage, args: []},
    '/500': {source: InternalServerErrorPage, args: []},
};

function navigate(page: string): void {
    const {source, args} = pages[page];
    const handlebarsFunc = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunc(args);
}

function loadPage(path: string): void {
    if (path === "/" || path === "") {
        window.location.pathname = "/login";
    }
    const page = pages[path];
    if (page) {
        navigate(path);
    } else {
        navigate("/404");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage(window.location.pathname);
});

document.addEventListener('click', (e: MouseEvent) => {
    if (e.target instanceof Element) {
        const pageAttribute = e.target.getAttribute("page") as string | null;
        if (pageAttribute !== null) {
            window.location.href = pageAttribute;
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }
});