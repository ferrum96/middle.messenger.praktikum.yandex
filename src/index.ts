import './index.sass';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

interface Page {
    source: string;
    args: any[];
}

const pages: { [key: string]: Page } = {
    '/sign_up': {source: Pages.SignUpPage, args: []},
    '/login': {source: Pages.LoginPage, args: []},
    '/chat': {source: Pages.ChatPage, args: []},
    '/404': {source: Pages.NotFoundPage, args: []},
    '/500': {source: Pages.InternalServerErrorPage, args: []},
};

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, <Handlebars.TemplateDelegate<any> | string>component);
});

function navigate(page: string): void {
    const {source, args} = pages[page];
    const handlebarsFunc = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunc(args);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage(window.location.pathname);
});

function loadPage(path: string = "/login"): void {
    if (path === "/") {
        window.location.pathname = "/login";
    }
    const page = pages[path];
    if (page) {
        navigate(path);
    } else {
        navigate("/404");
    }
}

document.addEventListener('click', (e: MouseEvent) => {
    if (e.target instanceof Element) {
        const page = e.target.getAttribute("page");
        if (page) {
            navigate(page);
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }
});