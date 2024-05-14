import { expect } from 'chai';
import { before } from 'mocha';
import { createSandbox } from 'sinon';
import router, { Routes } from './Router.ts';
import Route from '../Route.ts';
import { loginPage } from '../../pages/login/login.ts';
import { notFoundPage } from '../../pages/404/404.ts';
import { signUpPage } from '../../pages/sign-up/sign-up.ts';
import { settingsPage } from '../../pages/settings/settings.ts';

describe('Router', () => {
  const sandbox = createSandbox();

  before(() => {
    router.use(Routes.AUTH, loginPage);
    router.use(Routes.SIGNUP, signUpPage);
    router.start();
  });

  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('should add route correctly', () => {
    router.use(Routes.SETTINGS, settingsPage);
    expect(router['_routes'].length).to.equal(3);
  });

  it('should start router correctly', () => {
    const spy = sandbox.spy(router, 'getRoute');
    router.start();
    expect(spy.calledOnce).to.be.true;
  });

  it('should navigate to correct route', () => {
    router.go(Routes.AUTH);
    expect(router['_currentRoute']).equal(router.getRoute(Routes.AUTH));
  });

  it('should handle back navigation', () => {
    const spy = sandbox.spy(window.history, 'back');
    router.back();

    expect(spy.calledOnce).to.be.true;
  });

  it('should handle forward navigation', () => {
    const spy = sandbox.spy(window.history, 'forward');
    router.forward();
    expect(spy.calledOnce).to.be.true;
  });

  it('should handle not found route', () => {
    const notFoundRoute = new Route(Routes.NOT_FOUND_ERROR, notFoundPage);
    expect(router.getRoute(Routes.NOT_FOUND_ERROR)).to.deep.equal(
      notFoundRoute
    );
  });
});
